import { createContext } from "react";
import { Pet } from "../types/models";

const AdoptedPetContext = createContext<
  [Pet | null, (adoptedPet: Pet) => void]
>([null, () => {}]);

export default AdoptedPetContext;
