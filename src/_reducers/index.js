import { combineReducers } from "redux";
import { movies, detailMovies } from "./movies";

export default combineReducers({
  movies,
  detailMovies,
});
