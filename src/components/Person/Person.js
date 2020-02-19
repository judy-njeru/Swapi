import React, { useState, useEffect } from "react";
import "./Person.scss";

const Person = props => {
  const [state, setState] = useState({
    species: ["fetching species.."],
    films: ["fetching films... "]
  });

  useEffect(() => {
    const fetchData = async () => {
      //GET Species Data
      const getSpecies = await fetch(props.species[0]);
      let data = await getSpecies.json();
      let speciesResults = await data.name;

      //GET Film Data
      const films = await Promise.all(
        props.films.map(async filmUrl => {
          let response = await fetch(filmUrl);
          let data = await response.json();
          return data;
        })
      );

      setState({
        species: speciesResults,
        films: films
      });
    };

    fetchData();
  }, [props]);

  return (
    <div className="person">
      <img className="character-image" src={props.image} alt={props.name} />
      <h1 className="character-name">{props.name}</h1>
      <p className="character-species">{state.species}</p>
      <div className="titles">
        <p>Titles Featured In:</p>
        {state.films.map((film, i) => {
          return (
            <li key={i} className="character-titles">
              <span>Episode: {film.episode_id}</span>
              {film.title}
            </li>
          );
        })}
      </div>
    </div>
  );
};
export default Person;
