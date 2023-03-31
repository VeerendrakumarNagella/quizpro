import { FC, ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { questionType, selectedOptionType } from "./types";

interface QuestionProps {
  data: questionType;
  handleOptionChange?: (e: ChangeEvent<HTMLInputElement>, val: number) => void;
  currentQuestionIndex: number;
  selectedOption: selectedOptionType;
  isPreview?: boolean;
}

const Question: FC<QuestionProps> = ({
  currentQuestionIndex,
  data,
  selectedOption,
  handleOptionChange,
  isPreview,
}) => {
  const getLabel = (index: number, item: string) => {
    if (isPreview) {
      if (index === data.answer_index) {
        if (selectedOption.valueIndex === data.answer_index) {
          return (
            <span style={{ color: "green" }}>
              {item} - You selected Right answer <span>&#10003;</span>
            </span>
          );
        }
        return <span style={{ color: "green" }}>{item} - Correct answer</span>;
      } else if (
        selectedOption.value === item &&
        selectedOption.valueIndex !== data.answer_index
      ) {
        return (
          <span style={{ color: "red" }}>
            {item} - You selected Wrong answer
          </span>
        );
      } else return item;
    } else {
      return item;
    }
  };

  return (
    <>
      <Card.Header as="h5">
        {currentQuestionIndex + 1}. {data.question}
        {selectedOption.valueIndex < 0 && isPreview && (
          <span style={{ color: "red" }}> - You didn't select any answer</span>
        )}
      </Card.Header>
      <Card.Body>
        {data.choices.map((item: string, index: number) => {
          return (
            <div key={item} className="mb-3">
              {isPreview ? (
                <Form.Check
                  inline
                  label={getLabel(index, item)}
                  name="group1"
                  type="radio"
                  readOnly
                  id={`inline-radio-${data.question_id}`}
                />
              ) : (
                <Form.Check
                  inline
                  label={item}
                  name="group1"
                  type="radio"
                  value={item}
                  checked={selectedOption.value === item}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleOptionChange && handleOptionChange(event, index)
                  }
                  id={`inline-radio-${item}`}
                />
              )}
            </div>
          );
        })}
      </Card.Body>
    </>
  );
};

export default Question;
