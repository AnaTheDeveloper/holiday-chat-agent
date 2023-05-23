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
  resetChatHistoryCallback
}: WelcomeScreenType) {
  const [recommendedHoliday, setRecommendedHoliday] =
    useState<HolidayDestinationType[]>(holidayData);
  const [section, setSection] = useState<number>(0);

  const [budget, setBudget] = useState<number>(0);
  const [preferedStarRating, setPreferedStarRating] = useState<number>(0);

  const [errorMsg, setErrorMessage] = useState<string>("");

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
      question: 'What your budget per night?',
      answer: budget
    }
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
      question: 'What your minumin star rating you are happy to stay at?',
      answer: preferedStarRating
    }

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
        <>
          <span>{`Welcome ${nameSetByUser}!`}</span>
          <p className="text-center">
            Get ready for an exhilarating and unforgettable adventure customized
            just for you - we're thrilled to make it happen!
          </p>
          <div className="flex flex-row gap-4">
            <button
              onClick={handleBackClick}
              className="border border-blue-800 px-1"
            >
              Choose a new file
            </button>

            <button
              onClick={() => {
                setSection(1);
              }}
              className="border border-blue-800 px-1"
            >
              Next
            </button>
          </div>
        </>
      )}

      {section === 1 && (
        <>
          <div className="flex flex-col gap-4">
            <p>What your budget per night?</p>
            <p>Enter a number</p>

            <div>
              <label>Max Budget: £</label>
              <input
                type="text"
                className={
                  errorMsg
                    ? "border border-red-600 ml-2"
                    : "border border-black ml-2"
                }
                placeholder="00.00"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setBudget(+e.target.value);
                }}
              ></input>
            </div>
            <p>{errorMsg}</p>
            <div className="flex flex-row gap-4">
              <button
                onClick={() => {
                  if (handleBudgetQuestion()) {
                    setErrorMessage("");
                    setSection(2);
                  } else {
                    setErrorMessage("ERROR ERROR");
                  }
                }}
                className="border border-blue-800 px-1"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
      {section === 2 && (
        <>
          <div className="flex flex-col gap-4">
            <p>What your minumin star rating you are happy to stay at?</p>
            <p>Enter a number</p>
            <div>
              <label>Min star rating:</label>
              <input
                type="text"
                className={
                  errorMsg
                    ? "border border-red-600 ml-2"
                    : "border border-black ml-2"
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPreferedStarRating(+e.target.value);
                }}
              ></input>
            </div>
            <p>{errorMsg}</p>

            <div className="flex flex-row gap-4">
              <button
                onClick={() => {
                  if (handleStarRatingQuestion()) {
                    setErrorMessage("");
                    setSection(3);
                  } else {
                    setErrorMessage("ERROR ERROR");
                  }
                }}
                className="border border-blue-800 px-1"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
      {section === 3 && (
        <>
          <div className="flex flex-col gap-4">
            {recommendedHoliday.length !== 0 && (
              <p>Heres your holiday destinations</p>
            )}
            <div className="flex flex-col gap-4 overflow-y-scroll max-h-52 ">
              {recommendedHoliday.length !== 0 &&
                recommendedHoliday.map((holiday) => {
                  return (
                    <p>
                      {" "}
                      Holuiday Destination: {holiday.country} for price: £
                      {holiday.pricePerPerNight} with star rating:{" "}
                      {holiday.starRating}
                    </p>
                  );
                })}
            </div>

            {recommendedHoliday.length === 0 && (
              <p>Sorry! We couldnt find anything</p>
            )}

            <div className="flex flex-row gap-4">
              <button
                onClick={handleStartAgain}
                className="border border-blue-800 px-1"
              >
                Start again
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
