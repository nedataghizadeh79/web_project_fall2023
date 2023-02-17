import './App.css';
import MainPage from "./components/mainPage/mainPage";
import Login from "./components/login/login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import WelcomePage from "./components/welcomePage/welcomePage";

function App() {
  return (
      <Routes>
        <Route path='/login' element={ <Login/>} />
        <Route path='/' element={<WelcomePage/>} />
      </Routes>

  );
}

export default App;
