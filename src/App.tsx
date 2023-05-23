import { useState } from "react";
import ChatHistory from "./components/chatHistory";
import Header from "./components/header";
import StartScreen from "./pages/startScreen";
import { HolidayDestinationType } from "./models/holidayDestination.model";
import WelcomeScreen from "./pages/welcomeScreen";

function App() {
  // const [isCSVFileUploaded, setIsCSVFileUploaded] = useState<boolean>(false); //duplicated state does the same thing

  const [name, setName] = useState<string>("");
  const [holidayData, setHolidayData] = useState<HolidayDestinationType[]>([]);

  const handleNextbutton = (
    givenName: string,
    holidayData: HolidayDestinationType[]
  ) => {
    setName(givenName);
    setHolidayData(holidayData);
  };

  const removeHolidayData = () => {
    setHolidayData([]);
  };

  return (
    <>
      <Header />
      <div className="pl-4 pr-4 pt-4 ">
        <div className="border-2 border-red-700 h-screen  sm:h-[24rem]  flex gap-4 flex-col sm:flex-row">
          <div className="border-2 border-green-700 w-full h-2/3 sm:w-2/3 sm:h-full flex  items-center justify-center flex-col gap-4">
            {holidayData.length === 0 && (
              <StartScreen handleNextButtonCallback={handleNextbutton} />
            )}

            {holidayData.length !== 0 && (
              <WelcomeScreen
                nameSetByUser={name}
                holidayData={holidayData}
                removeHolidayDataCallback={removeHolidayData}
              />
            )}
          </div>

          <div className="border-2 border-purple-700 w-full h-1/3 sm:w-1/3  sm:h-full flex items-center justify-center">
            <ChatHistory chatMessages={[]} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
