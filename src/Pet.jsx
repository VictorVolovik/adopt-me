const Pet = (props) => {
  return (
    <li>
      <h1>{props.name}</h1>
      <h2>{props.animal}</h2>
      <h2>{props.breed}</h2>
    </li>
  );
};

export default Pet;
