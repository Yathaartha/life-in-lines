import styled from "styled-components";

export const PageWrapper = styled.div`
  background-color: #34c5f1ff;
  height: 100dvh;
  /* width: 100vw; */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const FormContainer = styled.div`
  background-color: #eeeeee;
  padding: 2rem;
  border: 2px solid #333333;
  border-radius: 10px;
  height: 50%;
  margin: auto;
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  text-transform: uppercase;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  label {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  input {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #cccccc;
    font-size: 1rem;
  }
`;

export const PrimaryButton = styled.button`
  background-color: #34c5f1ff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  &:hover {
    background-color: #28a0d4ff;
    transform: scale(1.05);
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

