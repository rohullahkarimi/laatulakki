import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import client from "../client";
import { format } from "date-fns";
import Post from "./archive.js";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"] {
          title,
          slug,
          body,
          publishedAt,
          mainImage {
            asset -> {
              _id,
              url
            },
            alt,
          }
        } | order(publishedAt desc)`
      )
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);

  return (
    <section>
      <Post posts={posts} />
    </section>
  );
}
