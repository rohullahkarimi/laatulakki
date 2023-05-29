import React from "react";
//import { Link } from "react-router-dom";
import BlockContent from "@sanity/block-content-to-react";
import { urlForImage } from "../image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import getVideoId from "get-video-id";
import { cx } from "../../../utils/all";

// Barebones lazy-loaded image component
const ImageComponent = ({ value }) => {
  return (
    <img
      src={urlForImage(value)}
      alt={value?.alt || "Image"}
      loading="lazy"
      className="object-cover"
      sizes="(max-width: 800px) 100vw, 800px"
    />
  );
};

const PortableTextTable = ({ value }) => {
  const [head, ...rows] = value.table.rows;

  return (
    <table>
      {head.cells.filter(Boolean).length > 0 && (
        <thead>
          <tr>
            {head.cells.map((cell, index) => (
              <th key={index}>{cell}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {row.cells.map((cell, index) => {
              return <td key={index}>{cell}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Code = ({ value }) => {
  return (
    <SyntaxHighlighter language={value.language || "bash"} style={materialLight}>
      {value.code}
    </SyntaxHighlighter>
  );
};

const IframePreview = ({ value }) => {
  const { url, height } = value;
  if (!url) {
    return <p>Missing Embed URL</p>;
  }
  const { id, service } = getVideoId(url);

  const isYoutubeVideo = id && service === "youtube";

  const finalURL = isYoutubeVideo
    ? `https://www.youtube-nocookie.com/embed/${id}`
    : url;

  return (
    <iframe
      title="laatulakki"
      src={finalURL}
      width="100%"
      height={height || "350"}
      className={cx(!height && "aspect-video", "rounded-md")}
      frameBorder="0"
      allowFullScreen
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
    />
  );
};

const components = {
  types: {
    image: ImageComponent,
    code: Code,
    embed: IframePreview,
    tables: PortableTextTable,
  },
  marks: {
    center: props => <div className="text-center">{props.children}</div>,
    highlight: props => (
      <span className="font-bold text-blue-500">{props.children}</span>
    ),
    link: ({ children, mark }) => {
      const rel = !mark.href.startsWith("/") ? "noopener" : undefined;
      const target = !mark.href.startsWith("/") ? "_blank" : undefined;
      return (
        <a href={mark.href} rel={rel} target={target}>
          {children}
        </a>
      );
    },
    internalLink: ({ children, mark }) => {
      return <a href={`/post/${mark.slug.current}`}>{children}</a>;
    },
  },
};

export const PortableText = ({blocks}) => {
  //console.log(blocks)
  return <BlockContent blocks={blocks} serializers={components} />
}
