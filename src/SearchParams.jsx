import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { ANIMAL_OPTIONS } from "./helpers/constants";
import Results from "./Results";
import useBreedList from "./hooks/useBreedList";
import fetchSearch from "./queries/fetchSearch";
import AdoptedPetContext from "./AdoptedPetContext";

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breedOptions] = useBreedList(animal);
  const [adoptedPet] = useContext(AdoptedPetContext);

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            location: formData.get("location") ?? "",
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
          };
          setRequestParams(obj);
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
            name="location"
            id="location"
            type="text"
            placeholder="Location"
          />
          <label htmlFor="animal">
            Animal
            <select
              name="animal"
              id="animal"
              value={animal}
              onChange={(e) => {
                setAnimal(e.target.value);
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
            breed
            <select
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
          <button>Submit</button>
        </label>
      </form>

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
