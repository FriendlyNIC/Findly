import { Container, Row, Col } from 'react-bootstrap';
import GoBackButton from '../components/GoBackButton'; // Ajouté

const TermsPage = () => {
  return (
    <Container className='py-5'>
      <GoBackButton /> {/* Modifié */}
      <Row className='justify-content-md-center'>
        <Col md={8}>
          <h1>Conditions Générales d'Utilisation</h1>
          <p className='lead mt-4'>
            Ce document régit les termes de votre utilisation de la plateforme Findly.
          </p>
          <h5 className='mt-4'>Article 1 : Objet</h5>
          <p>
            Findly a pour but de mettre en relation des prestataires de services avec des particuliers. L'utilisation de la plateforme implique l'acceptation pleine et entière des présentes conditions.
          </p>
          <h5 className='mt-4'>Article 2 : Compte Utilisateur</h5>
          <p>
            La création d'un compte est obligatoire pour accéder à certains services. Vous êtes responsable de la confidentialité de votre mot de passe et de toutes les activités effectuées depuis votre compte.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default TermsPage;