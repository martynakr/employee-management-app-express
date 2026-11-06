import type { ChatMessage } from "./Chatbot";

interface Props {
    message: ChatMessage;
}

const ChatMessageComponent = ({ message }: Props) => {
    const isUser = message.role === "user";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                    isUser
                        ? "bg-navy text-white rounded-br-sm"
                        : "bg-border text-text-main rounded-bl-sm"
                }`}
            >
                <p className="whitespace-pre-wrap">{message.content}</p>

                <span
                    className={`mt-1 block text-[10px] ${
                        isUser ? "text-blue-100" : "text-slate-400"
                    }`}
                >
                    {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>
            </div>
        </div>
    );
};

export default ChatMessageComponent;
