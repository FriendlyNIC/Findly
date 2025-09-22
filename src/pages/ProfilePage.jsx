import { Container, Card, Button, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useSwitchRoleMutation } from '../api/usersApiSlice';
import { updateUserRole } from '../slices/authSlice';
import './ProfilePage.css';

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [switchRole, { isLoading }] = useSwitchRoleMutation();

  const switchRoleHandler = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir changer de rôle ? Vous ne pourrez pas le refaire avant 15 jours.')) {
      try {
        const res = await switchRole().unwrap();
        dispatch(updateUserRole({ role: res.role }));
        toast.success(`Vous êtes maintenant un ${res.role}.`);
      } catch (err) {
        toast.error(err?.data || err.error);
      }
    }
  };

  return (
    <Container className='profile-container'>
      <Card className='profile-card'>
        <Card.Body>
          <h1 className='text-center mb-4'>Profil de {userInfo?.name}</h1>
          <p><strong>Email:</strong> {userInfo?.email}</p>
          <p><strong>Téléphone:</strong> {userInfo?.phone}</p> {/* Ce champ va maintenant s'afficher */}
          <hr />
          <div className='role-management-section'>
            <h4>Gestion du Rôle</h4>
            <p>
              Votre rôle actuel est : <strong>{userInfo?.role}</strong>
            </p>
            <Button
              variant='outline-primary'
              onClick={switchRoleHandler}
              disabled={isLoading}
            >
              {isLoading ? (
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