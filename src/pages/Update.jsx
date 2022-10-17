import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Update = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    price: null,
    cover: "",
  });

  console.log(book);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/books/${location.pathname.split("/")[2]}`
        );
        setBook(...res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getBook();
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/books/${location.pathname.split("/")[2]}`,book);
      navigate("/");
    }catch(err) {
      console.log(err);
    }
  };
  return (
    <div className="form">
      <h1>Update the Book</h1>
      <input
        value={book.title || ""}
        type="text"
        placeholder="Title"
        onChange={handleChange}
        name="title"
      />
      <input
        value={book.description || ""}
        type="text"
        placeholder="Description"
        onChange={handleChange}
        name="description"
      />
      <input
        value={book.price || ""}
        type="number"
        placeholder="Price"
        onChange={handleChange}
        name="price"
      />
      <input
        value={book.cover || ""}
        type="text"
        placeholder="Cover"
        onChange={handleChange}
        name="cover"
      />
      <button className="formButton" onClick={handleClick}>
        Update
      </button>
    </div>
  );
};
