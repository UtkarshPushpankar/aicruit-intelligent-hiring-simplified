"use client";
import React from 'react';
import styled from 'styled-components';

const Switch = ({ onChange }) => {
  return (
    <StyledWrapper>
      <label className="switch">
        <input type="checkbox" onChange={onChange} />
        <div className="slider" />
        <div className="slider-card">
          <div className="slider-card-face slider-card-front" />
          <div className="slider-card-face slider-card-back" />
        </div>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .switch {
    --circle-dim: 1.4em;
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 2em;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5aeae;
    transition: 0.4s;
    border-radius: 30px;
  }

  .slider-card {
    position: absolute;
    content: "";
    height: var(--circle-dim);
    width: var(--circle-dim);
    border-radius: 20px;
    left: 0.3em;
    bottom: 0.3em;
    transition: 0.4s;
    pointer-events: none;
  }

  .slider-card-face {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    perspective: 1000px;
    border-radius: 50%;
    transition: 0.4s transform;
  }

  .slider-card-front {
    background-color: #DC3535;
  }

  .slider-card-back {
    background-color: #379237;
    transform: rotateY(180deg);
  }

  input:checked ~ .slider-card .slider-card-back {
    transform: rotateY(0);
  }

  input:checked ~ .slider-card .slider-card-front {
    transform: rotateY(-180deg);
  }

  input:checked ~ .slider-card {
    transform: translateX(1.5em);
  }

  input:checked ~ .slider {
    background-color: #9ed99c;
  }
`;

export default Switch;
