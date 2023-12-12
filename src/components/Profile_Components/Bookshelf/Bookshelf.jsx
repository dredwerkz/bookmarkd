import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";


function Bookshelf(props) {
  // Stuff
  const [books, setBooks] = useState([]);

  useEffect(() => {

    async function getBooks(book_id) {
        console.log(`function called with ${book_id}`)
        const responseRequest = await fetch(
            `https://bookmarkd-server.onrender.com/api/books?book_id=${book_id}`,
            {
                method: `GET`,
                headers: {
                    Accept: "application/json",
                },
            }
        );

        if (responseRequest.ok) {
            const responseData = await responseRequest.json();
            console.log(responseData)
            return responseData.payload;
        } else if (!responseRequest.ok) {
            console.error(`Status: ${responseRequest.status}`);
            console.error(`Text: ${await responseRequest.text()}`);
            console.error("Data not available");
            return;
        }
    }

    props.bookshelf_books.map((book_id) => {
        console.log(book_id)
        getBooks(book_id)
        .then((payload) => {
            setBooks(payload);
        })
        .catch((error) => {
            console.error(`Error fetching: ${error}`);
        });    });
  }, []);
  return (
    <>
      <Typography variant="h4">
        {props.bookshelf_name}
        {books.book_title}
      </Typography>
    </>
  );
}

export default Bookshelf;
