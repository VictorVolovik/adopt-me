import { useState, useDeferredValue, useMemo, useTransition } from "react";
import { useQuery } from "@tanstack/react-query";
import { ANIMAL_OPTIONS } from "../helpers/constants";
import Results from "./Results";
import useBreedList from "../hooks/useBreedList";
import fetchSearch from "../queries/fetchSearch";
import { Animal, Pet } from "../types/models";
import { useSelector } from "react-redux";
import { RootState } from "../redux";

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState<{
    location: string;
    animal: Animal | "";
    breed: string;
  }>({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState<Animal | "">("");
  const [breedOptions] = useBreedList(animal);
  const adoptedPet = useSelector<RootState, Pet | null>(
    (store) => store.adoptedPet.value
  );
  const [isPending, startTransition] = useTransition();

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];
  const defferedPets = useDeferredValue(pets);
  const renderedPets = useMemo(
    () => <Results pets={defferedPets} />,
    [defferedPets]
  );

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const obj = {
            location: formData.get("location")?.toString() ?? "",
            animal: (formData.get("animal")?.toString() as Animal) ?? "",
            breed: formData.get("breed")?.toString() ?? "",
          };
          startTransition(() => {
            setRequestParams(obj);
          });
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            className="search-input"
            name="location"
            id="location"
            type="text"
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            className="search-input"
            name="animal"
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value as Animal);
            }}
          >
            <option />
            {ANIMAL_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            className="search-input grayed-out-disabled"
            name="breed"
            id="breed"
            disabled={breedOptions.length === 0}
          >
            <option />
            {breedOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <button className="button" disabled={isPending}>
          Submit
        </button>
      </form>

      {renderedPets}
    </div>
  );
};

export default SearchParams;
