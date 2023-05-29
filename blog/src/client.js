import sanityClient from "@sanity/client";

const clientSanity = sanityClient({
  projectId: "dl8tt1w0",
  dataset: "production",
  useCdn: true,
});

export default clientSanity;