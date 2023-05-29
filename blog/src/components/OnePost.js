import React, { useState, useEffect } from "react";
import client from "../client";
import { Link, useParams } from "react-router-dom";
import BlockContent from "@sanity/block-content-to-react";
import { format } from "date-fns";

export default function SingleBlogPost() {
  const [singlePost, setSinglePost] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    client
      .fetch(
        `*[slug.current == "${slug}"] {
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
          },
          "name": author->name,
        }`
      )
      .then((data) => setSinglePost(data[0]))
      .catch(console.error);
  }, [slug]);

  return (
    <>
      <section>
        <h1>{singlePost.title}</h1>
        <div>
          {/* Check for whether a preview image exists and display it if it does */}
          {singlePost.mainImage && singlePost.mainImage.asset && (
            <img src={singlePost.mainImage.asset.url} alt={singlePost.title} />
          )}
          {/* Published At Date, formatted using `date-fns` in the format Day/Month/Year */}
          {singlePost.publishedAt && (
            <small>
              By {singlePost.name} on{" "}
              {format(new Date(singlePost.publishedAt), "dd MMMM yyyy")}
            </small>
          )}
          {/* Display your blog content - text, images, heading, links */}
          <BlockContent
            blocks={singlePost.body}
            projectId="9bnraqna"
            dataset="production"
          />
          {/* Link back to your main blog post page */}
          <Link to="/blog">Read More Articles</Link>
        </div>
      </section>
    </>
  );
}
