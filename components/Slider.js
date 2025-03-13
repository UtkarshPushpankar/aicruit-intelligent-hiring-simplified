import React, { useState } from "react";
import styled from "styled-components";

const Slider = () => {
  const [value, setValue] = useState(50);
  const [isEditable, setIsEditable] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  return (
    <StyledWrapper>
      <div className="header flex justify-between items-center">
        <p className="text-sm text-gray-500">Profile Completion ({value}%)</p>
        <div className="edit flex gap-1 items-center">
          <img
            width={18}
            src="edit.png"
            alt="edit icon"
            onClick={toggleEdit}
            style={{ cursor: "pointer" }}
          />
          <p
            className="text-sm text-blue-500"
            onClick={toggleEdit}
            style={{ cursor: "pointer" }}
          >
            {isEditable ? "Save" : "Edit"}
          </p>
        </div>
      </div>
      <input
        id="myRange"
        className="slider"
        value={value}
        max={100}
        min={0}
        type="range"
        onChange={handleChange}
        disabled={!isEditable}
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 5px;
    background-color: #4158d0;
    background-image: linear-gradient(43deg, #4158d0 0%, blue 46%, darkblue 100%);
    outline: none;
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  .slider:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #4c00ff;
    background-image: linear-gradient(160deg, #4900f5 0%, #80d0c7 100%);
    cursor: pointer;
  }

  .slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #0093e9;
    background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
    cursor: pointer;
  }
`;

export default Slider;
