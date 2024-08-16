import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";

import LoginPage from "./pages/LoginPage";
import NotFoud from "./pages/NotFoud";
import ArticleDetail from "./pages/ArticleDetail";
import MovieDetail from "./pages/MovieDetail";
import List from "./pages/List";
import Register from "./pages/Register";


function App() {
 

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/register" element={<Register />} />

        <Route path="/list" element={<List />} />
    
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoud />} />
      </Routes>
    </>
  );
}

export default App;
