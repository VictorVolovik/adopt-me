import { QueryFunction } from "@tanstack/react-query";
import { API_URL } from "../helpers/constants";
import { PetApiResponse } from "../types/models";

const fetchPet: QueryFunction<PetApiResponse, ["details", string]> = async ({
  queryKey,
}) => {
  const id = queryKey[1];

  const apiRes = await fetch(`${API_URL}/pets?id=${id}`);

  if (!apiRes.ok) {
    throw new Error(`/pets?id=${id} fetch not ok`);
  }

  return apiRes.json();
};

export default fetchPet;
