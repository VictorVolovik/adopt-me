import { useState, useEffect } from "react";
import Pet from "./Pet";
import { API_URL } from "./helpers/constants";
import useBreedList from "./hooks/useBreedList";

const ANIMAL_OPTIONS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breedOptions] = useBreedList(animal);

  useEffect(() => {
    requestPets();
  }, []);

  async function requestPets(animal = "", location = "", breed = "") {
    const res = await fetch(
      `${API_URL}/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets(animal, location, breed);
        }}
      >
        <label htmlFor="location">
          Location
          <input
            name="location"
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
                setBreed("");
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
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
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

      <ul>
        {pets.map((pet) => (
          <Pet
            key={pet.id}
            name={pet.name}
            animal={pet.animal}
            breed={pet.breed}
          />
        ))}
      </ul>
    </div>
  );
};

export default SearchParams;
