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

    const query = `*[_type == "post" && slug.current == "${slug}"][0] {
        ...,
        body[]{
          ...,
          markDefs[]{
            ...,
            _type == "internalLink" => {
              "slug": @.reference->slug
            }
          }
      },
      author->,
      categories[]->,
      "name": author->name,
      "authorImage": author->image
    }`;

    clientSanity
      .fetch(query)
      .then((data) => setPost(data))
      .catch(console.error);
  }, [slug]);

  return <PostPage post={post} />;
}


// export const revalidate = 60;
