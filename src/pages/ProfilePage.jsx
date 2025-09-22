import { useState, useEffect } from 'react';
import { Container, Card, Button, Spinner, Form, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSwitchRoleMutation, useUpdateProfileMutation } from '../api/usersApiSlice';
import { updateUserRole, setCredentials } from '../slices/authSlice';
import { FaCamera } from 'react-icons/fa';
import './ProfilePage.css';

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [switchRole, { isLoading: isSwitchingRole }] = useSwitchRoleMutation();
  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
  const [loadingUpload, setLoadingUpload] = useState(false);

  const switchRoleHandler = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir changer de rôle ? Vous ne pourrez pas le refaire avant 15 jours.')) {
      try {
        const res = await switchRole().unwrap();
        dispatch(updateUserRole({ role: res.role }));
        // On met à jour toutes les infos au cas où
        dispatch(setCredentials({ ...userInfo, ...res }));
        toast.success(`Vous êtes maintenant un ${res.role}.`);
      } catch (err) {
        toast.error(err?.data || err.error);
      }
    }
  };
  
  const uploadProfileImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    setLoadingUpload(true);
    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        config
      );
      const res = await updateProfile({ profilePicture: data.secure_url }).unwrap();
      dispatch(setCredentials(res));
      toast.success('Photo de profil mise à jour !');
    } catch (error) {
      toast.error("Le téléversement de l'image a échoué.");
    } finally {
      setLoadingUpload(false);
    }
  };

  return (
    <Container className='profile-container'>
      <Card className='profile-card'>
        <Card.Body>
          <div className='profile-header'>
            <div className='profile-picture-container'>
              <Image 
                src={userInfo?.profilePicture || 'https://i.imgur.com/Suf6O8w.png'} 
                alt={userInfo?.name}
                roundedCircle
                className='profile-picture'
              />
              <Form.Group controlId='profilePicture' className='profile-picture-upload'>
                <Form.Label className='upload-icon'>
                  <FaCamera />
                </Form.Label>
                <Form.Control type='file' onChange={uploadProfileImage} hidden />
              </Form.Group>
               {(isUpdatingProfile || loadingUpload) && <Spinner animation='border' className='profile-picture-spinner' />}
            </div>
            {/* --- CORRECTION ICI --- */}
            <h1>{userInfo?.name}</h1> 
            <p className='text-muted'>{userInfo?.email}</p>
            <p className='text-muted'>{userInfo?.phone}</p>
          </div>
          
          <div className='role-management-section'>
            <h4>Gestion du Rôle</h4>
            <p>
              Votre rôle actuel est : <strong>{userInfo?.role}</strong>
            </p>
            <Button
              variant='outline-primary'
              onClick={switchRoleHandler}
              disabled={isSwitchingRole}
            >
              {isSwitchingRole ? (
                <Spinner animation='border' size='sm' />
              ) : userInfo?.role === 'Particulier' ? (
                'Devenir Prestataire'
              ) : (
                'Devenir Particulier'
              )}
            </Button>
            <small className='d-block mt-2 text-muted'>
              Le changement de rôle est possible une fois tous les 15 jours.
            </small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;