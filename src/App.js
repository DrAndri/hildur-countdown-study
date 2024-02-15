import "./App.css";
import Countdown from "react-countdown";

function App() {
  const date = new Date("2024-05-24T11:00:00");
  const renderer = (props) => {
    if (props.completed) {
      // Render a completed state
      return "ÞÚ ERT BÚIN AÐ SKILA!!!";
    } else {
      // Render a countdown
      return (
        <span>
          {props.formatted.days} : {props.formatted.hours} :{" "}
          {props.formatted.minutes} : {props.formatted.seconds}
        </span>
      );
    }
  };

  return (
    <div className="App">
      <Countdown date={date} renderer={renderer} />
    </div>
  );
}

export default App;
