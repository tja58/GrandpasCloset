import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import placeholder from "../imgs/placeholder-image.png";
import red from "../imgs/red.png";
import black from "../imgs/black.jpg";
import blue from "../imgs/blue.png";

import { timer } from "../utils/Helper";

const test = [0, 1, 2, 3];
const test2 = [0, 1, 2, 3, 4, 5, 6];
const photos = [placeholder, red, black, blue];
const labels = [
  "stylish shirt",
  "beautiful dress",
  "snazzy pants",
  "fashionable jacket",
];

let continueAnimation = true;
let timeoutId;
let lTimeoutId;

function renderCarousel() {
  function renderImg(val, e) {
    if (val === 0) {
      return (
        <div
          className={`carousel-img c-img-${val} c-img-visible`}
          key={`I-${val}-${e}`}
        >
          <img src={photos[val]} alt="placeholder" />
          <img src={photos[val]} alt="placeholder" />
        </div>
      );
    }
    return (
      <div className={`carousel-img c-img-${val}`} key={`I-${val}-${e}`}>
        <img src={photos[val]} alt="placeholder" />
        <img src={photos[val]} alt="placeholder" />
      </div>
    );
  }

  return test.map((val) => {
    return (
      <div className={"carousel-imgs"} id={"carousel" + val} key={"c" + val}>
        {test2.map((e) => {
          return renderImg(val, e);
        })}
        <div className="carousel-fog"></div>
      </div>
    );
  });
}

async function startAnimation(i) {
  if (!continueAnimation) {
    return;
  }
  // Change label
  const label = document.getElementById("c-label");
  label.innerHTML = labels[i];
  label.classList.add("c-label-enter");
  label.classList.remove("c-label-exit");

  // Change Btn
  const btn = document.getElementById(`c-btn-${i}`);
  btn.classList.remove("c-btn");
  btn.classList.add("c-btn-selected");

  // Change Image to visible
  document.querySelectorAll(".c-img-" + i).forEach(async (e) => {
    e.classList.add("c-visible");
    e.classList.remove("c-hidden");
  });

  lTimeoutId = setTimeout(() => {
    // Change Label
    label.classList.remove("c-label-enter");
    label.classList.add("c-label-exit");
  }, 4500);

  timeoutId = setTimeout(() => {
    // Change btn to unselected
    btn.classList.remove("c-btn-selected");
    btn.classList.add("c-btn");

    // Change Image to hidden
    document.querySelectorAll(".c-img-" + i).forEach(async (e) => {
      e.classList.add("c-hidden");
      e.classList.remove("c-visible");
    });

    if (i === 3) {
      startAnimation(0);
    } else {
      startAnimation(i + 1);
    }
  }, 5000);

  await timer(5000);
}

function changeSlide(index) {
  clearTimeout(timeoutId);
  clearTimeout(lTimeoutId);

  continueAnimation = false;
  document.querySelectorAll(".c-visible").forEach((e) => {
    e.classList.remove(".c-visible");
    e.classList.add("c-hidden");
  });
  const btnSelected = document.querySelector(".c-btn-selected");
  btnSelected.classList.add("c-btn");
  btnSelected.classList.remove("c-btn-selected");

  continueAnimation = true;
  startAnimation(index);
}

function Landing(props) {
  useEffect(() => {
    startAnimation(0);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(lTimeoutId);
    };
  });
  return (
    <div>
      <div className="landing-carousel">
        <div className="carousel-title">
          <span>Find your next</span>
          <span className="title-link-ctnr">
            <Link to="" id="c-label"></Link>
          </span>
        </div>
        <div className="carousel-progress">
          <ul>
            <li>
              <button
                className="c-btn"
                id="c-btn-0"
                onClick={() => changeSlide(0)}
              ></button>
            </li>
            <li>
              <button
                className="c-btn"
                id="c-btn-1"
                onClick={() => changeSlide(1)}
              ></button>
            </li>
            <li>
              <button
                className="c-btn"
                id="c-btn-2"
                onClick={() => changeSlide(2)}
              ></button>
            </li>
            <li>
              <button
                className="c-btn"
                id="c-btn-3"
                onClick={() => changeSlide(3)}
              ></button>
            </li>
          </ul>
        </div>
        <div className="carousel-imgs-ctnr">{renderCarousel()}</div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Landing);
