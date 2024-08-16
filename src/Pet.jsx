import { IMAGES_URL } from "./helpers/constants";
import { Link } from "react-router-dom";

const Pet = ({ id, name, animal, breed, images, location }) => {
  let hero = `${IMAGES_URL}/pets/none.jpg`;

  if (images.length) {
    hero = images[0];
  }

  return (
    <li className="pet">
      <Link to={`/details/${id}`}>
        <div className="image-container">
          <img src={hero} alt={name} />
        </div>
        <div className="info">
          <h2>{name}</h2>
          <p>
            {animal} — {breed} — {location}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default Pet;
