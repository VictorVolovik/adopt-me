import { API_URL } from "../helpers/constants";

const fetchPet = async ({ queryKey }) => {
  const id = queryKey[1];

  const apiRes = await fetch(`${API_URL}/pets?id=${id}`);

  if (!apiRes.ok) {
    throw new Error(`/pets?id=${id} fetch not ok`);
  }

  return apiRes.json();
};

export default fetchPet;
