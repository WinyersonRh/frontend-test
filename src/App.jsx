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
const initialPosts = null;
const initialPage = 0;
const initialTech = null;
const initialScrollEnable = null;

function App() {
  // > Section
  const [section, setSection] = useState(initialSection);

  // > List of posts
  const [posts, setPosts] = useState(initialPosts);

  // > Page to call
  const [page, setPage] = useState(initialPage);

  // > Types of publications to call
  const [tech, setTech] = useState(initialTech);

  // > Disable/enable infinite scrolling for bugs
  const [isScrollEnable, setIsScrollEnable] = useState(initialScrollEnable);

  // > Fetch posts
  useEffect(() => {
    // If there isn't any tech for calling do nothing
    if (!tech) return;

    (async () => {
      try {
        const endpoint = `https://hn.algolia.com/api/v1/search_by_date?query=${tech}&page=${page}`;

        const res = await fetch(endpoint);
        let data = await res.json();

        // Delete posts without author, story_title, story_url or created_at
        data = data.hits.filter((post) => {
          if (!post.author || !post.story_title || !post.story_url || !post.created_at) return false;
          else return post;
        });

        // Break process if the data is empty
        if (!data || !data.length) return;

        // If there are existing publications we add more otherwise we add the first ones
        posts && posts.length ? setPosts([...posts, ...data]) : setPosts(data);

        // When we have the posts ready, we will reactivate infiniteScroll
        return setIsScrollEnable(true);
      } catch (error) {
        console.log(`Ha ocurrido un error con la peticion: ${error}`);
      }
    })();
  }, [tech, page]);

  return (
    <main>
      <Header />

      <Actions section={section} setSection={setSection} />

      <Select tech={tech} setTech={setTech} />

      <Articles section={section} posts={posts} tech={tech} />

      {((posts && posts.length) || tech) && (
        <Loader isScrollEnable={isScrollEnable} setIsScrollEnable={setIsScrollEnable} page={page} setPage={setPage} />
      )}
    </main>
  );
}

export default App;
