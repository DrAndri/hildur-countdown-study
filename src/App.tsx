import React from "react";
import { useState, useEffect } from "react";
import Countdown from "react-countdown";
import ReactPageScroller from "react-page-scroller";
import TextSection from "./sections/TextSection/TextSection.tsx";
import ScrollArrow from "./components/ScrollArrow/ScrollArrow.tsx";
import TextMorph from "./components/TextMorph/TextMorph.tsx";
import neverGiveUp from "./assets/never-give-up.webp";

import "./App.css";

function App() {
  const useAudio = (url) => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
      playing ? audio.play() : audio.pause();
    }, [playing]);

    useEffect(() => {
      audio.addEventListener("ended", () => setPlaying(false));
      return () => {
        audio.removeEventListener("ended", () => setPlaying(false));
      };
    }, []);

    return [playing, toggle];
  };
  const [playing, toggle] = useAudio("./rain.mp4");
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

  const begin = () => {
    if (!playing) toggle();
    incrementPage();
  };

  const pages = [
    <div className="section">
      <button className="begin-button" onClick={begin}>
        Byrja
      </button>
    </div>,
    <div className="section">
      <TextSection text={"Hæ"} fontSize="1.5em" />
    </div>,
    <div className="section">
      <TextSection text={"Velkomin í slökunarmeðferðina"} />
    </div>,
    <div className="section">
      <TextSection text={"Tæmdu hugann þinn"} />
    </div>,
    <div className="section">
      <TextSection text={"Næstu mínútuna verða engar áhyggjur"} />
    </div>,
    <div className="section">
      <TextSection text={"Aðeins hugarró"} />
    </div>,
    <div className="section">
      <TextSection text={"Dragðu djúpt andann"} />
    </div>,
    <div className="section">
      <TextSection text={"Halda..."} />
    </div>,
    <div className="section">
      <TextSection text={"Og anda út"} />
    </div>,
    <div className="section">
      <TextSection text={"Það sem þú þarft að muna er að"} />
    </div>,
    <TextMorph texts={["ÞÚ", "GETUR", "ÞETTA"]} />,
    <div className="image-center">
      <img src={neverGiveUp} alt="never give up" />
    </div>,
    <div className="section">
      <div>
        <Countdown date={dueDate} renderer={renderSeconds} /> sek til stefnu
      </div>
    </div>,
    <div className="section">
      <Countdown
        date={dueDate}
        renderer={(props) =>
          props.completed
            ? "TIL HAMINGJU!!!"
            : props.total > 864000000 //10 days
            ? "Ennþá nóg af tíma!"
            : "Alveg að skella á!"
        }
      />
    </div>,
    <div className="section">
      <TextSection text={"En líka"} />
    </div>,
    <div className="section">
      <div>
        <TextSection
          text={"Þú ætlar að vera komin til mín eftir ekki minna en "}
          fontSize="0.5em"
        />
        <br />
        <Countdown
          date={homeDate}
          renderer={(props) =>
            props.completed ? "NÚNA" : props.days + " daga"
          }
        />
      </div>
    </div>,
    <div className="section">
      <TextSection text={"Ég sakna þín meira en nokkur getur skilið ❤️"} />
    </div>,
    <div className="section">
      <div>
        <p>Þú kemur heim eftir</p>
        <Countdown date={homeDate} renderer={renderer} />
        <p>Þú ert að skila eftir</p>
        <Countdown date={dueDate} renderer={renderer} />
      </div>
    </div>,
  ];

  return (
    <div className={"App"}>
      <div>
        <div className={"background step-" + (transitionPage % 3)} />
        <div className="black" />
      </div>
      <ReactPageScroller
        pageOnChange={handlePageChange}
        onBeforePageScroll={handleBeforePageChange}
        customPageNumber={currentPage}
      >
        {pages}
      </ReactPageScroller>
      {currentPage + 2 <= pages.length && (
        <div onClick={incrementPage}>
          <ScrollArrow />
        </div>
      )}
    </div>
  );
}

export default App;
