import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import BookDataService from "../services/book.services";
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
const BooksList = ({ getBookId }) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    const data = await BookDataService.getAllBooks();
    console.log(data.docs);
    setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await BookDataService.deleteBook(id);
    getBooks();
  };
  return (
    <>
      <div className="mb-2">
        <Button variant="edit" style={{ backgroundColor: "#1c2d39", color: "#fff", fontSize: "0.7rem", borderRadius: "7px"}} onClick={getBooks}>
          Refresh List
        </Button>
      </div>

      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Book Title</th>
            <th>Book Author</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.title}</td>
                <td>{doc.author}</td>
                <td>{doc.year}</td>
                <td>{doc.genre}</td>
                <td>{doc.status}</td>
                <td>
                  <Button
                    style={{ backgroundColor: "#1c2d39", color: "#fff", fontSize: "0.7rem", borderRadius: "7px"}}
                    className="edit"
                    onClick={(e) => getBookId(doc.id)}
                  > <BsPencilSquare style={{ marginBottom:"2px"}}/>
                    Edit
                  </Button>
                  <Button
                    style={{ backgroundColor: "#1c2d39", color: "#fff", fontSize: "0.7rem", borderRadius: "7px"}}
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  ><BsTrash style={{ marginBottom:"2px"}}/>
                    Delete
                  </Button>

                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default BooksList;
