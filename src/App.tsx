import { useState } from "react";
import ChatHistory from "./components/chatHistory";
import Header from "./components/header";
import StartScreen from "./pages/startScreen";
import { HolidayDestinationType } from "./models/holidayDestination.model";
import WelcomeScreen from "./pages/welcomeScreen";
import { QuestionsAndAnswersType } from "./models/chatHistory.model";

function App() {
  const [name, setName] = useState<string>("");
  const [holidayData, setHolidayData] = useState<HolidayDestinationType[]>([]);
  const [chatHistory, setChatHistory] = useState<QuestionsAndAnswersType[]>([]);

  const handleNextbutton = (
    givenName: string,
    holidayData: HolidayDestinationType[]
  ) => {
    setName(givenName);
    setHolidayData(holidayData);
  };

  const removeHolidayDataFile = () => {
    setHolidayData([]);
  };

  const handleChatHistory = (newQuestionAndAnswer: QuestionsAndAnswersType) => {
    setChatHistory([...chatHistory, newQuestionAndAnswer]);
  };

  const resetChatHistory = () => {
    setChatHistory([]);
  };

  return (
    <div className="bg-stone-50">
      <Header />
      <div className="pl-4 pr-4 pt-1">
        <div className="flex flex-row gap-4 h-[24rem]">
          <div className="flex flex-col w-2/3 h-full gap-4 items-center justify-center border border-gray-200 rounded bg-white">
            {holidayData.length === 0 && (
              <StartScreen handleNextButtonCallback={handleNextbutton} />
            )}

            {holidayData.length !== 0 && (
              <WelcomeScreen
                nameSetByUser={name}
                holidayData={holidayData}
                removeHolidayDataFileCallback={removeHolidayDataFile}
                handleChatHistoryCallback={handleChatHistory}
                resetChatHistoryCallback={resetChatHistory}
              />
            )}
          </div>
          <div className="flex flex-col w-1/3 h-full gap-4 items-center justify-center border border-gray-200 rounded bg-white">
            <ChatHistory name={name} questionAndAnswer={chatHistory} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
