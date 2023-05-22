import { ChangeEvent, useState } from "react";
import { HolidayDestinationType } from "../models/holidayDestination.model";

export type StartScreenType = {
  handleNextButtonCallback: Function;
};

export default function StartScreen({ handleNextButtonCallback }: StartScreenType) {
  const [name, setName] = useState<string>("");
  const [holidayData, setHolidayData] = useState<HolidayDestinationType[]>([]);

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

  const handleClickNext = () => {
    handleNextButtonCallback(name, holidayData);
  };

  return (
    <div
      className="h-full w-full flex items-center justify-center flex-col gap-4"
    >
      <p>Lets Get Started</p>

      {(name.length === 0 || holidayData.length === 0) && (
        <p>Please enter a name and upload a file</p>
      )}

      <div className="flex justify-center items-center  flex-col gap-4 ">
        <label>Whats your name?</label>
        <input
          type="text"
          className="border border-black pl-2"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        ></input>
      </div>
      <div className="flex justify-center items-center  flex-col gap-4 ">
        <label>Upload holiday CSV file!</label>
        <input
          className="border border-black pl-2"
          type="file"
          onChange={handleFileChange}
          accept=".csv"
        ></input>
      </div>

      {(name.length !== 0 && holidayData.length !== 0) && (
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
