import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Card, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useRegisterMutation } from '../api/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import './AuthForm.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/feed');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!phone || !isValidPhoneNumber(phone)) {
      toast.error('Veuillez entrer un numéro de téléphone valide.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas.');
      return;
    }
    try {
      const res = await register({ name, email, password, phone }).unwrap();
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
          <h1>S'inscrire</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className='my-3' controlId='name'>
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type='text'
                placeholder='Entrez votre nom'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className='my-3' controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Entrez votre email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className='my-3' controlId='phone'>
                <Form.Label>Numéro de téléphone</Form.Label>
                <PhoneInput
                  placeholder="Entrez votre numéro"
                  value={phone}
                  onChange={setPhone}
                  defaultCountry="CI" // Côte d'Ivoire par défaut
                  international
                  withCountryCallingCode
                  required
                />
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
                />
                 <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>

            <Form.Group className='my-3' controlId='confirmPassword'>
              <Form.Label>Confirmer le mot de passe</Form.Label>
               <InputGroup>
                <Form.Control
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='Confirmez le mot de passe'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                 <Button variant="outline-secondary" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>

            <Button type='submit' variant='primary' disabled={isLoading} className='mt-3 w-100'>
              {isLoading ? "Création du compte..." : "S'inscrire"}
            </Button>

            <Row className='py-3'>
              <Col className='text-center'>
                Déjà un compte? <Link to='/login'>Se connecter</Link>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RegisterPage;