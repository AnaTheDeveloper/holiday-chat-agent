import { ChatHistoryType } from "../models/chatHistory.model";




export default function ChatHistor(props: ChatHistoryType)
{

    return(

        <div className="h-full w-full flex justify-center items-center">
             {(props.chatMessages?.length > 0 ) &&  <p>Messages</p> || <p>NO Messages</p>}
        </div>
    )
}