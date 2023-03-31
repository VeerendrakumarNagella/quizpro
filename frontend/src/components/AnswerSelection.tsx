import { FC, useState, useEffect, ChangeEvent } from "react";
import { Button, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Question from "./Question";
import { questionType, submitDataType } from "./types";

interface AnsProps {
  data: questionType;
  onSubmit: (val: submitDataType) => void;
  currentQuestionIndex: number;
  isLastIndex: boolean;
  answer: number;
}

const AnswerSelection: FC<AnsProps> = ({
  data,
  onSubmit,
  currentQuestionIndex,
  isLastIndex,
  answer,
}) => {
  const [selectedOption, setSelectedOption] = useState({
    value: "",
    valueIndex: -1,
  });
  const [timeLeft, setTimeLeft] = useState(45);
  const [stage, setStage] = useState("normal");

  const handleOptionChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setSelectedOption({ value: event.target.value, valueIndex: index });
  };

  const handleSubmit = () => {
    onSubmit({
      isCorrect: selectedOption.valueIndex === answer,
      selectedOption,
      index: currentQuestionIndex,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    if (timeLeft === 20 && stage === "normal") {
      setStage("warning");
    }

    if (timeLeft === 10 && stage === "warning") {
      setStage("hint");
    }

    if (timeLeft === 0) {
      setStage("timeout");
      handleSubmit();
    }

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(45);
    setStage("normal");
    setSelectedOption({
      value: "",
      valueIndex: -1,
    });
  }, [currentQuestionIndex]);

  return (
    <Form>
      <Card>
        <Question
          currentQuestionIndex={currentQuestionIndex}
          data={data}
          selectedOption={selectedOption}
          handleOptionChange={handleOptionChange}
        />

        <Card.Body
          style={{
            paddingTop: 0,
          }}
        >
          <Stack direction="horizontal" gap={2}>
            <Button onClick={handleSubmit}>
              {isLastIndex ? "Submit Test" : "Next Question"}
            </Button>
            <Card.Text>
              <span>
                {(stage === "normal" ||
                  stage === "warning" ||
                  stage === "hint") &&
                  `Timer: ${timeLeft} seconds`}
                &nbsp; &nbsp;
                {stage === "warning" && (
                  <span style={{ color: "orange" }}>Time is running out!</span>
                )}
                {stage === "hint" && (
                  <span style={{ color: "red" }}>Hint: {data.hint}</span>
                )}
                {stage === "timeout" && (
                  <span style={{ color: "red" }}>Time's up!</span>
                )}
              </span>
            </Card.Text>
          </Stack>
        </Card.Body>
      </Card>
    </Form>
  );
};

export default AnswerSelection;
