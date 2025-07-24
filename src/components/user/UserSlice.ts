import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface UserState {
  name: string;
  dateOfBirth: string;
}

const initialState: UserState = {
  name: "",
  dateOfBirth: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateDateOfBirth: (state, action: PayloadAction<string>) => {
      state.dateOfBirth = action.payload;
    },
  },
});

export const { updateName, updateDateOfBirth } = userSlice.actions;

export const userName = (state: RootState) => state.user.name;
export const userDateOfBirth = (state: RootState) => state.user.dateOfBirth;

export default userSlice.reducer;

