import { Row, Col } from 'react-bootstrap';
import { useGetServicesQuery } from '../api/servicesApiSlice';
import ServiceCard from '../components/ServiceCard';
import Loader from '../components/Loader';
import Message from '../components/Message';

const FeedPage = () => {
  const { data: services, isLoading, error } = useGetServicesQuery();

  return (
    <>
      <h1>Derniers Services</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Row>
            {services.map((service) => (
              <Col key={service._id} sm={12} md={6} lg={4} xl={3}>
                <ServiceCard service={service} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default FeedPage;