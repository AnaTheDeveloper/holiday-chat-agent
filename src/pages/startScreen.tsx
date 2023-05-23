import { ChangeEvent, useState } from "react";
import { HolidayDestinationType } from "../models/holidayDestination.model";

export type StartScreenType = {
  handleNextButtonCallback: Function;
};

export default function StartScreen({
  handleNextButtonCallback,
}: StartScreenType) {

  //--STATE--//
  const [name, setName] = useState<string>("");
  const [holidayData, setHolidayData] = useState<HolidayDestinationType[]>([]);

  //--PROCESS CSV FILE -- START--//
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const contents = reader.result as string;

        const dataSplitByNewLine: string[] =
          formattingHolidayDataByLines(contents);

        const dataAsStringArrayArray: string[][] =
          newLineAsStringArray(dataSplitByNewLine);

        const formattedHolidayData = arrayOfHolidayDestinations(
          dataAsStringArrayArray
        );
        setHolidayData(formattedHolidayData);
      };
      reader.readAsText(file);
    }
  };

  const formattingHolidayDataByLines = (holidayData: string): string[] => {
    const lines = holidayData.split("\n");

    //Remove first item in array which is the column headers.
    lines.shift();

    //Removes blank empty row from the end of the array.
    lines.pop();

    return lines;
  };

  const newLineAsStringArray = (
    holidayDataSplitByNewLine: string[]
  ): string[][] => {
    let newFormattedArray: string[][] = [];

    //loop through the holidays data by new line and split by comma.

    for (let i = 0; i < holidayDataSplitByNewLine.length; i++) {
      const splitArrayByComma: string[] =
        holidayDataSplitByNewLine[i].split(",");
      newFormattedArray.push(splitArrayByComma);
    }
    return newFormattedArray;
  };

  const arrayOfHolidayDestinations = (
    dataArrayArray: string[][]
  ): HolidayDestinationType[] => {
    let finalFormattedHolidayData: HolidayDestinationType[] = [];

    for (let i = 0; i < dataArrayArray.length; i++) {
      const reformattedPricePerNight: string = dataArrayArray[i][9]
        .replace("\r", "")
        .trim();

      let holidayDestination: HolidayDestinationType = {
        holidayReference: Number(dataArrayArray[i][0]),
        hotelName: dataArrayArray[i][1],
        city: dataArrayArray[i][2],
        continent: dataArrayArray[i][3],
        country: dataArrayArray[i][4],
        category: dataArrayArray[i][5],
        starRating: Number(dataArrayArray[i][6]),
        tempRating: dataArrayArray[i][7],
        location: dataArrayArray[i][8],
        pricePerPerNight: +reformattedPricePerNight,
      };
      finalFormattedHolidayData.push(holidayDestination);
    }
    return finalFormattedHolidayData;
  };
  //--PROCESS CSV FILE -- END--//

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);    
  };

  const handleClickNext = () => {
    handleNextButtonCallback(name, holidayData);
  };

  return (
    <div className="h-full w-full flex items-center justify-start flex-col pt-4">
      <div className="flex flex-col justify-center items-center">
        <p className="p-2 font-medium text-3xl tracking-wide">
          Lets get started!
        </p>

        {(name.length === 0 || holidayData.length === 0) && (
          <p className="p-2 font-light text-xs text-gray-500">
            Please enter a name and upload a file
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-center items-center flex-col gap-3">
          <label className="text-base">What is your name?</label>
          <input
            type="text"
            className="border border-solid border-gray-300 rounded pl-2 focus:outline-none focus:border-gray-400 w-full"
            onChange={handleNameChange}
          />
        </div>

        <div className="flex justify-center items-center  flex-col gap-3 ">
          <label className="text-base">Upload holiday CSV file!</label>
          <input
            className="border border-solid border-gray-300 rounded focus:outline-none focus:border-gray-400"
            type="file"
            onChange={handleFileChange}
            accept=".csv"
          />
        </div>
      </div>

      {name.length !== 0 && holidayData.length !== 0 && (
        <button
          onClick={handleClickNext}
          className="border border-blue-800 px-1"
        >
          Next
        </button>
      )}
    </div>
  );
}
