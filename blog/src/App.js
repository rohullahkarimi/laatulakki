import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
//import AllPosts from "./components/AllPosts.js";
//import OnePost from "./components/OnePost.js";

import Posts from "./app/website/archive/page.js";
import PostDefault from "./app/website/post/[slug]/page.js";

//  <Route component={AllPosts} path="/" exact />
//   <Route component={OnePost} path="/:slug" />
function App() {
  return (
    <BrowserRouter>
      <div>
        <Route component={Posts} path="/" exact />
        <Route component={PostDefault} path="/post/:slug" />
      </div>
    </BrowserRouter>
  );
}

export default App;
