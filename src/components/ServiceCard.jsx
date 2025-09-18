import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ServiceCard.css';

const ServiceCard = ({ service }) => {
  return (
    <Card className='my-3 p-3 rounded service-card'>
      <Link to={`/service/${service._id}`}>
        <Card.Img
          src={service.images?.[0] || 'https://via.placeholder.com/300x200'}
          variant='top'
          className='service-card-img'
        />
      </Link>

      <Card.Body>
        <Link to={`/service/${service._id}`}>
          <Card.Title as='div' className='service-title'>
            <strong>{service.title}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='h5' className='service-price'>
          {service.price.amount} {service.price.currency}
        </Card.Text>

        <Card.Text as='p' className='service-provider'>
          par {service.user?.name || 'Prestataire'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;