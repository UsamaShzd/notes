import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

function Header() {
  return (
    <Navbar bg="dark" expand="lg" className="py-3">
      <Container>
        <Navbar.Brand href="#" className="text-white">
          Notes
        </Navbar.Brand>
        <Nav>
          <Button variant="outline-light">+ Add Note</Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
