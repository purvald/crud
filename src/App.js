import { useState } from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import AddBook from "./components/AddBook";
import BooksList from "./components/BooksList";
import "./App.css";

function App() {
  const [bookId, setBookId] = useState("");

  const getBookIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setBookId(id);
  };
  return (
    <>
      <Navbar className="header">
        <Container>
          <Navbar.Brand href="#home" style={{ color: "#fff" }}>BookBuddy</Navbar.Brand>
        </Container>
      </Navbar>

      {/* <Container style={{ width: "600px" }}> */}
        <Row style={{ marginLeft : "100px",width: "600px" }}>
          <Col>
            <AddBook id={bookId} setBookId={setBookId} />
          </Col>
        </Row>
      {/* </Container> */}
      <Container>
        <Row>
          <Col>
            <BooksList getBookId={getBookIdHandler} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
