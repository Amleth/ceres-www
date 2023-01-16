const fs = require('fs')
const path = require('path')

const DIR = './src/data'
const folders = fs.readdirSync(DIR)

let config = {
  siteMetadata: {
    title: `Ceres Sorbonne`,
    siteUrl: `https://www.yourdomain.tld`,
    authors: [
      { id: `thomas`, name: `Thomas Bottini` },
      { id: `felix`, name: `Félix Alié` },
      { id: `edouard`, name: `Édouard Bouté` },
      { id: `ceres`, name: `L'équipe CERES` }
    ],
    pages: []
  },
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap", {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/icon.png"
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            // options: {
            //   wrapperStyle: `margin-bottom: 1.0725rem`,
            // },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-autolink-headers`
        ],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    },
  ],
};

folders.forEach(folder => {
  if(!folder.startsWith('_') && fs.statSync(path.join(DIR, folder)).isDirectory() && folder !== '.git' ){
    config.plugins.push({resolve: 'gatsby-source-filesystem', options: {name: folder.split('_')[1], path: path.join(DIR, folder)}})
    config.siteMetadata.pages.push(folder)
  }
})

module.exports = config