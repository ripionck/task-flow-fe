import { LogOut } from 'lucide-react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const LogoutButton = ({ className }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center gap-2 text-gray-700 hover:text-red-600 ${
        className || ''
      }`}
    >
      <LogOut className="w-4 h-4" />
      <span>Logout</span>
    </button>
  );
};

LogoutButton.propTypes = {
  className: PropTypes.string,
};

LogoutButton.defaultProps = {
  className: '',
};

export default LogoutButton;
