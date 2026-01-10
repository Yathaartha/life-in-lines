import styled from "styled-components";

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
  display: absolute;
  margin: auto;
  z-index: 2;
  padding: 1.5rem 50px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  gap: 0.5rem;
`;

export const InputLabel = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const FormInput = styled.input`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #cccccc;
  font-size: 1rem;
`;

export const SubmitButton = styled.button`
  background-color: #34c5f1ff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
`;

export const OpenBtnWrapper = styled.div`
  padding: 0 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  /* position: absolute; */
  /* top: 1rem; */
  margin: 0 auto;
  z-index: 5;
  /* width: 100%; */
  margin-top: 1rem;
`;

export const OpenButton = styled.button`
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  border: none;
  background-color: #34c5f1ff;
  color: white;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  z-index: 5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    background-color: #28a0d4ff;
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

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
  width: 100dvw;
  height: 100dvh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
`;

