import { useState, useEffect } from "react";

export const useAudio = (url) => {
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

export const getAnchor = (): number => {
  const currentUrl = document.URL,
    urlParts = currentUrl.split("#");
  return urlParts.length > 1 && Number.isInteger(urlParts[1])
    ? parseInt(urlParts[1])
    : 0;
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
