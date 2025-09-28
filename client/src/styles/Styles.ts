import { makeStyles } from '@mui/styles';
import backgroundImage from '../assets/images/logo.png'; // ✅ correct import

const useStyles = makeStyles({
  login: {
    position: 'relative',
    maxWidth: 400,
    maxHeight: 1000,
    height: '60vh',
    margin: 'auto',
    alignContent: 'center',
    marginTop: '15vh',
    backgroundColor: '#f9f9f9',
    borderRadius: '0.75rem',
    color: 'rgb(0, 0, 0)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    display: 'flex',
  },
  loginCardImage: {
    position: 'absolute', 
    width: '100%',
    height: '300px',
    marginTop: '-80px',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
    zIndex: 10, 
    pointerEvents: 'none',
  },
  loginCardInput: {
    width: '100%',
    alignContent: 'center',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
  },
  text: {
    color: '#555',
  },

  // DASHBOARD

  
});

export default useStyles;