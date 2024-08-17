import { IMAGES_URL } from "../helpers/constants";
import { Link } from "react-router-dom";

const Pet = ({ id, name, animal, breed, images, location }) => {
  let hero = `${IMAGES_URL}/pets/none.jpg`;

  if (images.length) {
    hero = images[0];
  }

  return (
    <li className="relative block">
      <Link to={`/details/${id}`} className="flex h-full">
        <div className="flex h-full">
          <img className="object-cover" src={hero} alt={name} />
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-tr from-white to-transparent p-2">
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
