import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Container>
      <h1>Profil de {userInfo?.name}</h1>
      <p>Email: {userInfo?.email}</p>
      <p>Téléphone: {userInfo?.phone}</p>
      <p>Rôle: {userInfo?.role}</p>
      {/* On ajoutera les options de modification et la gestion des services plus tard */}
    </Container>
  );
};

export default ProfilePage;