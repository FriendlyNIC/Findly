import { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateServiceMutation } from '../api/servicesApiSlice';
import Loader from '../components/Loader';
import GoBackButton from '../components/GoBackButton';
import './CreateServicePage.css';

const CreateServicePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priceAmount, setPriceAmount] = useState('');
  const [priceType, setPriceType] = useState('Forfait');
  const [location, setLocation] = useState('');

  const navigate = useNavigate();
  const [createService, { isLoading }] = useCreateServiceMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createService({
        title,
        description,
        category,
        price: {
          amount: Number(priceAmount),
          type: priceType,
        },
        location,
        images: [], // La gestion des images sera ajoutée plus tard
      }).unwrap();
      toast.success('Service créé avec succès !');
      navigate('/feed');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container className='py-5'>
      <GoBackButton />
      <Row className='justify-content-md-center'>
        <Col md={8}>
          <Card className='create-service-card'>
            <Card.Body>
              <h1 className='text-center mb-4'>Proposer un service</h1>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='title' className='mb-3'>
                  <Form.Label>Titre de l'annonce</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Ex: Plombier disponible à Marcory'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId='description' className='mb-3'>
                  <Form.Label>Description détaillée</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={5}
                    placeholder='Décrivez précisément le service que vous proposez...'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId='category' className='mb-3'>
                  <Form.Label>Catégorie</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Ex: Maison, Réparation, Cours...'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId='priceAmount' className='mb-3'>
                      <Form.Label>Tarif</Form.Label>
                      <Form.Control
                        type='number'
                        placeholder='Ex: 5000'
                        value={priceAmount}
                        onChange={(e) => setPriceAmount(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId='priceType' className='mb-3'>
                      <Form.Label>Type de tarif</Form.Label>
                      <Form.Select
                        value={priceType}
                        onChange={(e) => setPriceType(e.target.value)}
                      >
                        <option>Forfait</option>
                        <option>Par heure</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId='location' className='mb-4'>
                  <Form.Label>Zone de service (optionnel)</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Ex: Abidjan, Zone 4'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </Form.Group>

                <div className='d-grid'>
                  <Button type='submit' variant='primary' size='lg' disabled={isLoading}>
                    {isLoading ? <Loader /> : 'Publier le service'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateServicePage;