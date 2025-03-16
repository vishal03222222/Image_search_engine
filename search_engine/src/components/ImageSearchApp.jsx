
// import React, { useState } from "react";
// import "./ImageSearchApp.css";

// const ImageSearchApp = () => {
//   const accessKey = "xfHagP0SZyySBvsb6hjF6GkZEqIkSzL49koWS4XhRY0";
//   const [query, setQuery] = useState("");
//   const [images, setImages] = useState([]);
//   const [page, setPage] = useState(1);
//   const [showMore, setShowMore] = useState(false);
//   const [error, setError] = useState("");

//   const searchImages = async (e) => {
//     e.preventDefault();
//     setPage(1);
//     setError("");
//     try {
//       const url = `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${accessKey}`;
//       const response = await fetch(url);
//       const data = await response.json();
//       if (data.results.length === 0) {
//         setError("No images found. Please try another search.");
//       } else {
//         setImages(data.results.slice(0, 27));
//         setShowMore(true);
     
//       }
//     } catch (err) {
//       setError("An error occurred while fetching images. Please try again.");
//     }
//   };

//   const loadMoreImages = async () => {
//     const newPage = page + 1;
//     setPage(newPage);
//     try {
//       const url = `https://api.unsplash.com/search/photos?page=${newPage}&query=${query}&client_id=${accessKey}`;
//       const response = await fetch(url);
//       const data = await response.json();
//       if (data.results.length === 0) {
//         setError("No more images available.");
//       } else {
//         setImages((prevImages) => {
//           const newImages = [...prevImages, ...data.results.slice(0, 27 - prevImages.length)];
//           setShowMore(newImages.length < 27);
//           return newImages;
//         });
//       }
//     } catch (err) {
//       setError("An error occurred while loading more images.");
//     }
//   };

//   return (
//     <div className="container full-screen">
//       <h2 className="title">Image Search Engine</h2>
//       <form onSubmit={searchImages} className="search-form">
//         <input
//         style={{marginTop:"20px"}}
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search to get images"
//           className="search-box"
//         />
//         <button 
//         style={{marginTop:"20px"}}
//         type="submit" className="search-button">Search</button>
//       </form>
//       {error && <p className="error-message">{error}</p>}
//       <div className="image-grid grid">
//         {images.map((image) => (
//           <a key={image.id} href={image.links.html} target="_blank" rel="noopener noreferrer">
//             <img src={image.urls.small} alt={image.alt_description || "Image not available"} className="image full-screen-image" />
//           </a>
//         ))}
//       </div>
//      <div>
  
//      {showMore && (
//          <button onClick={loadMoreImages} className="show-more">Show More</button>
//     )}
   
//      </div>
//     </div>
//   );
// };

// export default ImageSearchApp;
import React, { useState } from "react";
import "./ImageSearchApp.css";

const ImageSearchApp = () => {
  const accessKey = "xfHagP0SZyySBvsb6hjF6GkZEqIkSzL49koWS4XhRY0";
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState("");

  const searchImages = async (e) => {
    e.preventDefault();
    setPage(1);
    setError("");
    setImages([]); // Clear previous results on new search
    try {
      const url = `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${accessKey}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length === 0) {
        setError("No images found. Please try another search.");
      } else {
        setImages(data.results.slice(0, 27));
        setShowMore(true);
      }
    } catch (err) {
      setError("An error occurred while fetching images. Please try again.");
    }
  };

  const loadMoreImages = async () => {
    const newPage = page + 1;
    setPage(newPage);
    try {
      const url = `https://api.unsplash.com/search/photos?page=${newPage}&query=${query}&client_id=${accessKey}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length === 0) {
        setError("No more images available.");
      } else {
        setImages((prevImages) => [...prevImages, ...data.results.slice(0, 27)]);
        setShowMore(data.results.length > 0);
      }
    } catch (err) {
      setError("An error occurred while loading more images.");
    }
  };

  return (
    <div className="container full-screen">
      <h2 className="title">Image Search Engine</h2>
      <form onSubmit={searchImages} className="search-form">
        <input
          style={{ marginTop: "20px" }}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search to get images"
          className="search-box"
        />
        <button 
          style={{ marginTop: "20px" }}
          type="submit" 
          className="search-button"
        >Search</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <div className="image-grid grid">
        {images.map((image) => (
          <a key={image.id} href={image.links.html} target="_blank" rel="noopener noreferrer">
            <img src={image.urls.small} alt={image.alt_description || "Image not available"} className="image full-screen-image" />
          </a>
        ))}
      </div>
      <div>
        {showMore && (
          <button onClick={loadMoreImages} className="show-more">Show More</button>
        )}
      </div>
    </div>
  );
};

export default ImageSearchApp;