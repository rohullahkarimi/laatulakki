//import { groq } from "next-sanity";

// Get all posts
export const postquery = `
*[_type == "post"] | order(publishedAt desc, _createdAt desc) {
  _id,
  _createdAt,
  publishedAt,
  mainImage {
    ...,
    "blurDataURL":asset->metadata.lqip,
    "ImageColor": asset->metadata.palette.dominant.background,
  },
  featured,
  excerpt,
  slug,
  title,
  author-> {
    _id,
    image,
    slug,
    name
  },
  categories[]->,
}
`;


// Get all posts with 0..limit
export const limitquery = `
*[_type == "post"] | order(publishedAt desc, _createdAt desc) [0..$limit] {
  ...,
  author->,
  categories[]->
}
`;

// [(($pageIndex - 1) * 10)...$pageIndex * 10]{
// Get subsequent paginated posts
export const paginatedquery = `
*[_type == "post"] | order(publishedAt desc, _createdAt desc) [$pageIndex...$limit] {
  ...,
  author->,
  categories[]->
}
`;

// Get Site Config
export const configQuery = `
*[_type == "settings"][0] {
  ...,
}
`;

export function getSinglePostQuery(slug) {
  return `*[_type == "post" && slug.current == "${slug}"][0] {
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
    "estReadingTime": round(length(pt::text(body)) / 5 / 180 ),
    "related": *[_type == "post" && count(categories[@._ref in ^.^.categories[]._ref]) > 0 ] | order(publishedAt desc, _createdAt desc) [0...5] {
      title,
      slug,
      "date": coalesce(publishedAt, _createdAt),
      "image": mainImage
    }
  }`;
}

// Single Post
export const singlequery = `
*[_type == "post" && slug.current == $slug][0] {
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
  "estReadingTime": round(length(pt::text(body)) / 5 / 180 ),
  "related": *[_type == "post" && count(categories[@._ref in ^.^.categories[]._ref]) > 0 ] | order(publishedAt desc, _createdAt desc) [0...5] {
    title,
    slug,
    "date": coalesce(publishedAt,_createdAt),
    "image": mainImage
  },
}
`;

// Paths for generateStaticParams
export const pathquery = `
*[_type == "post" && defined(slug.current)][].slug.current
`;
export const catpathquery = `
*[_type == "category" && defined(slug.current)][].slug.current
`;
export const authorsquery = `
*[_type == "author" && defined(slug.current)][].slug.current
`;

// Get Posts by Authors
export const postsbyauthorquery = `
*[_type == "post" && $slug match author->slug.current ] {
  ...,
  author->,
  categories[]->,
}
`;

// Get Posts by Category
export const postsbycatquery = `
*[_type == "post" && $slug in categories[]->slug.current ] {
  ...,
  author->,
  categories[]->,
}
`;

// Get top 5 categories
export const catquery = `*[_type == "category"] {
  ...,
  "count": count(*[_type == "post" && references(^._id)])
} | order(count desc) [0...5]`;

export const searchquery = `*[_type == "post" && _score > 0]
| score(title match $query || excerpt match $query || pt::text(body) match $query)
| order(_score desc)
{
  _score,
  _id,
  _createdAt,
  mainImage,
  author->,
  categories[]->,
   title,
   slug
}`;

// Get all Authors
export const allauthorsquery = `
*[_type == "author"] {
 ...,
 'slug': slug.current,
}
`;

// get everything from sanity
// to test connection
export const getAll = `*[]`;
