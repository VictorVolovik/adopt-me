import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./queries/fetchPet";

const Details = () => {
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <div>
        <h2>{pet.name}</h2>
        <p>
          {pet.animal} — {pet.breed} - {pet.city},{pet.state}
        </p>
        <p>{pet.description}</p>
        <button>Adopt {pet.name} </button>
      </div>
    </div>
  );
};

export default Details;
