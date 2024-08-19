import { QueryFunction } from "@tanstack/react-query";
import { API_URL } from "../helpers/constants";
import { Animal, PetApiResponse } from "../types/models";

const fetchSearch: QueryFunction<
  PetApiResponse,
  ["search", { animal: Animal | ""; location: string; breed: string }]
> = async ({ queryKey }) => {
  const { animal, location, breed } = queryKey[1];

  const apiRes = await fetch(
    `${API_URL}/pets?animal=${animal}&location=${location}&breed=${breed}`
  );

  if (!apiRes.ok) {
    throw new Error(
      `/pets?animal=${animal}&location=${location}&breed=${breed} fetch not ok`
    );
  }

  return apiRes.json();
};

export default fetchSearch;
