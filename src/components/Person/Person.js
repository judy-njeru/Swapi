import React, { useState, useEffect } from "react";
import "./Person.scss";

const Person = props => {
  const [state, setState] = useState({
    species: ["fetching species.."],
    films: []
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

  const imageStyle = {
    backgroundImage: `url(${props.image})`,
    backgroundSize: "cover",
    height: "300px",
    width: "100%",
    backgroundPosition: "100%"
  };

  return (
    <div className="person">
      <div style={imageStyle}></div>
      <h1 className="character-name">{props.name}</h1>
      <p className="character-species">{state.species}</p>
      <div className="titles">
        <p>Titles Featured In:</p>
        {state.films.length === 0 ? (
          <p>Fetching films ...</p>
        ) : (
          state.films.map((film, i) => {
            return (
              <li key={i} className="character-titles">
                <span>Episode: {film.episode_id}</span>
                {film.title}
              </li>
            );
          })
        )}
      </div>
    </div>
  );
};
export default Person;
