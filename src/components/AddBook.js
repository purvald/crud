import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import BookDataService from "../services/book.services";
// import "react-hooks/exhaustive-deps"

const AddBook = ({ id, setBookId }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState("Not Read");
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (title === "" || author === "" || year === "" || genre === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newBook = {
      title,
      author,
      year,
      genre,
      status,
    };
    console.log(newBook);

    try {
      if (id !== undefined && id !== "") {
        await BookDataService.updateBook(id, newBook);
        setBookId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await BookDataService.addBooks(newBook);
        setMessage({ error: false, msg: "New Book added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setTitle("");
    setAuthor("");
    setYear("");
    setGenre("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await BookDataService.getBook(id);
      console.log("the record is :", docSnap.data());
      setTitle(docSnap.data().title);
      setAuthor(docSnap.data().author);
      setYear(docSnap.data().year);
      setGenre(docSnap.data().genre);
      setStatus(docSnap.data().status);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
    // eslint-disable-next-line
  }, [id]);
  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBookTitle">
            <InputGroup>
              <InputGroup.Text id="formBookTitle" style={{ width: "15%", display: "flex", justifyContent: "center", alignItems: "center" }} >Title</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Book Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <InputGroup.Text id="formBookAuthor" style={{ width: "15%", display: "flex", justifyContent: "center", alignItems: "center" }} >Author</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Book Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookYear">
            <InputGroup>
              <InputGroup.Text id="formBookYear" style={{ width: "15%", display: "flex", justifyContent: "center", alignItems: "center" }} >Year</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Book year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookGenre">
            <InputGroup>
              <InputGroup.Text id="formBookGenre" style={{ width: "15%", display: "flex", justifyContent: "center", alignItems: "center" }} >Genre</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Book genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookCover">
            <InputGroup>
              <InputGroup.Text id="formBookCover" style={{ width: "15%", display: "flex", justifyContent: "center", alignItems: "center" }} >Cover</InputGroup.Text>
              <Form.Control
                type="file"
                placeholder="Book cover"
                // value={cover}
                // onChange={(e) => setCover(e.target.files)}
              />
            </InputGroup>
          </Form.Group>

          <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              disabled={flag}
              variant="success"
              style={{ backgroundColor: "#1c2d39", color: "#fff", fontSize: "16px" }}
              onClick={(e) => {
                setStatus("Not Read");
                setFlag(true);
              }}
            >
              Not Read
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              style={{ backgroundColor: "#1c2d39", color: "#fff", fontSize: "16px" }}
              onClick={(e) => {
                setStatus("Read");
                setFlag(false);
              }}
            >
              Read
            </Button>
          </ButtonGroup>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit" style={{ backgroundColor: "#1c2d39", color: "#fff", borderRadius: "7px", fontSize: "15px" }}>
              Add/Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddBook;
