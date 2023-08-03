
require('ignore-styles').default(['.sass', '.scss', 'css']);


require("babel-register")({
    presets: ["es2015", "react"]
});

const router = require('./src/Routes').default;
const Sitemap = require('react-router-sitemap').default;



(
    new Sitemap(router)
        .build('https://www.laatulakki.fi')
        .save('./public/sitemap.xml')
);

