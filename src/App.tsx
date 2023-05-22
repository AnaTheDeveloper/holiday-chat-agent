import ChatHistory from "./components/chatHistory";
import Header from "./components/header";
import StartScreen from "./pages/startScreen";

function App() {
  return (
    <>
      <Header />
      <div className="pl-4 pr-4 pt-4 ">
        <div className="border border-red-700 h-screen  sm:h-[24rem]  flex gap-4 flex-col sm:flex-row">
          <div
            className="border border-green-700 w-full h-2/3 sm:w-2/3 sm:h-full flex  items-center justify-center
        flex-col gap-4
        "
          >
            <StartScreen></StartScreen>
          </div>

          <div className="border border-purple-700 w-full h-1/3 sm:w-1/3  sm:h-full flex items-center justify-center">
            <ChatHistory chatMessages={[]} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
