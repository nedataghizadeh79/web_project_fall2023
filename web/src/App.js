import './App.css';
import Login from "./components/login/login";
import { Route, Routes} from "react-router-dom";
import WelcomePage from "./components/welcomePage/welcomePage";
import Register from "./components/register/register";
import NotFound from "./components/notFound/notFound";
import MainPage from "./components/mainPage/mainPage";
import Profile from "./components/profile/profile";

function App() {
    return (
        <Routes>
            <Route path='/' element={<WelcomePage/>} />
            <Route path='/login' element={ <Login/>} />
            <Route path='/main' element={ <MainPage/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='*' element={<NotFound/>} />
            <Route path='/profile' element={<Profile/>} />
        </Routes>
    );
}

export default App;
