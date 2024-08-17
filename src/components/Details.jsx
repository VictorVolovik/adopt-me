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
    <div className="my-0 mx-auto flex w-11/12 flex-col gap-4 rounded-lg bg-gray-200 p-4 pb-4">
      <Carousel images={pet.images} />
      <div>
        <h2>{pet.name}</h2>
        <p>
          {pet.animal} — {pet.breed} - {pet.city},{pet.state}
        </p>
        <p>{pet.description}</p>
        <button className="button mt-4" onClick={() => setShowModal(true)}>
          Adopt {pet.name}
        </button>

        {showModal ? (
          <Modal>
            <div className="fixed flex h-full w-full items-center justify-center bg-slate-600 bg-opacity-70">
              <div className="rounded-lg bg-gray-800 p-8 text-white">
                <h1>Would you like to adopt {pet.name}?</h1>
                <div className="mt-4 flex justify-between">
                  <button
                    className="button"
                    onClick={() => {
                      setAdoptedPet(pet);
                      navigate("/");
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className="button"
                    onClick={() => setShowModal(false)}
                  >
                    No
                  </button>
                </div>
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
