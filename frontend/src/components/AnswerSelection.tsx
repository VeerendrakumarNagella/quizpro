import { FC, useState, useEffect, ChangeEvent } from "react";
import { Button, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Question from "./Question";
import { questionType, submitDataType } from "./types";
import CircularProgressWithLabel from "./CircularProgress";

interface AnsProps {
  data: questionType;
  onSubmit: (val: submitDataType) => void;
  currentQuestionIndex: number;
  isLastIndex: boolean;
  answer: number;
}

const timer = 30;

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
  const [timeLeft, setTimeLeft] = useState(timer);
  const [stage, setStage] = useState<
    | "primary"
    | "inherit"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
  >("primary");

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

    if (timeLeft === 20 && stage === "primary") {
      setStage("warning");
    }

    if (timeLeft === 10 && stage === "warning") {
      setStage("error");
    }

    if (timeLeft === 0) {
      setStage("info");
      handleSubmit();
    }

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(timer);
    setStage("primary");
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
          <Stack direction="horizontal" gap={4}>
            <Button onClick={handleSubmit}>
              {isLastIndex ? "Submit Test" : "Next Question"}
            </Button>
            <CircularProgressWithLabel
              value={(timeLeft / timer) * 100}
              textnode={timeLeft}
              color={stage}
              style={{
                background: "#e3e3e3",
                borderRadius: "50%",
              }}
            />
            <div>
              {stage === "warning" && (
                <span style={{ color: "orange" }}>Time is running out!</span>
              )}
              {stage === "error" && (
                <span style={{ color: "red" }}>Hint: {data.hint}</span>
              )}
              {stage === "info" && (
                <span style={{ color: "red" }}>Time's up!</span>
              )}
            </div>
          </Stack>
        </Card.Body>
      </Card>
    </Form>
  );
};

export default AnswerSelection;
