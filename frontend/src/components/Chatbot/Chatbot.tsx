import { useEffect, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

import Button from "../Button/Button";
import Form from "../Form/Form";
import ChatMessageComponent from "./ChatMessage";
import { sendChatMessage } from "../../services/chat";

export interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

interface ChatFormValues {
    question: string;
}

const createMessage = (
    role: ChatMessage["role"],
    content: string,
): ChatMessage => ({
    id: crypto.randomUUID(),
    role,
    content,
    timestamp: new Date(),
});

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [messages, setMessages] = useState<ChatMessage[]>([
        createMessage(
            "assistant",
            "Hi! I'm your HR assistant. How can I help you today?",
        ),
    ]);

    const methods = useForm<ChatFormValues>({
        defaultValues: {
            question: "",
        },
    });

    const {
        register,
        reset,
        watch,
        formState: { isSubmitting },
    } = methods;

    const input = watch("question");

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, isSubmitting]);

    const handleSend: SubmitHandler<ChatFormValues> = async ({ question }) => {
        const trimmedQuestion = question.trim();

        if (!trimmedQuestion) return;

        setMessages((prev) => [
            ...prev,
            createMessage("user", trimmedQuestion),
        ]);

        reset();

        try {
            const answer = await sendChatMessage({
                question: trimmedQuestion,
            });

            setMessages((prev) => [
                ...prev,
                createMessage("assistant", answer.answer),
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                createMessage(
                    "assistant",
                    "Sorry, I couldn't process your question. Please try again.",
                ),
            ]);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[1000]">
            {isOpen && (
                <div className="mb-4 flex h-[500px] w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
                    <div className="flex items-center justify-between bg-navy px-5 py-4 text-white">
                        <div>
                            <h2 className="font-heading font-semibold">
                                HR Assistant
                            </h2>
                            <p className="text-xs text-blue-100">
                                Ask me about company policies
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close chat"
                            className="rounded-lg p-2 transition hover:bg-blue-700"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-background p-4">
                        {messages.map((message) => (
                            <ChatMessageComponent
                                key={message.id}
                                message={message}
                            />
                        ))}

                        {isSubmitting && (
                            <div className="flex justify-start">
                                <div className="rounded-2xl rounded-bl-sm bg-surface px-4 py-3 text-sm text-text-muted shadow-sm">
                                    Thinking...
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <div className="border-t border-border bg-surface p-3">
                        <Form
                            methods={methods}
                            onSubmit={handleSend}
                            className="my-0 flex-row items-end gap-2"
                        >
                            <textarea
                                {...register("question")}
                                onKeyDown={(event) => {
                                    if (
                                        event.key === "Enter" &&
                                        !event.shiftKey
                                    ) {
                                        event.preventDefault();
                                        event.currentTarget.form?.requestSubmit();
                                    }
                                }}
                                placeholder="Ask a question..."
                                rows={1}
                                disabled={isSubmitting}
                                className="max-h-28 min-h-10 flex-1 resize-none rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text-main outline-none placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary disabled:bg-background"
                            />

                            <Button
                                type="submit"
                                disabled={!input.trim() || isSubmitting}
                                variant="primary"
                                className="rounded-xl px-4 py-2"
                            >
                                Send
                            </Button>
                        </Form>

                        <p className="mt-2 text-center text-[10px] text-text-muted">
                            AI-generated answers may not always be accurate.
                        </p>
                    </div>
                </div>
            )}
            <Button
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={isOpen ? "Close chat" : "Open HR assistant"}
                aria-expanded={isOpen}
                variant="primary"
                className="ml-auto flex h-14 w-14 items-center justify-center rounded-full p-0 text-xl shadow-lg hover:scale-105"
            >
                {isOpen ? "✕" : <FontAwesomeIcon icon={faComment} />}
            </Button>
        </div>
    );
};

export default Chatbot;
