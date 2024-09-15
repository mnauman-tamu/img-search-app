import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import Images from "./components/Images";
import { fetchData } from "./api";

function App() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [imagesCount, setImagesCount] = useState(-1); //-1 is used as the initial value

  const fetchImages = async (query: string) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchData(
        `3/gallery/search/?q=${query}`
      );
      setImages(data.data);
      query === "" ? setImagesCount(-1) : setImagesCount(data.data.length);
    } catch (err) {
      setError("Failed to fetch images");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    fetchImages(query);
  };

  return (
    <>
      <div className="app">
        <header className="text-white p-4">
          <h1 className="text-center text-2xl">Image Search App</h1>
          <p>Powered by Imgur</p>
        </header>
        <main className="p-4">
          <SearchBar onSearch={handleSearch} />
          {loading && <div className="skeleton h-72 w-72" />}
          {error && <div className="error">{error}</div>}
          {!loading && !error && <Images images={images} />}
          {imagesCount === 0 && <p>No results found</p>}
        </main>
      </div>
    </>
  );
}

export default App;
