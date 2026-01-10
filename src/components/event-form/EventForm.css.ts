import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 500px;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  width: 100%;
  background-color: var(--modal-bg);
  border-radius: 12px;
  box-shadow: 0 4px 12px var(--shadow);
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

export const InputLabel = styled.label`
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-color);
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
`;

export const FormInput = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--input-border);
  background-color: var(--input-bg);
  color: var(--text-color);
  font-size: 1rem;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  transition: all 0.2s ease;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #34c5f1ff;
    box-shadow: 0 0 0 3px rgba(52, 197, 241, 0.1);
  }

  &[type="range"] {
    padding: 0;
    height: 6px;
    background: transparent;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;

    &::-webkit-slider-track {
      width: 100%;
      height: 6px;
      background: var(--input-border);
      border-radius: 3px;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      background: #34c5f1ff;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      transition: all 0.2s ease;

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 2px 8px rgba(52, 197, 241, 0.4);
      }
    }

    &::-moz-range-track {
      width: 100%;
      height: 6px;
      background: var(--input-border);
      border-radius: 3px;
    }

    &::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background: #34c5f1ff;
      border-radius: 50%;
      cursor: pointer;
      border: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      transition: all 0.2s ease;

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 2px 8px rgba(52, 197, 241, 0.4);
      }
    }
  }

  &[type="radio"] {
    width: auto;
    margin-right: 0.5rem;
    cursor: pointer;
    accent-color: #34c5f1ff;
  }
`;

export const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  position: relative;
`;

export const SliderValue = styled.div<{ $isPositive: boolean }>`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ $isPositive }) => ($isPositive ? "#10B981" : "#F43F5E")};
  text-align: center;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  padding: 0.75rem 1rem;
  background: var(--input-bg);
  border-radius: 12px;
  border: 2px solid
    ${({ $isPositive }) => ($isPositive ? "#10B981" : "#F43F5E")};
  min-width: 80px;
  display: inline-block;
  margin: 0 auto;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px
    ${({ $isPositive }) =>
      $isPositive ? "rgba(16, 185, 129, 0.2)" : "rgba(244, 63, 94, 0.2)"};
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

export const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  ${InputLabel} {
    margin: 0;
    cursor: pointer;
    font-weight: 500;
  }
`;

export const SubmitButton = styled.button`
  background-color: #34c5f1ff;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin-top: 0.5rem;

  &:hover {
    background-color: #28a0d4ff;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

