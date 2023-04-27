import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import LandingPage from "./views/LandingPage/LandingPage";
import NotFound from "./views/NotFound/NotFound";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import Form from "./views/Form/Form";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname === "/home" && <Nav />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipes/:id" element={<Detail />} />
        <Route path="/recipes/create" element={<Form />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
