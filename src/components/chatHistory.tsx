import { ChatHistoryType } from "../models/chatHistory.model";

export default function ChatHistor({name, questionAndAnswer}: ChatHistoryType) {
  return (
    <div className="h-full w-full flex justify-start items-center overflow-y-scroll  flex-col gap-4 pt-4">
      
      {questionAndAnswer.length === 0 && <p>Nothing to see here!</p>}
      {questionAndAnswer.length !== 0 && <p>{name}'s Chat History!</p>}

      {questionAndAnswer.length !==0 &&
      questionAndAnswer.map(chatMessage => {
        return(
          <>
            <div className=" h-36 w-full flex flex-col ">
                <div className=" w-3/4 h-1/2 flex items-center pl-2  pr-2">
                    <p>{chatMessage.question}</p>
                </div>
                <div className="  w-full h-1/2 flex items-center justify-end pr-2">
                <p>{chatMessage.answer}</p>

                </div>
            </div>
          </>
        )
      })
      }
        
      
    </div>
  );
}
