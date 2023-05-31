// TITLE: LIBRARIES
import { useEffect, useState } from "react";

// TITLE: LAYOUTS
import Header from "./layouts/Header";

// TITLE: COMPONENTS
import Actions from "./components/Actions";
import Articles from "./components/Articles";
import Loader from "./components/Loader";
import Select from "./components/Select";

// TITLE: INITIAL STATES
const initialSection = "all";

function App() {
  // > Section
  const [section, setSection] = useState(initialSection);

  // > List of posts
  const [posts, setPosts] = useState(null);

  // > Types of publications to call
  const [page, setPage] = useState(0);
  const [postToCall, setPostToCall] = useState(null);

  // > Disable/enable infinite scrolling for bugs
  const [isScrollEnable, setIsScrollEnable] = useState(null);

  // > Fetch posts
  useEffect(() => {
    if (!postToCall) return;

    (async () => {
      try {
        const endpoint = `https://hn.algolia.com/api/v1/search_by_date?query=${postToCall}&page=${page}`;

        const res = await fetch(endpoint);
        let data = await res.json();

        data = data.hits.filter((post) => {
          if (!post.author || !post.story_title || !post.story_url || !post.created_at) return false;
          else return post;
        });

        if (!data || !data.length) return;

        if (posts && posts.length) setPosts([...posts, ...data]);
        else setPosts(data);

        return setIsScrollEnable(true);
      } catch (error) {
        console.log(`Ha ocurrido un error con la peticion: ${error}`);
      }
    })();
  }, [postToCall, page]);

  return (
    <main>
      <Header />

      <Actions section={section} setSection={setSection} />

      <Select postToCall={postToCall} setPostToCall={setPostToCall} />

      <Articles section={section} posts={posts} postToCall={postToCall} />

      {((posts && posts.length) || postToCall) && (
        <Loader isScrollEnable={isScrollEnable} setIsScrollEnable={setIsScrollEnable} page={page} setPage={setPage} />
      )}
    </main>
  );
}

export default App;
