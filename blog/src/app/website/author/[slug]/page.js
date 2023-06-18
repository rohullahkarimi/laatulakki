import React, { useEffect, useState } from "react";
import PostPage from "./default";
import { useParams } from "react-router-dom";

import { getAllPostsSlugs, getPostBySlug } from "../../../../lib/sanity/client";
import clientSanity from "../../../../client.js"

export async function generateStaticParams() {
  return await getAllPostsSlugs();
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  console.log(post)
  return { title: post.title };
}



export default function PostDefault() {
  const { slug } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {

    const query = `
    *[_type == "author" && slug.current == "${slug}"] {
      ...,
      'slug': slug.current,
    }
  `;

    clientSanity
      .fetch(query )
      .then((data) => setPost(data))
      .catch(console.error);
  }, [slug]);

  

  return <PostPage author={post} />;
}


// export const revalidate = 60;
