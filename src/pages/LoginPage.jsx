import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Row, Col, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useLoginMutation } from '../api/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import './AuthForm.css'; // On va créer ce fichier de style commun

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/feed'); // Redirige si déjà connecté
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/feed');
    } catch (err) {
      toast.error(err?.data || err.error || 'Une erreur est survenue');
    }
  };

  return (
    <div className='auth-form-container'>
      <Card className='auth-form-card'>
        <Card.Body>
          <h1>Se connecter</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className='my-3' controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Entrez votre email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-3' controlId='password'>
              <Form.Label>Mot de passe</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Entrez votre mot de passe'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></Form.Control>
                <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>

            <Button type='submit' variant='primary' disabled={isLoading} className='mt-3 w-100'>
              {isLoading ? 'Connexion...' : 'Se Connecter'}
            </Button>

            <Row className='py-3'>
              <Col className='text-center'>
                Nouveau client? <Link to='/register'>S'inscrire</Link>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginPage;