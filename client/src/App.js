import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import AllEvents from './pages/events/AllEvents';
import Event from './pages/events/Event';
import CreateEvent from './pages/events/CreateEvent';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import EmailVerification from './pages/auth/EmailVerification';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import PrivateRoute from './utils/PrivateRoute';
import Footer from './components/Footer';

import 'flowbite';

function App() {
  return (

    <BrowserRouter>
        <Navbar />
        <Routes>

            <Route element={<PrivateRoute />} >
              <Route 
                path='/events/create'
                element={<CreateEvent />}
              />
            </Route>

            <Route 
              path='/'
              element= {<Home />}
            />
            <Route
              path='/events'
              element= {<AllEvents />}
            />
            <Route 
              path='/event/:id'
              element={<Event />}
            />
            <Route 
              path='/auth/signup'
              element={<SignUp />}
            />
            <Route 
              path='/auth/signin'
              element={<SignIn />}
            />
            <Route 
              path='/auth/email-verification/:verificationToken'
              element={<EmailVerification />}
            />
            <Route 
              path='/auth/forgot-password'
              element={<ForgotPassword />}
            />
            <Route 
              path='/auth/reset-password/:resetToken'
              element={<ResetPassword />}
            />
        </Routes>
        <Footer />
    </BrowserRouter>
    
  );
}

export default App;