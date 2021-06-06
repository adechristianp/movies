import axios from "axios";

export const LIST_MOVIES = "LIST_MOVIES";
export const RESET_MOVIES = "RESET_MOVIES";
export const DETAIL_MOVIES = "DETAIL_MOVIES";
export const RESET_DETAIL_MOVIES = "RESET_DETAIL_MOVIES";

export function movies(data) {
  return {
    type: LIST_MOVIES,
    data,
  };
}
export function resetMovies() {
  return {
    type: RESET_MOVIES,
  };
}
export function detailMovies(data) {
  return {
    type: DETAIL_MOVIES,
    data,
  };
}
export function resetDetailMovies() {
  return {
    type: RESET_DETAIL_MOVIES,
  };
}

export function getMovies(DATA, page, initial) {
  const url =
    "https://www.omdbapi.com/?apikey=79a5999f&s=" + DATA + "&page=" + page;
  return (dispatch) =>
    axios
      .get(url)
      .then((res) => {
        initial === 1 && dispatch(movies(res.data));
        return res.data;
      })
      .catch((e) => {
        initial === 1 && dispatch(movies(e.response.data));
        return e.response.data;
      });
}

export function getDetailMovies(ID) {
  return (dispatch) =>
    axios
      .get("https://www.omdbapi.com/?apikey=79a5999f&i=" + ID)
      .then((res) => {
        dispatch(detailMovies(res.data));
      })
      .catch((e) => {
        dispatch(detailMovies(e.response.data));
      });
}

export function autoComplete(DATA) {
  const url = "https://www.omdbapi.com/?apikey=79a5999f&s=" + DATA + "&page=1";
  return (dispatch) =>
    axios.get(url).then((res) => {
      return res.data;
    });
}
