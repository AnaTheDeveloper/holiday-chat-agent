
export type ChatHistoryType = {
    name: string;
    questionAndAnswer: QuestionsAndAnswersType[];
}

export type QuestionsAndAnswersType = {
    question: string,
    answer: string | number,
}