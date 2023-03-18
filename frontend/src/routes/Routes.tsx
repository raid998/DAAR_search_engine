import { Routes, Route } from "react-router-dom";
import SearchEngine from "../components/SearchEngine/SearchEngine";
import ListsResults from "../components/Results/ListResults";

const Router = () => (
  <Routes>
    <Route path="/" element={<SearchEngine />} />
    <Route path="/results" element={<ListsResults />} />
  </Routes>
);

export default Router;
