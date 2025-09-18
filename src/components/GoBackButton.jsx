import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './GoBackButton.css';

const GoBackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Si l'historique de navigation de l'onglet contient plus que la page actuelle, on peut revenir en arrière.
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Sinon (page ouverte dans un nouvel onglet), on renvoie à la page d'accueil.
      navigate('/');
    }
  };

  return (
    <Button variant='light' className='go-back-button' onClick={handleBack}>
      <FaArrowLeft />
    </Button>
  );
};

export default GoBackButton;