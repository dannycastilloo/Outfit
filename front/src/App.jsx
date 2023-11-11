import { Routes, Route, Navigate } from 'react-router-dom';
import { Cliente } from './screens/Cliente';
import { Prestamos } from './screens/Prestamos';
import { Resumen } from './screens/Resumen';
import { Navbar } from './components/Navbar';
import { Profile } from './screens/Profile';
import { Login } from './screens/Login';
import { MayShowNavbar } from './components/MayShowNavbar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { Home } from './screens/Home';
import { Register } from './screens/Register';

export const App = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (authUser) => {
        setUser(authUser);
      });
  
      return () => unsubscribe();
    }, []);

    return (
        <>
            <div className="container">
                <MayShowNavbar>
                    <Navbar />
                </MayShowNavbar>

                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/cliente" element={<Cliente />} />
                    <Route path="/prestamos" element={<Prestamos />} />
                    <Route path="/resumen" element={<Resumen />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </>
    )
}
