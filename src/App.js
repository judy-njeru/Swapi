import React, { useState, useEffect } from "react";
import "./App.scss";
import Persons from "./components/Persons/Persons";

function App() {
  const [personsState, setPersonsState] = useState({
    persons: []
  });

  const [imagesState, setImagesState] = useState({
    images: []
  });

  useEffect(() => {
    getPersons();
    getImages();
  }, []);

  const getPersons = async () => {
    let apiResponse = await fetch("https://swapi.co/api/people");
    let fetchedPersonsData = await apiResponse.json();
    let personsData = await fetchedPersonsData.results;

    setPersonsState({
      persons: personsData
    });
  };

  const getImages = async () => {
    let apiResponse = await fetch(
      "http://www.splashbase.co/api/v1/images/latest"
    );
    let fetchedImagesData = await apiResponse.json();
    const imagesData = fetchedImagesData.images;

    setImagesState({
      images: imagesData
    });
  };

  let persons = null;

  if (imagesState.images.length === 0) {
    return (
      <div id="loader-wrapper">
        <h3>Loading Characters...</h3>
        <div className="loader"></div>
      </div>
    );
  } else {
    persons = (
      <div>
        <Persons persons={personsState} images={imagesState} />
      </div>
    );
  }

  return <div className="App">{persons}</div>;
}

export default App;
