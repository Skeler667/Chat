import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.hook';

const Header = () => {
  const { logOut, user} = useAuth()
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to='/' className="text-white text-decoration-none">Chat kekslet</Link>
        </Navbar.Brand>
        { user && <Button onClick={logOut}>Выйти</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;