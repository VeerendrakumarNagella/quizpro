import { FC, ChangeEvent } from "react";
import Form from "react-bootstrap/Form";

interface QProps {
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const QuestionSelect: FC<QProps> = ({ handleChange }) => {
  return (
    <Form.Select
      aria-label="Sslect number of questions"
      onChange={handleChange}
      style={{ maxWidth: "250px" }}
    >
      <option>Select number of questions</option>
      {new Array(20).fill(1).map((val: number, index: number) => (
        <option value={index + 5} key={index}>
          {index + 5}
        </option>
      ))}
    </Form.Select>
  );
};

export default QuestionSelect;
