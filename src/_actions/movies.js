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
  console.log("PAGE: ", page);
  const url =
    "http://www.omdbapi.com/?apikey=faf7e5bb&s=" + DATA + "&page=" + page;
  let source = axios.CancelToken.source();
  return (dispatch) =>
    axios
      .get(url, {
        cancelToken: source.token,
      })
      .then((res) => {
        initial === 1 && dispatch(movies(res.data));
        return res.data;
      });
}

export function getDetailMovies(ID) {
  return (dispatch) =>
    axios.get("http://www.omdbapi.com/?apikey=faf7e5bb&i=" + ID).then((res) => {
      //   console.log("res", res.data);
      dispatch(detailMovies(res.data));
    });
}

export function autoComplete(DATA) {
  const url = "http://www.omdbapi.com/?apikey=faf7e5bb&s=" + DATA + "&page=1";
  return (dispatch) =>
    axios.get(url).then((res) => {
      return res.data;
    });
}
