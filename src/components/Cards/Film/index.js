
import React, { useState } from 'react';
import { Grid, ButtonBase, Typography } from "@material-ui/core";
import MovieInformation from "../../Dialogs/MovieInformation"
import movie1 from "../../../Assets/1.jpg"
import movie2 from "../../../Assets/2.jpg"
import movie3 from "../../../Assets/3.jpg"
import movie4 from "../../../Assets/4.jpg"
import movie5 from "../../../Assets/5.jpg"
import movie6 from "../../../Assets/6.jpg"

export default function FilmCard(props) {

  function getImage() {

    switch (props.movie.title) {
      case "The Empire Strikes Back":
        return movie2;
      case "Return of the Jedi":
        return movie3;
      case "The Phantom Menace":
        return movie4;
      case "Attack of the Clones":
        return movie5;
      case "Revenge of the Sith":
        return movie6
      default:
        return movie1
    }
  }


  const [openMovieInformation, setOpenMovieInformation] = useState(false);

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <ButtonBase onClick={() => setOpenMovieInformation(true)}>
        <img src={getImage()} width="70%" alt="capa-filme" >
        </img>
      </ButtonBase>
      <Typography align="center" style={{ color: "white" }}>
        {props.movie.title}
      </Typography>
      <MovieInformation
        open={openMovieInformation}
        onClose={() => setOpenMovieInformation(false)}
        movie={props.movie}
        allPeopleObjetic={props.allPeopleObjetic}
      ></MovieInformation>
    </Grid>
  );
}
