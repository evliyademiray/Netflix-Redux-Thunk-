import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseImageURL, options } from "../constants/constants";
import Loading from "../components/Loading";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const DetailPage = () => {
  const { id } = useParams();
  //filmin verileri
  const [movie, setMovie] = useState(null);

  //oyuncuların verileri
  const [cast, setCast] = useState(null);
  //URL'deki id'ye göre filmin verilerini al
  useEffect(() => {
    axios
      //filmin bilgilerini alır
      .get(`/movie/${id}`, options)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err));

    //filmdeki kişilerin bilgileri
    axios
      .get(`/movie/${id}/credits`, options)
      .then((res) => setCast(res.data.cast))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="row">
      {!movie ? (
        <Loading />
      ) : (
        <>
          {/* Üst Alan */}
          <div className="col-12 banner">
            <img
              className="w-100 h-100 object-fit-cover"
              src={baseImageURL.concat(movie.backdrop_path)}
            />
            <div className="banner-bg">
              <span>{movie.title}</span>
            </div>
          </div>

          {/* Sol taraf */}
          <div className="col-md-6 mt-4 p-4">
            {/* Şirketler alanı */}
            <h3>Yapımcı Şirketler</h3>
            <div className="d-flex flex-wrap gap-4">
              {movie.production_companies?.map((comp) => (
                <div className="bg-white rounded p-2 d-flex align-items-center justify-content-center ">
                  {comp.logo_path ? (
                    <img
                      className="object-fit-contain"
                      title={comp.name}
                      width={100}
                      height={50}
                      src={baseImageURL.concat(comp.logo_path)}
                    />
                  ) : (
                    <p
                      style={{ width: "100px", marginTop: "10px" }}
                      className="text-black text-center"
                    >
                      {comp.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {/* Diller alanı */}
            <h3 className="mt-4">Konuşulan Diller</h3>
            <div className="d-flex flex-wrap gap-4">
              {movie.spoken_languages?.map((lang) => (
                <div className="bg-white rounded p-1 text-black">
                  <span>{lang.english_name}</span>
                </div>
              ))}
            </div>
            {/* Ülkeler  */}
            <h3 className="mt-4">Yapımcı Ülkeler</h3>
            <div className="d-flex flex-wrap gap-4">
              {movie.production_countries?.map((country) => (
                <div className="bg-white rounded p-1 text-black">
                  <span>{country.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Sağ taraf */}
          <div className="col-md-6 mt-4 p-4">
            <p className="lead">{movie.overview}</p>
            <p>
              <span className="fw-bold">Bütçe: </span>
              {movie.budget}
            </p>
            <p>
              <span className="fw-bold">Gelir: </span>
              {movie.revenue}
            </p>
          </div>
          {/* Kişiler */}
          <div className="col-12 p-4 my-3">
            <h2>Oyuncular</h2>
            <Splide
              options={{
                height: "200px",
                gap: "10px",
                pagination: false,
                autoWidth: true,
              }}
              aria-label="My Favorite Images"
            >
              {cast?.map((actor) => (
                <SplideSlide key={cast.id}>
                  <div className="actor-card h-100">
                    <img
                      className="movie"
                      src={baseImageURL.concat(actor.profile_path)}
                    />
                    <p>
                      <span>{actor.name}</span>
                    </p>
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailPage;
