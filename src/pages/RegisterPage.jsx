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
import GoBackButton from '../components/GoBackButton'; // Ajouté
import './AuthForm.css';
import './RegisterPage.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/feed');
    }
  }, [navigate, userInfo]);

  const validatePassword = (pass) => {
    const hasMinLength = pass.length >= 9;
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasNumber = /\d{2,}/.test(pass);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    return { hasMinLength, hasUpperCase, hasNumber, hasSpecialChar };
  };

  const { hasMinLength, hasUpperCase, hasNumber, hasSpecialChar } = validatePassword(password);
  const isPasswordValid = hasMinLength && hasUpperCase && hasNumber && hasSpecialChar;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!agreedToTerms) {
      toast.error("Vous devez accepter les conditions d'utilisation.");
      return;
    }
    if (!isValidPhoneNumber(phone || '')) {
      toast.error('Veuillez entrer un numéro de téléphone valide.');
      return;
    }
    if (!isPasswordValid) {
      toast.error('Votre mot de passe ne respecte pas les critères de sécurité.');
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
      <GoBackButton /> {/* Modifié */}
      <Card className='auth-form-card'>
        <Card.Body>
          <h1>S'inscrire</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className='my-3' controlId='name'>
              <Form.Label>Nom</Form.Label>
              <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)} required />
            </Form.Group>

            <Form.Group className='my-3' controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            
            <Form.Group className='my-3' controlId='phone'>
              <Form.Label>Numéro de téléphone</Form.Label>
              <PhoneInput
                placeholder="Entrez votre numéro"
                value={phone}
                onChange={setPhone}
                defaultCountry="CI"
                international
                withCountryCallingCode
                required
              />
            </Form.Group>

            <Form.Group className='my-3' controlId='password'>
              <Form.Label>Mot de passe</Form.Label>
              <InputGroup>
                <Form.Control type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} onFocus={() => setPasswordFocus(true)} onBlur={() => setPasswordFocus(false)} required />
                <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</Button>
              </InputGroup>
              {passwordFocus && (
                <div className='password-rules mt-2'>
                  <small style={{ color: hasMinLength ? 'green' : 'red' }}>✓ 9 caractères minimum</small><br/>
                  <small style={{ color: hasUpperCase ? 'green' : 'red' }}>✓ 1 majuscule</small><br/>
                  <small style={{ color: hasNumber ? 'green' : 'red' }}>✓ Au moins 2 chiffres</small><br/>
                  <small style={{ color: hasSpecialChar ? 'green' : 'red' }}>✓ 1 caractère spécial (!, @, #...)</small>
                </div>
              )}
            </Form.Group>

            <Form.Group className='my-3' controlId='confirmPassword'>
              <Form.Label>Confirmer le mot de passe</Form.Label>
              <InputGroup>
                <Form.Control type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <Button variant="outline-secondary" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</Button>
              </InputGroup>
            </Form.Group>

            <Form.Group className="my-3" controlId="termsCheckbox">
              <Form.Check 
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                label={<span>J'accepte les <Link to="/terms" target="_blank">Conditions d'Utilisation</Link></span>}
              />
            </Form.Group>

            <Button type='submit' variant='primary' disabled={isLoading} className='mt-2 w-100'>
              {isLoading ? 'Création du compte...' : "S'inscrire"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RegisterPage;