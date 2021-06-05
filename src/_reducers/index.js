import { combineReducers } from "redux";
import { movies, detailMovies } from "./movies";

console.log("movies", movies);

export default combineReducers({
  movies,
  detailMovies,
});
