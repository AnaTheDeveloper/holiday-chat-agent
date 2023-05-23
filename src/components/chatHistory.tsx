import { ChatHistoryType } from "../models/chatHistory.model";

export default function ChatHistory({
  name,
  questionAndAnswer,
}: ChatHistoryType) {
  return (
    <div
      id="chatHistoryContainer"
      className="h-full w-full flex justify-start items-center overflow-y-scroll  flex-col gap-4 pt-4"
    >
      <div id="chatHistoryTitle" className="flex flex-col items-center">
        {(questionAndAnswer.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <span className="text-gray-800 text-lg">Chat History</span>
            <span className="text-gray-400 text-xs">Nothing to see here</span>
          </div>
        )) || (
          <span className="text-gray-800 text-lg">{name}'s Chat History</span>
        )}
      </div>
      <div id="chathistoryMessageContainer">
        {questionAndAnswer.length !== 0 &&
          questionAndAnswer.map((chatMessage) => {
            return (
              <div
                id="chathistoryMessages"
                className="flex flex-col text-sm h-36 w-full"
              >
                <div
                  id="chatHistoryQuestionAsked"
                  className="flex items-center w-3/4 h-1/2 pl-2 pr-2"
                >
                  <label className="pr-1">bot</label>
                  <span className="p-2 bg-blue-200 rounded">
                    {chatMessage.question}
                  </span>
                </div>
                <div
                  id="chatHistoryUserAnswer"
                  className="flex items-center justify-end w-full h-1/2 pr-2"
                >
                  <span className="p-2 px-4 border border-blue-200 rounded">
                    {chatMessage.answer}
                  </span>
                  <label className="pl-1">{name}</label>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
