import React, { useEffect } from "react";
import "./TextMorph.css";

export default function TextMorph(props: { texts: string[] }) {
  let elts = {
    text1: document.getElementById("text1")!,
    text2: document.getElementById("text2")!,
  };

  const texts = props.texts;

  const morphTime = 1;
  const cooldownTime = 0.25;

  let textIndex = texts.length - 1;
  let time = new Date().getTime();
  let morph = 0;
  let cooldown = cooldownTime;

  function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
      cooldown = cooldownTime;
      fraction = 1;
    }

    setMorph(fraction);
  }

  function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
  }

  function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
  }

  function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date().getTime();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
      if (shouldIncrementIndex) {
        textIndex++;
      }

      doMorph();
    } else {
      doCooldown();
    }
  }

  useEffect(() => {
    elts = {
      text1: document.getElementById("text1")!,
      text2: document.getElementById("text2")!,
    };
    textIndex = texts.length - 1;
    time = new Date().getTime();
    morph = 0;
    cooldown = cooldownTime;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
    animate();
  }, []);

  return (
    <div id="textmorph-wrapper">
      <div id="container">
        <h2 id="text1"></h2>
        <h2 id="text2"></h2>
      </div>

      <svg id="filters">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                                    0 1 0 0 0
                                    0 0 1 0 0
                                    0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
