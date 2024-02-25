import React from "react";
import { useState } from "react";
import Countdown from "react-countdown";
import ReactPageScroller, { SectionContainer } from "react-page-scroller";
import ReactAudioPlayer from "react-audio-player";
import YZhanWeather from "yzhanweather";
import TextSection from "./sections/TextSection/TextSection.tsx";
import ScrollArrow from "./components/ScrollArrow/ScrollArrow.tsx";
import TextMorph from "./components/TextMorph/TextMorph.tsx";
import neverGiveUp from "./assets/never-give-up.webp";

import "./App.css";

function App() {
  const yzhanweather = new YZhanWeather();
  yzhanweather.run("rain", {
    maxDuration: 10, // Default: 10s, this option can determine the speed of animations
  });
  const getAnchor = (): number => {
    const currentUrl = document.URL,
      urlParts = currentUrl.split("#");
    return urlParts.length > 1 && Number.isInteger(urlParts[1])
      ? parseInt(urlParts[1])
      : 0;
  };
  const dueDate = new Date("2024-05-24T10:00:00");
  const homeDate = new Date("2024-03-31T23:59:59");
  const [currentPage, setCurrentPage] = useState<number>(getAnchor() || 0);
  const [transitionPage, setTransitionPage] = React.useState<number>(0);
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

  const renderSeconds = (props) => {
    if (props.completed) {
      return "ÞÚ ERT BÚIN AÐ SKILA!!!";
    } else {
      return <span>{numberWithCommas(props.total / 1000)}</span>;
    }
  };

  const handlePageChange = (number) => {
    setCurrentPage(number);
  };

  const handleBeforePageChange = (number) => {
    setTransitionPage(number);
  };

  const incrementPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className={"App"}>
      <iframe
        title="silence"
        src="./250-milliseconds-of-silence.mp3"
        allow="autoplay"
        id="silence"
      ></iframe>
      <audio autoPlay>
        <source src="./rain.mp4" type="audio/mp4" />
      </audio>
      <div>
        <div className={"background step-" + (transitionPage % 3)} />
      </div>
      <ReactPageScroller
        pageOnChange={handlePageChange}
        onBeforePageScroll={handleBeforePageChange}
        customPageNumber={currentPage}
      >
        <TextSection text={"Hæ"} fontSize="1.5em" />
        <TextSection text={"Velkomin í slökunarmeðferðina"} />
        <TextSection text={"Tæmdu hugann þinn"} />
        <TextSection text={"Næstu mínútuna verða engar áhyggjur"} />
        <TextSection text={"Aðeins hugarró"} />
        <TextSection text={"Dragðu djúpt andann"} />
        <TextSection text={"Halda..."} />
        <TextSection text={"Og anda út"} />
        <TextSection text={"Það sem þú þarft að muna er að"} />
        <TextMorph texts={["ÞÚ", "GETUR", "ÞETTA"]} />
        <div className="image-center">
          <img src={neverGiveUp} alt="never give up" />
        </div>
        <div>
          <Countdown date={dueDate} renderer={renderSeconds} /> sek til stefnu
        </div>
        <div>
          <Countdown
            date={dueDate}
            renderer={(props) =>
              props.total > 864000000 //10 days
                ? "Ennþá nóg af tíma!"
                : "Alveg að skella á!"
            }
          />
        </div>
        <TextSection text={"En líka"} />
        <div>
          <TextSection
            text={"Þú ætlar að vera komin til mín eftir ekki minna en "}
            fontSize="0.5em"
          />
          <Countdown
            date={homeDate}
            renderer={(props) =>
              props.completed ? "NÚNA" : props.days + " daga"
            }
          />
        </div>
      </ReactPageScroller>
      <div onClick={incrementPage}>
        <ScrollArrow />
      </div>
    </div>
  );
}

export default App;
