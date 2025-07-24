import {
  FormContainer,
  InputWrapper,
  PageWrapper,
  PrimaryButton,
  Title,
} from "./StartPage.css";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { updateName, updateDateOfBirth } from "../../components/user/UserSlice";

export const StartPage = () => {
  const userName = useAppSelector((state) => state.user.name);
  const userDateOfBirth = useAppSelector((state) => state.user.dateOfBirth);
  const dispatch = useAppDispatch();

  return (
    <PageWrapper>
      <FormContainer>
        <Title>Life In Lines</Title>
        <InputWrapper>
          <label htmlFor="">What is your name?</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => dispatch(updateName(e.target.value))}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="">Please enter your date of birth:</label>
          <input
            type="date"
            max={new Date().toISOString().split("T")[0]} // Prevent future dates
            min="1900-01-01" // Prevent dates before 1900
            value={userDateOfBirth}
            onChange={(e) => dispatch(updateDateOfBirth(e.target.value))}
          />
        </InputWrapper>

        <InputWrapper>
          <PrimaryButton
            onClick={() => (window.location.href = "/home")}
            disabled={userName === "" || userDateOfBirth === ""}>
            Start Journey
          </PrimaryButton>
        </InputWrapper>
      </FormContainer>
    </PageWrapper>
  );
};

