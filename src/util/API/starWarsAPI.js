
import axios from "axios";

export const getAllFilms = async () => {
  return await axios
    .get("https://swapi.dev/api/films")
    .then((res) => res)
    .catch((err) => err.response);
};

export const getAllPeople = async () => {
  return await axios
    .get("https://swapi.dev/api/people")
    .then((res) => res)
    .catch((err) => err.response);
};


