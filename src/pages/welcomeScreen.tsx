import { useState } from "react";
import { HolidayDestinationType } from "../models/holidayDestination.model";

export type WelcomeScreenType = {
  nameSetByUser: string;
  holidayData: HolidayDestinationType[];
  removeHolidayDataCallback: Function;
};

export default function WelcomeScreen({
  nameSetByUser,
  holidayData,
  removeHolidayDataCallback,
}: WelcomeScreenType) {
  const [recommendedHoliday, setRecommendedHoliday] =
    useState<HolidayDestinationType[]>(holidayData);
  const [section, setSection] = useState<number>(0);

  const [budget, setBudget] = useState<number>(0);
  const [preferedStarRating, setPreferedStarRating] = useState<number>(0);

  //Handle Questions

  const handleBudgetQuestion = () => {
    const holidaysWithinBudget: HolidayDestinationType[] = [];

    for (let i = 0; i < recommendedHoliday.length; i++) {
      if (recommendedHoliday[i].pricePerPerNight <= budget) {
        holidaysWithinBudget.push(recommendedHoliday[i]);
      }
    }
    setRecommendedHoliday(holidaysWithinBudget);
  };

  const handleStarRatingQuestion = () => {
    const holidaysWithinPreferedStarRating: HolidayDestinationType[] = [];

    for (let i = 0; i < recommendedHoliday.length; i++) {
      if (recommendedHoliday[i].starRating >= preferedStarRating) {
        holidaysWithinPreferedStarRating.push(recommendedHoliday[i]);
      }
    }
    setRecommendedHoliday(holidaysWithinPreferedStarRating);
  };

  //Buttons
  const handleBackClick = () => {
    removeHolidayDataCallback();
  };

  const handleStartAgain = () => {
    setRecommendedHoliday(holidayData);
    setSection(0);
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-4 px-10">
      {section === 0 && (
        <>
          <p>Hi {nameSetByUser}!</p>
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
                className="border border-black ml-2"
                placeholder="00.00"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setBudget(+e.target.value);
                }}
              ></input>
            </div>
            <div className="flex flex-row gap-4">
              <button
                onClick={() => {
                  handleBudgetQuestion();
                  setSection(2);
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
                className="border border-black ml-2"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPreferedStarRating(+e.target.value);
                }}
              ></input>
            </div>
            <div className="flex flex-row gap-4">
              <button
                onClick={() => {
                  handleStarRatingQuestion();
                  setSection(3);
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
            <div>
              <p>Heres your holiday destinations</p>

              {recommendedHoliday.length !== 0 &&
                recommendedHoliday.map((holiday) => {
                  return (
                    <>
                      <p>
                        {" "}
                        Holuiday Destination: {holiday.country} for price: £
                        {holiday.pricePerPerNight} with star rating:{" "}
                        {holiday.starRating}
                      </p>
                    </>
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
                start again
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
