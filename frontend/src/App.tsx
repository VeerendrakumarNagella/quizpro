import "./App.css";
import Header from "./components/Header";
import QuizContainer from "./components/QuizContainer";

const App = () => {
  return (
    <div className="App-container">
      <Header />
      <br />
      <br />
      <QuizContainer />
      <br />
    </div>
  );
};

export default App;
