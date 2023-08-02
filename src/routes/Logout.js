import { useNavigate } from 'react-router-dom';
import { authService } from '../fbase';
import Home from './Home';

const Logout = () => {
    const navigate = useNavigate();
      authService.signOut();
      navigate('/Home');
    };

export default Logout;