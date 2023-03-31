import { useState, ChangeEvent } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import Card from "react-bootstrap/Card";
import AnswerSelection from "./AnswerSelection";
import QuestionSelect from "./QuestionSelect";
import Question from "./Question";
import {
  quizDataType,
  selectedDataItemType,
  submitDataType,
  questionType,
} from "./types";

const QuizContainer = () => {
  const [quizData, setquizData] = useState<quizDataType>({
    data: [],
    loading: false,
  });
  const [outputData, setoutputData] = useState<selectedDataItemType[]>([]);
  const [noOfQuestions, setnoOfQuestions] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setisCompleted] = useState<boolean>(false);
  const [isLoadAnswers, setisLoadAnswers] = useState<boolean>(false);

  const { loading } = quizData;

  const handleClick = async () => {
    setquizData({ ...quizData, loading: true });

    try {
      const { data } = await axios({
        method: "GET",
        url: "http://localhost:3001/getquestions",
      });
      const filterItems = data.filter(
        (_item: questionType, index: number) => noOfQuestions > index
      );
      setquizData({ data: filterItems, loading: false });
    } catch (_error) {
      setquizData({ data: [], loading: false });
    }
  };

  const handleQuestionSubmit = ({
    isCorrect,
    selectedOption,
    index,
  }: submitDataType) => {
    setoutputData([
      ...outputData,
      {
        question: quizData.data[index],
        givenAnswer: selectedOption.valueIndex,
        selectedOption,
      },
    ]);

    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestionIndex === quizData.data.length - 1) {
      setisCompleted(true);
    } else {
      setCurrentQuestionIndex((prevVal) => prevVal + 1);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setnoOfQuestions(parseInt(e.target.value));
  };

  const currentQuestion: questionType = quizData.data[currentQuestionIndex];

  const getVarient = (score: number) => {
    if (score >= 80) {
      return "success";
    } else if (score >= 35 && score < 50) {
      return "warning";
    } else if (score < 35) {
      return "danger";
    } else {
      return "primary";
    }
  };

  return (
    <Container>
      {!noOfQuestions ? (
        <Stack gap={2} direction="horizontal">
          <h2>Select number of questions wanted to ask ?</h2>
          <QuestionSelect handleChange={handleChange} />
        </Stack>
      ) : (
        <>
          <Card>
            <Card.Header as="h5">Quiz</Card.Header>
            <Card.Body>
              <Card.Title>
                You have selected {noOfQuestions} questions
              </Card.Title>
              <Card.Text>
                Please start the test by clicking below start button, All the
                best.
              </Card.Text>
              <Card.Text>
                For Each question you have 45 seconds to complete.
              </Card.Text>
              <Button
                disabled={loading || quizData.data.length ? true : false}
                onClick={!loading ? handleClick : () => ""}
              >
                {loading
                  ? "Loading..."
                  : loading || quizData.data.length
                  ? isCompleted
                    ? "Test Completed"
                    : "Test Started"
                  : "Start Test"}
              </Button>
            </Card.Body>
          </Card>
        </>
      )}

      <br />
      <br />
      {isCompleted ? (
        <>
          <Alert
            key={getVarient((score / quizData.data.length) * 100)}
            variant={getVarient((score / quizData.data.length) * 100)}
          >
            <Alert.Heading>Thanks for taking the Quiz.</Alert.Heading>
            <p>
              You have completed the test and scored scored{" "}
              <strong>
                {score} out of {quizData.data.length}
              </strong>
            </p>
            <hr />
            <p>Please check your results by clicking the below button.</p>
            <Stack gap={2} className="col-md-5" direction="horizontal">
              <Button onClick={() => setisLoadAnswers((prevVal) => !prevVal)}>
                Check Your Answers
              </Button>
              <Button onClick={() => window.location.reload()}>
                Retry Quiz
              </Button>
            </Stack>
          </Alert>
          {isLoadAnswers && outputData.length && (
            <Card>
              {outputData.map((item: selectedDataItemType, index: number) => {
                return (
                  <div key={index}>
                    <Question
                      data={item.question}
                      currentQuestionIndex={index}
                      selectedOption={item.selectedOption}
                      isPreview={true}
                    />
                  </div>
                );
              })}
            </Card>
          )}
        </>
      ) : (
        <div className="questions-container">
          {currentQuestion && (
            <AnswerSelection
              data={currentQuestion}
              onSubmit={handleQuestionSubmit}
              currentQuestionIndex={currentQuestionIndex}
              isLastIndex={currentQuestionIndex === quizData.data.length - 1}
              answer={currentQuestion.answer_index}
            />
          )}
        </div>
      )}
      <br />
    </Container>
  );
};

export default QuizContainer;
