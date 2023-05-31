// TITLE: LIBRARIES
import { useEffect, useState } from "react";
import "../styles/articles.css";

// TITLE: COMPONENTS
import Post from "./Post";

// TITLE: INITIAL STATES
const initialFavorites = [];

export default function Articles({ section, posts, tech }) {
  // > List of Favorites
  const [favorites, setFavorites] = useState(initialFavorites);

  // List of Favorites in Local Storage
  const storedFavorites = window.localStorage.getItem("my-faves");

  const storeFavorites = (postId) => {
    // Get list of favorites or create a new empty list
    let favoritesList = JSON.parse(storedFavorites) || [];

    // Filter favorite list for delete id existents or added a new id
    if (favoritesList.includes(postId)) {
      favoritesList = favoritesList.filter((id) => (id === postId ? false : id));
    } else favoritesList.push(postId);

    // Store a new favorite post in Local Storage and set state of favorites
    window.localStorage.setItem("my-faves", JSON.stringify(favoritesList));
    setFavorites(favoritesList);
  };

  // Verify post's id is on the list of favorites and return svg corresponding
  const inFavorites = (postId) => {
    const heartFill = "/svg/iconmonstr-favorite-3.svg";
    const heartOutline = "/svg/iconmonstr-favorite-2.svg";

    // If the "storedFavorites" contain this post, return the corresponding "svg"
    return favorites && favorites.includes(postId) ? heartFill : heartOutline;
  };

  useEffect(() => {
    // Get favorites or set an empty favorites list
    if (storedFavorites && storedFavorites.length) setFavorites(JSON.parse(storedFavorites));
  }, []);

  return (
    <section className="posts-container">
      {posts &&
        posts.map((data) => {
          // If the section is favorites and this publication is in the local storage list we render it.
          if (section === "my-faves" && inFavorites(data.objectID) === "/svg/iconmonstr-favorite-2.svg") return;

          return (
            <Post
              key={data.objectID}
              data={data}
              section={section}
              inFavorites={inFavorites}
              storeFavorites={storeFavorites}
            />
          );
        })}
      {/* If there are no posts or search technology, we display this message */}
      {!posts && !tech && <h3 className="empty-message">You do not have any post</h3>}
    </section>
  );
}
