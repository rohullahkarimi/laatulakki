import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Container from "../../../../components/container";
//import { notFound } from "next/navigation";
import { PortableText } from "../../../../lib/sanity/plugins/portabletext";
import { urlForImage } from "../../../../lib/sanity/image";
import { parseISO, format } from "date-fns";

import CategoryLabel from "../../../../components/blog/category";
import AuthorCard from "../../../../components/blog/authorCard";
import { MyLoader } from "../../../../utils/all";
import Footer from "../../../../components/footer";
import Navbar from "../../../../components/navbar";
import { dataset, projectId } from "../../../../lib/sanity/config";
import sanityClient  from "@sanity/client"; //from "next-sanity";
import CallToActionButton from "../../../../components/callToAction";
const client = sanityClient({
  projectId: projectId, // find this at manage.sanity.io, run `sanity init` to initialize
  dataset: dataset, // this is from when we answered those question from 'sanity init'
  useCdn: true,
});

function NotFound() {
  return (
   <MyLoader/>
 
  );
}

export default function Post(props) {
  const { loading, post } = props;
  const [imagesInBody, setImagesInBody] = useState([]);
  useEffect(() => {
    if (post.body) {
      const fetchImages = async () => {
        const images = [];

        for (const block of post.body) {
          if (block._type === "image" && block.asset && block.asset._ref) {
            try {
              const asset = await client.fetch(`*[_id == $id][0]`, { id: block.asset._ref });
              if (asset && asset.url) {
                images.push(asset.url);
              }
            } catch (error) {
              console.error("Error fetching asset:", error);
            }
          }
        }

        setImagesInBody(images);
      };

      fetchImages();
    }
  }, [post.body]);

  //console.log(props)
  const slug = post?.slug;

  if (!loading && !slug) {
    //notFound();
    return <Route component={NotFound} />
  }

  const imageProps = post?.mainImage
    ? urlForImage(post?.mainImage)
    : null;

  const AuthorimageProps = post?.author?.image
    ? urlForImage(post.author.image)
    : null;
  



  const filteredBlocks = post.body

  return (
    <>
      <Navbar/>
      <Container className="!pt-0">
        <div className="mx-auto max-w-screen-md ">
          <div className="flex justify-center">
            <CategoryLabel categories={post.categories} />
          </div>

          <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
            {post.title}
          </h1>

          <div className="mt-3 flex justify-center space-x-3 text-gray-500 ">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 flex-shrink-0">
                {AuthorimageProps && (
                  <a href={`/author/${post.author.slug.current}`}>
                    <img
                      src={AuthorimageProps.src}
                      alt={"Laatulakki_"+ post?.author?.name}
                      className="rounded-full object-cover"
                      fill="true"
                      sizes="40px"
                    />
                  </a>
                )}
              </div>
              <div>
                <p className="text-gray-800 dark:text-gray-400">
                  <a href={`/author/${post?.author?.slug.current}`}>
                    {post.author?.name}
                  </a>
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <time
                    className="text-gray-500 dark:text-gray-400"
                    dateTime={post?.publishedAt || post._createdAt}>
                    {format(
                      parseISO(post?.publishedAt || post._createdAt),
                      "MMMM dd, yyyy"
                    )}
                  </time>
                  <span>· {post.estReadingTime || "5"} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="relative z-0 mx-auto aspect-video max-w-screen-lg overflow-hidden lg:rounded-lg">
        {imageProps && (
          <img
            src={imageProps.src}
            alt={post.mainImage?.alt || "Thumbnail"}
            loading="eager"
            fill="true"
            sizes="100vw"
            className="object-cover"
          />
        )}
      </div>

      <Container>
        <article className="mx-auto max-w-screen-md ">

          

         
          <div className="prose mx-auto my-3 dark:prose-invert prose-a:text-blue-600">
            {filteredBlocks.map((block, index) => {
              if (block._type === "image") {
                return (
                  <div key={index}>
                  {imagesInBody.map((imageUrl, index) => (
                    <img key={index} src={imageUrl} alt={`laatulakki ${index}`} />
                  ))}
                  </div>
                );
              } else {
                return <PortableText key={index} blocks={[block]} projectId={projectId} dataset={dataset} />;
              }
            })}
          </div>

          <div className="mb-7 mt-7 flex justify-center">
            <a
              href="/"
              className="bg-brand-secondary/20 rounded-full px-5 py-2 text-sm text-blue-600 dark:text-blue-500 ">
              ← Näytä kaikki artikkelit
            </a>
          </div>

          <CallToActionButton/>


          {post.author && <AuthorCard author={post.author} />}
        </article>
        <Footer/>
      </Container>
    </>
  );
}

/*
const MainImage = ({ image }) => {
  return (
    <div className="mb-12 mt-12 ">
      <img {...urlForImage(image)} alt={image.alt || "Thumbnail"} />
      <figcaption className="text-center ">
        {image.caption && (
          <span className="text-sm italic text-gray-600 dark:text-gray-400">
            {image.caption}
          </span>
        )}
      </figcaption>
    </div>
  );
};
*/
