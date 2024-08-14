import React, { useState } from "react";
import styled from "styled-components";
import { Star } from "./Stars";
import { Controller } from "react-hook-form";
import { useFormContext } from "../Form/context/form.ctx";
import { useField } from "../Form/hooks/useField";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
  position: relative;
  width: 100%;
`;

const StyledRange = styled.input`
  width: 100%;
  position: absolute;
  top: 5px;
  left: 0;
  opacity: 0;
  cursor: pointer;
  height: 2em;

  @media screen and (min-width: 1024px) {
    width: 400px;
  }
`;

export const StarRating = ({ totalStars = 10 }) => {
  const form = useFormContext();
  if (!form) throw new Error("Form context is not provided");
  const { name } = useField();
  if (!name) throw new Error("Field context is not provided");

  const renderStar = (index: number) => {
    if (form.watch(name) >= index + 1) {
      return <Star type="full" />;
    } else if (form.watch(name) >= index + 0.5) {
      return <Star type="half" />;
    } else {
      return <Star type="empty" />;
    }
  };

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange: fieldOnChange, value, ...field } }) => (
        <StyledDiv>
          <div style={{ display: "flex", position: "relative" }}>
            {Array.from({ length: totalStars }, (_, index) => (
              <div key={index}>{renderStar(index)}</div>
            ))}
          </div>
          <StyledRange
            type="range"
            min="0"
            max={totalStars}
            step="0.5"
            value={value || ""}
            onChange={fieldOnChange}
          />
        </StyledDiv>
      )}
    />
  );
};
