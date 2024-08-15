import { useState } from "react";

const ANIMAL_OPTIONS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");

  return (
    <div className="search-params">
      <form action="">
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
              onChange={(e) => setAnimal(e.target.value)}
            >
              {ANIMAL_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <button>Submit</button>
        </label>
      </form>
    </div>
  );
};

export default SearchParams;
