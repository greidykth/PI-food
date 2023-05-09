import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import { Home, Form, LandingPage, Detail, NotFound } from "./views";
import { useSelector } from "react-redux";
import Notification from "./components/Notification/Notification";

function App() {
  const location = useLocation();
  const { notification } = useSelector((state) => state);

  return (
    <div className="App">
      {(location.pathname === "/home" ||
        location.pathname === "/recipes/create" ||
        location.pathname.includes("/recipes")) && <Nav />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipes/:id" element={<Detail />} />
        <Route path="/recipes/create" element={<Form />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {notification.message !== "" && <Notification />}
    </div>
  );
}

export default App;
