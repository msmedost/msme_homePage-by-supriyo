
import './App.css';
import Home from './pages/home';
import { BrowserRouter,Route,Routes,Router } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      
     
      <Route path="/" element={<Home/>} />
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;
