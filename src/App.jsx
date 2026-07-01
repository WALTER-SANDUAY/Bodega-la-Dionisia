import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RutaProtegida from './components/RutaProtegida';
import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Login from './pages/Login';
import Admin from './pages/Admin';
import './App.css';

function Inicio() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <RutaProtegida>
                <Admin />
              </RutaProtegida>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;