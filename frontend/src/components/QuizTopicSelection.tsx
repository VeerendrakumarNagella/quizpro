import { FC, ChangeEvent } from "react";
import Form from "react-bootstrap/Form";

interface QuizTopicSelectionProps {
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const QuizTopicSelection: FC<QuizTopicSelectionProps> = ({ handleChange }) => {
  return (
    <Form.Select
      aria-label="Select number of questions"
      onChange={handleChange}
      style={{ maxWidth: "150px" }}
    >
      <option value="html">HTML</option>
      <option value="css">CSS</option>
      <option value="js">JavaScript</option>
      <option value="react" disabled>
        ReactJS
      </option>
      <option value="redux" disabled>
        Redux
      </option>
    </Form.Select>
  );
};

export default QuizTopicSelection;
