export interface Answer {
    answer: string;
}

export interface Question {
    question: string;
}

const API_URL = "http://localhost:3000/api/";
export async function sendChatMessage(question: Question): Promise<Answer> {
    const response = await fetch(`${API_URL}ai`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(question),
    });

    if (!response.ok) {
        throw new Error("Failed to get a response from the AI assistant");
    }

    return await response.json();
}
