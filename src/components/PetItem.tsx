import { IMAGES_URL } from "../helpers/constants";
import { Link } from "react-router-dom";
import { Animal } from "../types/models";

interface PetItemProps {
  id: number;
  name: string;
  animal: Animal;
  breed: string;
  images?: string[];
  location: string;
}

const PetItem = ({
  id,
  name,
  animal,
  breed,
  images,
  location,
}: PetItemProps) => {
  let hero = `${IMAGES_URL}/pets/none.jpg`;

  if (images?.length) {
    hero = images[0];
  }

  return (
    <li className="relative block">
      <Link to={`/details/${id}`} className="flex h-full w-full">
        <div className="flex h-full  w-full">
          <img
            data-testid="thumbnail"
            className="object-cover"
            src={hero}
            alt={name}
          />
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

export default PetItem;
