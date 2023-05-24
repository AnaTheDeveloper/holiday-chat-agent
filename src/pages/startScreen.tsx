import { ChangeEvent, useState } from "react";
import { HolidayDestinationType } from "../models/holidayDestination.model";

export type StartScreenType = {
  handleNextButtonCallback: Function;
};

export default function StartScreen({
  handleNextButtonCallback,
}: StartScreenType) {
  const [name, setName] = useState<string>("");
  const [holidayData, setHolidayData] = useState<HolidayDestinationType[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const contents = reader.result as string;

        if (!isCorrectCSVFile(contents)) {
          alert(
            "The uploaded .csv file is incorrect. Please attempt the upload again."
          );
          return;
        }

        const dataSplitByNewLine: string[] =
        seperateHolidayDataByNewLine(contents);

        const dataSplitByComma: string[][] =
        seperateNewLinebyComma(dataSplitByNewLine);

        const finalFormattedHolidayData = applyHolidayDataToModel(
          dataSplitByComma
        );
        setHolidayData(finalFormattedHolidayData);
      };
      reader.readAsText(file);
    }
  };

  const isCorrectCSVFile = (fileContents: string): boolean => {
    const requiredHeaders = [
      "HolidayReference",
      "HotelName",
      "City",
      "Continent",
      "Country",
      "Category",
      "StarRating",
      "TempRating",
      "Location",
      "PricePerPerNight",
    ];
    const firstLine = fileContents.split("\n")[0];
    return requiredHeaders.every((header) => firstLine.includes(header));
  };

  const seperateHolidayDataByNewLine = (holidayData: string): string[] => {
    const lines = holidayData.split("\n");
    lines.shift();
    lines.pop();
    return lines;
  };

  const seperateNewLinebyComma = (
    holidayDataSplitByNewLine: string[]
  ): string[][] => {
    let newFormattedArray: string[][] = [];

    for (let i = 0; i < holidayDataSplitByNewLine.length; i++) {
      const splitArrayByComma: string[] =
        holidayDataSplitByNewLine[i].split(",");
      newFormattedArray.push(splitArrayByComma);
    }
    return newFormattedArray;
  };

  const applyHolidayDataToModel = (
    dataSplitByComma: string[][]
  ): HolidayDestinationType[] => {
    let finalFormattedHolidayData: HolidayDestinationType[] = [];

    for (let i = 0; i < dataSplitByComma.length; i++) {
      const reformattedPricePerNight: string = dataSplitByComma[i][9]
        .replace("\r", "")
        .trim();

      let holidayDestination: HolidayDestinationType = {
        holidayReference: Number(dataSplitByComma[i][0]),
        hotelName: dataSplitByComma[i][1],
        city: dataSplitByComma[i][2],
        continent: dataSplitByComma[i][3],
        country: dataSplitByComma[i][4],
        category: dataSplitByComma[i][5],
        starRating: Number(dataSplitByComma[i][6]),
        tempRating: dataSplitByComma[i][7],
        location: dataSplitByComma[i][8],
        pricePerPerNight: +reformattedPricePerNight,
      };
      finalFormattedHolidayData.push(holidayDestination);
    }
    return finalFormattedHolidayData;
  };

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
            Please enter your name and upload a file
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
            data-testid="nameInput-test"
          />
        </div>

        <div className="flex justify-center items-center  flex-col gap-3 ">
          <label className="text-base">Upload holiday CSV file!</label>
          <input
            className="border border-solid border-gray-300 rounded focus:outline-none focus:border-gray-400"
            type="file"
            onChange={handleFileChange}
            accept=".csv"
            data-testid="fileUpload-test"
          />
        </div>
      </div>

      {name.length !== 0 && holidayData.length !== 0 && (
        <div
          id="buttonContainer"
          className="flex flex-row w-2/3 justify-end mt-4"
        >
          <button
            onClick={handleClickNext}
            className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-1 px-2 rounded text-sm	"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
