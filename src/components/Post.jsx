// TITLE: LIBRARIES
import "../styles/post.css";

// TITLE: COMPONENTS

// TITLE: INITIAL STATES

export default function Post({ data, section, inFavorites, storeFavorites }) {
  // If the section is favorites and the post is not in favorites, do not render
  if (section === "my-faves" && !inFavorites) return;

  // Destructuring of necessary data
  const { objectID, author, story_title, story_url, created_at } = data;

  // Get "timeago" of posts
  const getTimeAgo = (date) => {
    const days = new Date(date).getDate(date);
    const hours = new Date(date).getHours(date);
    const minutes = new Date(date).getMinutes(date);
    const seconds = new Date(date).getSeconds(date);

    // "Timeago" message by default but editable
    let timeago = "More than a month ago";

    if (days > 27 && days <= 31) timeago = "One month ago";
    else if (days >= 1 && days <= 27) timeago = `${days} days ago`;
    else if (hours >= 1 && hours <= 24) timeago = `${hours} hours ago`;
    else if (minutes >= 1 && minutes <= 60) timeago = `${minutes} minutes ago`;
    else if (seconds >= 1 && seconds <= 60) timeago = `${seconds} seconds ago`;
    else timeago = "Moments ago";

    return timeago;
  };

  return (
    <article className="post-container">
      <a href={story_url} target="_blank" className="post-link">
        <div className="post-timeago">
          <img src="/svg/iconmonstr-time-2.svg" alt="time" />
          <span>{`${getTimeAgo(created_at)} by ${author}`}</span>
        </div>

        <p>{story_title}</p>
      </a>

      <button onClick={(e) => storeFavorites(objectID)} className="post-button">
        <img src={inFavorites(objectID)} alt="heart" />
      </button>
    </article>
  );
}
