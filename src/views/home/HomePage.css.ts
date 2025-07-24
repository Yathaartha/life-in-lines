import styled from "styled-components";

export const HomePageBackground = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "bgColor" && prop !== "bgOpacity",
})<{
  bgColor?: string;
  bgOpacity?: number;
}>`
  background-color: ${({ bgColor, bgOpacity }) =>
    bgColor
      ? `${bgColor}${bgOpacity ? Math.round(bgOpacity * 255).toString(16) : 0}`
      : "transparent"};
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: absolute;
  top: 0;
  background-color: white;
  display: absolute;
  margin: auto;
  z-index: 2;
  opacity: 0.4;
  border: black 1px solid;
  padding: 1.5rem 50px;
  border-radius: 10px;
  background-color: #eee;
  &:hover {
    opacity: 1;
    transform: all 0.5s ease-in-out;
  }
`;

