import { QueryFunction } from "@tanstack/react-query";
import { API_URL } from "../helpers/constants";
import { Animal, BreedListApiResponse } from "../types/models";

const fetchBreedList: QueryFunction<
  BreedListApiResponse,
  ["breeds", Animal | ""]
> = async ({ queryKey }) => {
  const animal = queryKey[1];

  if (!animal) return [];

  const apiRes = await fetch(`${API_URL}/breeds?animal=${animal}`);

  if (!apiRes.ok) {
    throw new Error(`/breeds?animal=${animal} fetch not ok`);
  }

  return apiRes.json();
};

export default fetchBreedList;
