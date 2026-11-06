import { AgenticRetrieveStreamCommand } from "@aws-sdk/client-bedrock-agent-runtime";

import { bedrockClient } from "../../config/bedrock.js";

const knowledgeBaseId = process.env.AWS_BEDROCK_KNOWLEDGE_BASE_ID;

if (!knowledgeBaseId) {
    throw new Error("AWS_BEDROCK_KNOWLEDGE_BASE_ID is not configured");
}

type AskOptions = {
    includeSources?: boolean;
    maxSources?: number;
    snippetLength?: number;
};

export const askKnowledgeBase = async (question: string) => {
    const command = new AgenticRetrieveStreamCommand({
        messages: [
            {
                role: "user",
                content: {
                    text: `Answer the following question using the HR policy documents.

                    Keep your response concise:
                    - Maximum 2 sentences.
                    - Give the direct answer first.
                    - Avoid unnecessary examples and repetition.
                    - Use bullet points only when necessary.

                    Question: ${question}`,
                },
            },
        ],

        retrievers: [
            {
                configuration: {
                    knowledgeBase: {
                        knowledgeBaseId,
                    },
                },
            },
        ],

        agenticRetrieveConfiguration: {
            foundationModelType: "MANAGED",
            rerankingModelType: "MANAGED",
            maxAgentIteration: 1,
        },

        generateResponse: true,
    });

    const response = await bedrockClient.send(command);

    let result: any;

    for await (const event of response.stream ?? []) {
        if (event.result) {
            result = event.result;
            break;
        }
    }

    if (!result) {
        throw new Error("Bedrock did not return a result");
    }

    const answer: string = result.generatedResponse?.answer ?? "";

    return { answer };
};
