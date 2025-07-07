import './App.css';
import Home from './components/pages/home';
import Login from './components/pages/login';
import { WalletProvider } from './components/hooks/connect';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <WalletProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </WalletProvider>
    </Router>
  );
}

export default App;
