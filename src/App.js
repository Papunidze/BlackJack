import "./App.css";
import Home from "./components/home/Home";
import ErorrPage from "./components/Eror/ErorrPage";
import Blackjack from "./components/blackjack/Blackjack";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import reverseMode from "./resource/reversemode.gif";
function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <div className="reverseMode">
          <img src={reverseMode} alt=""></img>
        </div>
        <div className="blackJack">
          <Routes>
            <Route exat path="/" element={<Home />}></Route>
            <Route path="*" element={<ErorrPage />}></Route>
            <Route path="table" element={<Blackjack />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
