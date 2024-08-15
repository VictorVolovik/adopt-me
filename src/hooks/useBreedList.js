import { useState, useEffect } from "react";
import { API_URL } from "../helpers/constants";

const localCache = {};

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList(animal);
    }
  }, [animal]);

  async function requestBreedList(animal) {
    setBreedList([]);
    setStatus("loading");

    const res = await fetch(`${API_URL}/breeds?animal=${animal}`);
    const json = await res.json();
    localCache[animal] = json.breeds ?? [];
    setBreedList(localCache[animal]);

    setStatus("loaded");
  }

  return [breedList, status];
}
