import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaPlus } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../api/usersApiSlice';
import { logout } from '../slices/authSlice';
import './Header.css';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to={userInfo ? '/feed' : '/'}>
            <Navbar.Brand>Findly</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto align-items-center'>
              {userInfo ? (
                <>
                  {/* --- CONDITION AJOUTÉE ICI --- */}
                  {userInfo.role === 'Prestataire' && (
                    <LinkContainer to='/service/create'>
                      <Button variant='primary' className='me-3'>
                        <FaPlus /> Proposer un service
                      </Button>
                    </LinkContainer>
                  )}
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>
                        <FaUser /> Profil
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      <FaSignOutAlt /> Déconnexion
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaSignInAlt /> Se Connecter
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>
                      <FaUser /> S'inscrire
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;