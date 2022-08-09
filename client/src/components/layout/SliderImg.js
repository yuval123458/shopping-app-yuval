import React, { Fragment, useState } from "react";
import "../../App.css";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Cards from "./ImageCards";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Slider = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const SliderWrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const SliderImg = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const leftArrowHandler = () => {
    setSlideIndex(slideIndex === 0 ? 2 : slideIndex - 1);
  };
  const rightArrowHandler = () => {
    setSlideIndex(slideIndex === 2 ? 0 : slideIndex + 1);
  };

  return (
    // <Slider>
    <div className="slider">
      <div onClick={leftArrowHandler} className="arrow-left">
        <ArrowLeftIcon />
      </div>
      <SliderWrapper slideIndex={slideIndex}>
        {Cards.map((card) => (
          <SliderContainer key={card.id}>
            <div className="slider-container">
              <div className="slider-img">
                <img alt="img" src={card.imageSrc} />
              </div>
              <div className="slider-desc">
                <h1>{card.title}</h1>
                <p>{card.desc} </p>
                <Link to={`/products/${card.season}`}>
                  <button>SHOW NOW</button>
                </Link>
              </div>
            </div>
          </SliderContainer>
        ))}
      </SliderWrapper>
      <div onClick={rightArrowHandler} className="arrow-right">
        <ArrowRightIcon />
      </div>
    </div>
    //  </Slider>
  );
};

export default SliderImg;
