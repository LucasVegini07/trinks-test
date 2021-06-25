import React, { useState, useEffect } from "react";
import * as starWarsAPI from "../../util/API/starWarsAPI";
import { Grid, TextField, MenuItem } from "@material-ui/core";
import Logo from "../../Assets/logo.png"
import FilmCard from "../../components/Cards/Film"

export default function Start(props) {
  const [textSearch, setTextSearch] = useState("");
  const [search, setSearch] = useState("Movie");
  const [option] = useState(["Movie", "People"]);
  const [allMoviesObjetic, setAllMoviesObject] = useState({});
  const [allPeopleObjetic, setAllPeopleObject] = useState({});
  const [allMovies, setAllMovies] = useState({});
  const [allPeople, setAllPeople] = useState([]);
  const [filtredMovies, setFiltredMovies] = useState([]);

  useEffect(() => {
    async function getData() {
      await getAllFilmds();
      await getAllPeople();
    }
    getData();
  }, [])

  async function getAllFilmds() {
    const response = await starWarsAPI.getAllFilms()
    setAllMovies(response.data.results)
    setFiltredMovies(response.data.results)

    let movies = {}
    response.data.results.map(movie => (
      movies[movie.url] = movie
    ))
    setAllMoviesObject(movies)
  }

  async function getAllPeople() {
    const response = await starWarsAPI.getAllPeople()
    setAllPeople(response.data.results)

    let people = {}
    response.data.results.map(person => (
      people[person.url] = person
    ))
    setAllPeopleObject(people)
  }

  function onChangeSelect(value) {
    setFiltredMovies(allMovies)
    setSearch(value)
    setTextSearch("")

  }

  function filter(value) {
    setTextSearch(value)
    if (!value) {
      return setFiltredMovies(allMovies)
    }

    if (search === "Movie") {
      setFiltredMovies(allMovies.filter((movie) =>
        movie.title.split(' ').join('').toLowerCase().includes(value.split(' ').join('').toLowerCase())
      ))
    }
    else {
      let filtred = [];
      let nameFilter = allPeople.filter((character) =>
        character.name.split(' ').join('').toLowerCase().includes(value.split(' ').join('').toLowerCase())
      )
      if (nameFilter.length === 1) {

        nameFilter[0].films.map(filmUrl => {
          return filtred.push(allMoviesObjetic[filmUrl]);
        })
        setFiltredMovies(filtred)
      } else {
        setFiltredMovies([])
      }
    }
  }

  return (
    <>
      <Grid container direction="column" justify="center" alignItems="center">
        <img
          src={Logo} alt="logo" >
        </img>
        <Grid item xs={12}>
          <Grid container justify="space-between" alignItems="center" spacing={2} >
            <Grid item xs={8}>
              <TextField
                id="outlined-required"
                label="Pesquisa"
                variant="outlined"
                margin="dense"
                fullWidth
                value={textSearch}
                onChange={(event) => filter(event.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                id="outlined-required"
                select
                variant="outlined"
                margin="dense"
                fullWidth
                value={search}
                onChange={(event) =>
                  onChangeSelect(event.target.value)}
              >
                {option.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={6} style={{ marginTop: 32 }}>
          <Grid container justify="flex-start" alignItems="center" spacing={2} >
            {filtredMovies.length > 0 && filtredMovies.map((movie => (
              <Grid item xs={4} >
                <FilmCard movie={movie} allPeopleObjetic={allPeopleObjetic}>
                </FilmCard>
              </Grid>
            )))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

