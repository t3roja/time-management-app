import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';



export default function NavBar() {

  const navigate = useNavigate();


  const isLoggedIn = localStorage.getItem('access-token') &&
    localStorage.getItem('client') &&
    localStorage.getItem('uid');


  const handleLogOutClick = () => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('client');
    localStorage.removeItem('uid');
    navigate('/login')
  };


  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          {isLoggedIn && (
            <div>
              <IconButton
                size="small"
                onClick={handleLogOutClick}
                color="inherit"
              >
                <LogoutIcon />
                Kirjaudu ulos
              </IconButton>

            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}