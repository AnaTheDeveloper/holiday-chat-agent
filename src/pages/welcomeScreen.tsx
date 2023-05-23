import { useState } from "react";
import { HolidayDestinationType } from "../models/holidayDestination.model";
import { QuestionsAndAnswersType } from "../models/chatHistory.model";

export type WelcomeScreenType = {
  nameSetByUser: string;
  holidayData: HolidayDestinationType[];
  removeHolidayDataFileCallback: Function;
  handleChatHistoryCallback: Function;
  resetChatHistoryCallback: Function;
};

export default function WelcomeScreen({
  nameSetByUser,
  holidayData,
  removeHolidayDataFileCallback,
  handleChatHistoryCallback,
  resetChatHistoryCallback,
}: WelcomeScreenType) {
  const [recommendedHoliday, setRecommendedHoliday] =
    useState<HolidayDestinationType[]>(holidayData);
  const [section, setSection] = useState<number>(0);

  const [budget, setBudget] = useState<number>(0);
  const [temperature, setTemperature] = useState<string>("");
  const [preferedStarRating, setPreferedStarRating] = useState<number>(0);

  const [errorMsg, setErrorMessage] = useState<string>("");

  const temperatureOptions = ["cold", "mild", "hot"];
  
  //Handle Questions
  const handleBudgetQuestion = () => {
    let isValidAwnser: boolean = true;

    if (budget <= 0) {
      isValidAwnser = false;
      return isValidAwnser;
    }

    if (isNaN(budget)) {
      isValidAwnser = false;
      return isValidAwnser;
    }

    const holidaysWithinBudget: HolidayDestinationType[] = [];

    for (let i = 0; i < recommendedHoliday.length; i++) {
      if (recommendedHoliday[i].pricePerPerNight <= budget) {
        holidaysWithinBudget.push(recommendedHoliday[i]);
      }
    }
    setRecommendedHoliday(holidaysWithinBudget);

    const newChatMessage: QuestionsAndAnswersType = {
      question: "What your budget per night?",
      answer: budget,
    };
    handleChatHistoryCallback(newChatMessage);

    return isValidAwnser;
  };

  const handleTemperatureQuestion = () => {
    let isValidAwnser: boolean = true;

    const holidaysWithinTemperature: HolidayDestinationType[] = [];

    for (let i = 0; i < recommendedHoliday.length; i++) {
      if (recommendedHoliday[i].tempRating <= temperature) {
        holidaysWithinTemperature.push(recommendedHoliday[i]);
      }
    }
    setRecommendedHoliday(holidaysWithinTemperature);

    const newChatMessage: QuestionsAndAnswersType = {
      question: "What your preferred temperature?",
      answer: temperature,
    };
    handleChatHistoryCallback(newChatMessage);

    return isValidAwnser;
  };

  const handleStarRatingQuestion = () => {
    let isValidAwnser: boolean = true;

    if (preferedStarRating <= 0 || preferedStarRating >= 6) {
      isValidAwnser = false;
      return isValidAwnser;
    }

    if (isNaN(preferedStarRating)) {
      isValidAwnser = false;
      return isValidAwnser;
    }

    const holidaysWithinPreferedStarRating: HolidayDestinationType[] = [];

    for (let i = 0; i < recommendedHoliday.length; i++) {
      if (recommendedHoliday[i].starRating >= preferedStarRating) {
        holidaysWithinPreferedStarRating.push(recommendedHoliday[i]);
      }
    }
    setRecommendedHoliday(holidaysWithinPreferedStarRating);

    const newChatMessage: QuestionsAndAnswersType = {
      question: "What is your preferred star rating?",
      answer: preferedStarRating,
    };

    handleChatHistoryCallback(newChatMessage);
    return isValidAwnser;
  };

  //Buttons
  const handleBackClick = () => {
    removeHolidayDataFileCallback();
  };

  const handleStartAgain = () => {
    setRecommendedHoliday(holidayData);
    resetChatHistoryCallback();
    setSection(0);
  };

  return (
    <div className="h-full w-full flex flex-col justify-start items-center gap-4 px-10 pt-4">
      {section === 0 && (
        <div
          id="sectionZeroContainer"
          className="flex flex-col w-full items-center"
        >
          <div
            id="welcomeIntroductionContainer"
            className="flex flex-col items-center justify-center mb-4 w-2/3"
          >
            <span id="question" className="text-base">
              {`Welcome ${nameSetByUser}!`}
            </span>
            <p
              id="questionHelper"
              className="p-2 font-light text-xs text-gray-500 justify-center items-center"
            >
              Get ready for an exhilarating and unforgettable adventure that is
              customized just for you - we're thrilled to make it happen!
            </p>
          </div>

          <div
            id="buttonContainer"
            className="flex flex-row justify-between w-2/3 items-center mt-4"
          >
            <button
              onClick={handleBackClick}
              className="bg-transparent text-sm	 hover:bg-blue-100 text-blue-800 font-semibold py-1 px-2 border border-blue-800 hover:border-transparent rounded"
            >
              Choose a new file
            </button>

            <button
              onClick={() => {
                setSection(1);
              }}
              className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-1 px-2 rounded text-sm	"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {section === 1 && (
        <div
          id="sectionOneContainer"
          className="flex flex-col w-full items-center"
        >
          <div
            id="questionAndHelperContainer"
            className="flex flex-col items-center justify-center mb-4"
          >
            <span id="question" className="text-base">
              What is your budget per night?
            </span>
            <span
              id="questionHelper"
              className="p-2 font-light text-xs text-gray-500"
            >
              Enter a number
            </span>
          </div>

          <div
            id="answerContainer"
            className="flex flex-row w-2/3 justify-center items-center"
          >
            <label id="budgetLabel" className="text-sm pr-1">
              Max Budget: £
            </label>
            <input
              id="budgetInput"
              type="text"
              placeholder="00.00"
              className={
                errorMsg
                  ? "border border-solid border-red-600 rounded pl-2 focus:outline-none focus:border-gray-400"
                  : "border border-solid border-gray-300 rounded pl-2 focus:outline-none focus:border-gray-400"
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setBudget(+e.target.value);
              }}
            />
          </div>

          <div
            id="errorMessageContainer"
            className="flex flex-col w-2/3 justify-center items-end pr-9"
          >
            <span className="text-red-600 text-xs">{errorMsg}</span>
          </div>

          <div
            id="buttonContainer"
            className="flex flex-row w-2/3 justify-end mt-4"
          >
            <button
              onClick={() => {
                if (handleBudgetQuestion()) {
                  setErrorMessage("");
                  setSection(2);
                } else {
                  setErrorMessage("ERROR ERROR");
                }
              }}
              className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-1 px-2 rounded text-sm	"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {section === 2 && (
        <div
          id="sectionTwoContainer"
          className="flex flex-col w-full items-center"
        >
          <div
            id="questionAndHelperContainer"
            className="flex flex-col items-center justify-center mb-4"
          >
            <span id="question" className="text-base">
              What is your preferred temperature?
            </span>
            <span
              id="questionHelper"
              className="p-2 font-light text-xs text-gray-500"
            >
              Select an option
            </span>
          </div>

          <div
            id="answerContainer"
            className="flex flex-row w-2/3 justify-center items-center"
          >
            <label id="temperatureLabel" className="text-sm">
              Temperature:
            </label>
            {/* <input
              id="starRatingInput"
              type="radio"
              className={
                errorMsg
                  ? "border border-solid border-red-600 rounded pl-2 focus:outline-none focus:border-gray-400"
                  : "border border-solid border-gray-300 rounded pl-2 focus:outline-none focus:border-gray-400"
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTemperature(+e.target.value);
              }}
            /> */}
            {temperatureOptions.map((option) => (
              <div className="flex items-center ml-2" key={option}>
                <input
                  id={`${option}Option`}
                  type="radio"
                  name="temperature"
                  value={option}
                  className={
                    errorMsg
                      ? "mr-1 border border-solid border-red-600 rounded focus:outline-none focus:border-gray-400"
                      : "mr-1 border border-solid border-gray-300 rounded focus:outline-none focus:border-gray-400"
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTemperature(e.target.value);
                  }}
                />
                <label htmlFor={`${option}Option`} className="mr-3">
                  {option}
                </label>
              </div>
            ))}
          </div>

          <div
            id="errorMessageContainer"
            className="flex flex-col w-2/3 justify-center items-end pr-9"
          >
            <span className="text-red-600 text-xs">{errorMsg}</span>
          </div>

          <div
            id="buttonContainer"
            className="flex flex-row w-2/3 justify-end mt-4"
          >
            <button
              onClick={() => {
                if (handleTemperatureQuestion()) {
                  setErrorMessage("");
                  setSection(3);
                } else {
                  setErrorMessage("ERROR ERROR");
                }
              }}
              className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-1 px-2 rounded text-sm	"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {section === 3 && (
        <div
          id="sectionThreeContainer"
          className="flex flex-col w-full items-center"
        >
          <div
            id="questionAndHelperContainer"
            className="flex flex-col items-center justify-center mb-4"
          >
            <span id="question" className="text-base">
              What is your preferred star rating?
            </span>
            <span
              id="questionHelper"
              className="p-2 font-light text-xs text-gray-500"
            >
              Enter a number
            </span>
          </div>

          <div
            id="answerContainer"
            className="flex flex-row w-2/3 justify-center items-center"
          >
            <label id="starRatingLabel" className="text-sm">
              Min Star Rating:
            </label>
            <input
              id="starRatingInput"
              type="text"
              className={
                errorMsg
                  ? "border border-solid border-red-600 rounded pl-2 focus:outline-none focus:border-gray-400"
                  : "border border-solid border-gray-300 rounded pl-2 focus:outline-none focus:border-gray-400"
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPreferedStarRating(+e.target.value);
              }}
            />
          </div>

          <div
            id="errorMessageContainer"
            className="flex flex-col w-2/3 justify-center items-end pr-9"
          >
            <span className="text-red-600 text-xs">{errorMsg}</span>
          </div>

          <div
            id="buttonContainer"
            className="flex flex-row w-2/3 justify-end mt-4"
          >
            <button
              onClick={() => {
                if (handleStarRatingQuestion()) {
                  setErrorMessage("");
                  setSection(4);
                } else {
                  setErrorMessage("ERROR ERROR");
                }
              }}
              className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-1 px-2 rounded text-sm	"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {section === 4 && (
        <div
          id="sectionThreeContainer"
          className="flex flex-col w-full items-center"
        >
          <div
            id="recomendedHolidayDestinationsContainer"
            className="flex flex-col justify-center items-center gap-2 w-full p-4"
          >
            {recommendedHoliday.length !== 0 && (
              <span
                id="recomendedHolidayDestinationsTitle"
                className="p-2 font-medium text-2xl tracking-wide"
              >
                Recommended Holiday Destinations!
              </span>
            )}

            {recommendedHoliday.length !== 0 && (
              <div
                id="recomendedHolidayResults"
                className="flex flex-col gap-4 overflow-y-scroll max-h-52 w-full border-2 border-gray-200 rounded p-1"
              >
                <table className="table-auto">
                  <thead>
                    <tr className="border-b">
                      <th className="border-b border-r text-left">Location</th>
                      <th className="border-b border-r text-left">
                        Temperature
                      </th>
                      <th className="border-b border-r text-left">Hotel</th>
                      <th className="border-b border-r text-left">
                        Price per Night
                      </th>
                      <th className="border-b text-left">Star Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recommendedHoliday.map((holiday, index) => (
                      <tr key={index}>
                        <td className="border-b text-left">
                          {holiday.city ? holiday.city : holiday.country}
                        </td>
                        <td className="border-b text-left text-sm">
                          {holiday.tempRating.charAt(0).toUpperCase() + holiday.tempRating.slice(1)}
                        </td>
                        <td className="border-b text-left text-sm">
                          {holiday.hotelName}
                        </td>
                        <td className="border-b text-left text-sm">
                          {`£${holiday.pricePerPerNight}`}
                        </td>
                        <td className="border-b text-left text-sm">
                          {`${holiday.starRating} stars`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div id="noHolidayResultsContainer">
              {recommendedHoliday.length === 0 && (
                <span>Sorry! We couldn't find anything :(</span>
              )}
            </div>

            <div
              id="buttonContainer"
              className="flex flex-row justify-center items-center mt-4"
            >
              <button
                onClick={handleStartAgain}
                className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-1 px-2 rounded text-sm	"
              >
                Start again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
