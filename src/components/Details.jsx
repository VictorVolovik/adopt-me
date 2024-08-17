import { useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "../queries/fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoudary";
import Modal from "./Modal";
import AdoptedPetContext from "./AdoptedPetContext";

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [, setAdoptedPet] = useContext(AdoptedPetContext);
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
      <Carousel images={pet.images} />
      <div>
        <h2>{pet.name}</h2>
        <p>
          {pet.animal} — {pet.breed} - {pet.city},{pet.state}
        </p>
        <p>{pet.description}</p>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>

        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

function ErrorMessage() {
  return (
    <div className="details">
      <h2 className="error">
        There was an error with loading detailed information.
        <br />
        <Link to="/">Click here</Link> to back to the home page.
      </h2>
    </div>
  );
}

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary errorComponent={<ErrorMessage />}>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
