import { Pet } from "../types/models";
import PetItem from "./PetItem";

const Results = ({ pets }: { pets: Pet[] }) => {
  return (
    <ul className="grid grid-cols-1 gap-4 pb-4 sm:grid-cols-2 lg:grid-cols-3">
      {!pets.length ? (
        <h2>No Pets Found</h2>
      ) : (
        pets.map((pet) => (
          <PetItem
            key={pet.id}
            id={pet.id}
            name={pet.name}
            animal={pet.animal}
            breed={pet.breed}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
          />
        ))
      )}
    </ul>
  );
};

export default Results;
