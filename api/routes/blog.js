const { createClient } = require('@sanity/client');
const router = require('express').Router();

const clientSanity = createClient({
    projectId: 'dl8tt1w0',
    dataset: 'production',
    useCdn: true,
});

// GET ALL Setting
router.get('/', async (req, res) => {
    try {
        const data = await clientSanity.fetch(
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
                    alt
                }
            } | order(publishedAt desc)`
        );

        const filteredBlogs = data
            .filter(blog => blog.title.includes('?'))
            .map(blog => {
                // Extract plain text from the body
                const plainTextBody = blog.body.reduce((acc, block) => {
                    if (block._type === 'block' && block.children) {
                        acc += block.children.map(child => child.text).join(' ');
                    }
                    return acc;
                }, '');

                return {
                    title: blog.title,
                    id: blog.slug.current,
                    body: plainTextBody,
                };
            });

        res.status(200).json(filteredBlogs);
    } catch (err) {
        console.error('Error fetching data from Sanity:', err);
        res.status(500).json({ error: 'Failed to fetch data from Sanity' });
    }
});

module.exports = router;
