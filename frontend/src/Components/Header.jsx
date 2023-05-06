import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.hook';

const Header = () => {
  const { logOut, token} = useAuth()
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to='/' className="text-white text-decoration-none">Chat kekslet</Link>
        </Navbar.Brand>
        { token && <Button onClick={logOut}>Выйти</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;