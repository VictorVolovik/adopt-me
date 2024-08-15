const Pet = (props) => {
  return (
    <li>
      <h2>{props.name}</h2>
      <p>{props.animal}</p>
      <p>{props.breed}</p>
    </li>
  );
};

export default Pet;
