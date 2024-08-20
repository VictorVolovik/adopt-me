import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pet } from "../types/models";

type AdoptedPetState = {
  value: Pet | null;
};

const initialState: AdoptedPetState = {
  value: null,
};

export const adoptedPetSlice = createSlice({
  name: "adoptedPet",
  initialState,
  reducers: {
    adopt: (state, action: PayloadAction<Pet>) => {
      state.value = action.payload;
    },
  },
});

export const { adopt } = adoptedPetSlice.actions;
export default adoptedPetSlice.reducer;
