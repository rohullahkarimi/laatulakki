import { createClient }  from "@sanity/client";

const clientSanity = createClient({
  projectId: "dl8tt1w0",
  dataset: "production",
  useCdn: true,
});

export default clientSanity;