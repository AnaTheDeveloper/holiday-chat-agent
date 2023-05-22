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
  const handleBackClick = () => {
    removeHolidayDataCallback();
  };

  return (
    <div className="h-full w-full">
      <p>Hi {nameSetByUser}!</p>
      <p>
        Get ready for an exhilarating and unforgettable adventure customized
        just for you - we're thrilled to make it happen!
      </p>
      <button onClick={handleBackClick} className="border border-blue-800 px-1">
        Back
      </button>
    </div>
  );
}
