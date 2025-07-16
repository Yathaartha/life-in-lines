import styled from "styled-components";

export const HomePageBackground = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "bgColor" && prop !== "bgOpacity",
})<{
  bgColor?: string;
  bgOpacity?: number;
}>`
  background-color: ${({ bgColor, bgOpacity }) =>
    bgColor
      ? `${bgColor}${bgOpacity ? Math.round(bgOpacity * 255).toString(16) : ""}`
      : "transparent"};
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

