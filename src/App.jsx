import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/detay/:id" element={<DetailPage />} />
        <Route path="*" element={<h1>YOL BULUNAMADI</h1>} />
        <Route />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
