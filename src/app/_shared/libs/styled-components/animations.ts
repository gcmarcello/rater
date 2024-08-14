import { keyframes } from "styled-components";

export const fadeInAnimation = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

export const fadeOutAnimation = keyframes`
  from {
    opacity: 1
  }
  to {
    opacity: 0
  }
`;

export const slideInAnimation = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

export const slideOutAnimation = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

export const slideInLeftAnimation = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const slideOutLeftAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

export const slideInRightAnimation = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const slideOutRightAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

export const scaleInAnimation = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

export const scaleOutAnimation = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
`;

export const rotateInAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const rotateOutAnimation = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

export const bounceInAnimation = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

export const bounceOutAnimation = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
`;
