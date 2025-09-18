import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './GoBackButton.css';

const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <Button variant='light' className='go-back-button' onClick={() => navigate(-1)}>
      <FaArrowLeft />
    </Button>
  );
};

export default GoBackButton;