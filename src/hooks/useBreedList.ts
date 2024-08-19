import { QueryStatus, useQuery } from "@tanstack/react-query";
import fetchBreedList from "../queries/fetchBreedList";
import { Animal } from "../types/models";

export default function useBreedList(animal: Animal | "") {
  const results = useQuery(["breeds", animal], fetchBreedList);
  return [results?.data?.breeds ?? [], results.status] as [
    string[],
    QueryStatus
  ];
}
