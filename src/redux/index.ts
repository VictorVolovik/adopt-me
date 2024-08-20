import { configureStore } from "@reduxjs/toolkit";
import adoptedPet from "./AdoptedPetSlice";

const store = configureStore({
  reducer: {
    adoptedPet,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
