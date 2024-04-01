import { FC, ChangeEvent } from "react";
import Form from "react-bootstrap/Form";

interface QProps {
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const QuestionSelect: FC<QProps> = ({ handleChange }) => {
  return (
    <Form.Select
      aria-label="Select number of questions"
      onChange={handleChange}
      style={{ maxWidth: "250px" }}
    >
      <option>Select number of questions</option>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={15}>15</option>
      <option value={20}>20</option>
      <option value={25}>25</option>
      <option value={30}>30</option>
      <option value={35}>35</option>
      <option value={40}>40</option>
      <option value={45}>45</option>
      <option value={50}>50</option>
      <option value={100}>All</option>
    </Form.Select>
  );
};

export default QuestionSelect;
