import { useEffect } from "react";
import Hero from "../components/Hero";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getPopular } from "../redux/actions/movieActions";
import { actionTypes } from "../redux/actionTypes";
import Loading from "../components/Loading";
import MovieList from "../components/MovieList";

const MainPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store);
  useEffect(() => {
    //filmler için yükleniyor state'ini aktif eden aksiyon
    dispatch({ type: actionTypes.SET_MOVIES_LOADING });

    //Popüler filmleri al ve store'a aktar.
    dispatch(getPopular());
    //türleri al ve store'a aktar
    dispatch({ type: actionTypes.SET_GENRES_LOADING });
    dispatch(getGenres());
  }, []);
  return (
    <div>
      {/* Karşılama component */}
      <Hero />
      {/* Her bir kategori için ekrana o kategorinin
       filmlerini basacak bileşeni ekrana bas 
       Önce yükleniyor mu kontrol et, yükleniyorsa loading bileşenini ekrana bas, 
       yüklenme bittiyse hata var mı kontrol et,
       hata varsa ekrana hata mesajı gönder, hata yoksa her bir kategori için
       ekrana o kategorinin filmlerini basacak bileşeni ekrana bas
       
       */}
      {state.isGenresLoading ? (
        <Loading />
      ) : state.isGenresError ? (
        <p>Hata oluştu</p>
      ) : (
        state.genres.map((genre) => <MovieList key={genre.id} genre={genre}/>)
      )}
    </div>
  );
};

export default MainPage;
