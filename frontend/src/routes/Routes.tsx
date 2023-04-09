import { Routes, Route } from "react-router-dom";
import SearchEngine from "../components/SearchEngine/SearchEngine";

const Router = () => (
  <Routes>
    <Route path="/" element={<SearchEngine />} />
  </Routes>
);

export default Router;
