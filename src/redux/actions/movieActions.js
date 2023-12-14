import axios from "axios";
import { options } from "../../constants/constants";
import { actionTypes } from "../actionTypes";

//popüler filmleri alacak
//ve store'a aktarır

//Base Url oluşturma
axios.defaults.baseURL = "https://api.themoviedb.org/3";

export const getPopular = () => (dispatch) => {
  axios
    .get("/movie/popular", options)
    .then((res) =>
      dispatch({ type: actionTypes.SET_MOVIES, payload: res.data.results })
    )
    .catch((err) => dispatch({ type: actionTypes.SET_MOVIES_ERROR }));
};

//Tür verilerini al

export const getGenres = () => (dispatch) => {
  axios
    .get("/genre/movie/list?language=en",options)
    .then((res) =>
      //api'den olumlu cevap gelirse türleri store'a aktar
      dispatch({ type: actionTypes.SET_GENRES, payload: res.data.genres })
    )
    //api'den olumsuz cevap gelirse store'u güncelle
    .catch(() => dispatch({ type: actionTypes.SET_GENRES_ERROR }));
};
