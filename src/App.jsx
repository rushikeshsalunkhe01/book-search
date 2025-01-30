import { useState, useEffect } from "react";
import { BOOKS } from "./configs";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(BOOKS);
  const [genreFilter, setGenreFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");

  useEffect(() => {
    let tempFilteredBooks = BOOKS;

    if (searchTerm) {
      tempFilteredBooks = tempFilteredBooks.filter((book) => {
        return (
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.genre.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    if (genreFilter) {
      tempFilteredBooks = tempFilteredBooks.filter((book) =>
        book.genre.toLowerCase().includes(genreFilter.toLowerCase())
      );
    }

    if (authorFilter) {
      tempFilteredBooks = tempFilteredBooks.filter((book) =>
        book.author.toLowerCase().includes(authorFilter.toLowerCase())
      );
    }

    if (yearFilter) {
      tempFilteredBooks = tempFilteredBooks.filter((book) => book.year === parseInt(yearFilter));
    }

    tempFilteredBooks.sort((a, b) => {
      const comparison = a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
      return sortOrder === "ascending" ? comparison : -comparison;
    });

    setFilteredBooks(tempFilteredBooks);
  }, [searchTerm, genreFilter, authorFilter, yearFilter, sortOrder]);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-center text-4xl font-extrabold text-indigo-600 py-6">Explore Books</h1>

      <div className="max-w-5xl mx-auto">
        {/* Search Bar */}
        <input
          type="search"
          placeholder="Search by Title, Author, or Genre"
          className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 mb-6"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Filters Section */}
        <div className="flex gap-6 justify-center mb-6 flex-wrap">
          <select
            className="p-3 rounded-lg bg-white shadow-md border w-full sm:w-60 focus:ring-2 focus:ring-indigo-500 transition duration-300"
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
          >
            <option value="">Filter by Genre</option>
            <option value="Fiction">Fiction</option>
            <option value="Romance">Romance</option>
            <option value="Dystopian">Dystopian</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Historical">Historical</option>
            <option value="Adventure">Adventure</option>
            <option value="Philosophical">Philosophical</option>
            <option value="Epic">Epic</option>
          </select>

          <select
            className="p-3 rounded-lg bg-white shadow-md border w-full sm:w-60 focus:ring-2 focus:ring-indigo-500 transition duration-300"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
          >
            <option value="">Filter by Author</option>
            {BOOKS.map((book) => (
              <option key={book.author} value={book.author}>
                {book.author}
              </option>
            ))}
          </select>

          <select
            className="p-3 rounded-lg bg-white shadow-md border w-full sm:w-60 focus:ring-2 focus:ring-indigo-500 transition duration-300"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <option value="">Filter by Year</option>
            {BOOKS.map((book) => (
              <option key={book.year} value={book.year}>
                {book.year}
              </option>
            ))}
          </select>

          <select
            className="p-3 rounded-lg bg-white shadow-md border w-full sm:w-60 focus:ring-2 focus:ring-indigo-500 transition duration-300"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="ascending">Sort Ascending</option>
            <option value="descending">Sort Descending</option>
          </select>
        </div>

        {/* Search Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {filteredBooks.map((book, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105"
            >
              <img
                src={book.cover}
                className="w-full h-64 object-cover rounded-md mb-4"
                alt={book.title}
              />
              <h2 className="text-xl font-semibold text-indigo-600">{book.title}</h2>
              <p className="text-gray-700">By {book.author}</p>
              <p className="text-gray-600">Genre: {book.genre}</p>
              <p className="text-gray-500">Year: {book.year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
