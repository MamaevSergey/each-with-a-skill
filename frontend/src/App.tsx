import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import Portfolio from './pages/Portfolio';
import MyPortfolio from './pages/MyPortfolio';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Search />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/portfolio/:username" element={<Portfolio />} />
                <Route path="/my-portfolio" element={<MyPortfolio />} />
            </Routes>
        </Router>
    );
}

export default App;