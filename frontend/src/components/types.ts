export interface questionType {
  answer_index: number;
  choices: string[];
  hint: string;
  question: string;
  question_id: number;
}

export interface selectedDataItemType {
  question: questionType;
  givenAnswer: number;
  selectedOption: selectedOptionType;
}

export interface submitDataType {
  isCorrect: boolean;
  selectedOption: selectedOptionType;
  index: number;
}

export interface selectedOptionType {
  value: string;
  valueIndex: number;
}
export interface quizDataType {
  data: questionType[];
  loading: boolean;
}
