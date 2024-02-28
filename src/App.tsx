import React from "react";
import { useState, useEffect } from "react";
import Countdown from "react-countdown";
import ReactPageScroller from "react-page-scroller";
import TextSection from "./sections/TextSection/TextSection.tsx";
import ScrollArrow from "./components/ScrollArrow/ScrollArrow.tsx";
import TextMorph from "./components/TextMorph/TextMorph.tsx";
import { getAnchor, useAudio } from "./utils.tsx";
import neverGiveUp from "./assets/never-give-up.webp";

import "./App.css";
import { renderSeconds, renderer } from "./countdownRenderers.tsx";

function App() {
  const [playingRain, toggleRain] = useAudio("./rain.mp4");

  const dueDate = new Date("2024-05-24T10:00:00");
  const homeDate = new Date("2024-03-31T23:59:59");

  const [transitionPage, setTransitionPage] = React.useState<number>(0);
  const [cyclePage, setCyclePage] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(getAnchor() || 0);

  useEffect(() => {
    if (currentPage === 6 || currentPage === 7 || currentPage === 11) {
      const timeout = setTimeout(() => {
        if (cyclePage >= 3) setCyclePage(0);
        else setCyclePage(cyclePage + 1);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [currentPage, cyclePage]);

  const handlePageChange = (number) => {
    setCurrentPage(number);
  };

  const handleBeforePageChange = (number) => {
    setTransitionPage(number);
  };

  const incrementPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const begin = () => {
    if (!playingRain) toggleRain();
    incrementPage();
  };

  const goToEnd = () => {
    if (!playingRain) toggleRain();
    setCurrentPage(pages.length - 1);
  };

  const pages = [
    <div id="first-page button">
      <button id="begin-button" className="button" onClick={begin}>
        Byrja
      </button>
      <button id="goto-end-button" className="button" onClick={goToEnd}>
        Countdown
      </button>
    </div>,
    <TextSection text={"Hæ"} fontSize="1.5em" />,
    <TextSection text={"Velkomin í slökunarmeðferðina"} />,
    <TextSection text={"Tæmdu hugann þinn"} />,
    <TextSection text={"Næstu mínútuna verða engar áhyggjur"} />,
    <TextSection text={"Aðeins hugarró"} />,
    <TextSection text={"Dragðu djúpt andann"} />,
    <TextSection text={"Halda..."} />,
    <TextSection text={"Og anda út"} />,
    <TextSection text={"Þú ert núna róleg"} />,
    <TextSection text={"Það sem þú þarft að muna er að"} />,
    <TextMorph texts={["ÞÚ", "GETUR", "ÞETTA"]} />,
    <div className="image-center">
      <img src={neverGiveUp} alt="never give up" />
    </div>,
    <div>
      <Countdown date={dueDate} renderer={renderSeconds} /> sek til stefnu
    </div>,
    <Countdown
      date={dueDate}
      renderer={(props) =>
        props.completed
          ? "TIL HAMINGJU!!!"
          : props.total > 864000000 //10 days
          ? "Ennþá nóg af tíma!"
          : "Alveg að skella á!"
      }
    />,
    <TextSection text={"En líka"} />,
    <div>
      <TextSection
        text={"Þú ætlar að vera komin til mín eftir ekki minna en "}
        fontSize="0.5em"
      />
      <br />
      <Countdown
        date={homeDate}
        renderer={(props) => (props.completed ? "NÚNA" : props.days + " daga")}
      />
    </div>,
    <div className="section">
      <TextSection text={"Ég sakna þín meira en nokkur getur skilið ❤️"} />
    </div>,
    <div>
      <div>Þú kemur heim eftir</div>
      <Countdown date={homeDate} renderer={renderer} />
      <div>Þú ert að skila eftir</div>
      <Countdown date={dueDate} renderer={renderer} />
    </div>,
  ];

  const getTransitionPage = () => {
    if (transitionPage === 6 || transitionPage === 7 || transitionPage === 11)
      return cyclePage;
    else if (
      transitionPage === 8 ||
      transitionPage === 9 ||
      transitionPage === 10 ||
      transitionPage === 11
    )
      return transitionPage;
    else return transitionPage % 4;
  };

  return (
    <div className={"App"}>
      <div>
        <div className={"background step-" + getTransitionPage()} />
        <div className="black" />
      </div>
      <div id="page-scroller">
        <ReactPageScroller
          pageOnChange={handlePageChange}
          onBeforePageScroll={handleBeforePageChange}
          customPageNumber={currentPage}
        >
          {pages.map((page, index) => (
            <div className="section" key={index}>
              {page}
            </div>
          ))}
        </ReactPageScroller>
      </div>
      {currentPage + 2 <= pages.length && currentPage !== 0 && (
        <div onClick={incrementPage}>
          <ScrollArrow />
        </div>
      )}
    </div>
  );
}

export default App;
