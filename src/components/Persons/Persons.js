import React from "react";
import "./Persons.scss";
import Person from "../Person/Person";

const Persons = props => {
  let personsData = props.persons.persons;
  const imagesData = props.images.images;

  const person = personsData.map((person, i) => {
    Object.assign(person, { image: imagesData[i].url });

    return (
      <Person
        key={person.url}
        name={person.name}
        image={person.image}
        species={person.species}
        films={person.films}
      />
    );
  });
  return <div className="persons">{person}</div>;
};
export default Persons;
