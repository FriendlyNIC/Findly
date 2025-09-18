import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import './LandingPage.css';
// Assure-toi que le chemin vers ta vidéo est correct
import bgVideo from '../assets/videos/background.mp4'; 

const LandingPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/feed'); // Redirige vers le feed si l'utilisateur est déjà connecté
    }
  }, [userInfo, navigate]);

  return (
    <div className='landing-container'>
      <video autoPlay loop muted className='landing-video-bg'>
        <source src={bgVideo} type='video/mp4' />
      </video>
      <div className='landing-overlay'></div>
      <Container className='landing-content text-center'>
        <h1 className='landing-title'>Bienvenue sur Findly</h1>
        <p className='landing-subtitle'>
          La plateforme qui connecte les meilleurs prestataires à ceux qui en ont besoin.
        </p>
        <div className='mt-4'>
          <Link to='/register'>
            <Button variant='primary' size='lg' className='me-3 landing-button'>
              S'inscrire
            </Button>
          </Link>
          <Link to='/login'>
            <Button variant='outline-light' size='lg' className='landing-button'>
              Se Connecter
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default LandingPage;