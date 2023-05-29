import React from "react";
import Archive from "./archive";

import { getPaginatedPosts } from "../../../lib/sanity/client";

const POSTS_PER_PAGE = 6;

export default function ArchivePage() {
  const posts = getPaginatedPosts(POSTS_PER_PAGE);
  return <Archive posts={posts} />;
}

// export const revalidate = 60;
