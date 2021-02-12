module.exports = {
  siteMetadata: require('./content/settings.json'),
  plugins: [
    {
      resolve: 'gatsby-plugin-web-vitals',
      options: {
        // The Google Analytics property ID; the reporting code won't be generated without it
        // trackingId: 'YOUR_GOOGLE_ANALYTICS_TRACKING_ID',
        // An array with metrics you want to track and send to analytics
        metrics: [`FID`, `TTFB`, `LCP`, `CLS`, `FCP`],
        // Event Category (optional) { string }, default 'Web Vitals'
        // eventCategory: 'Performance',
        // Include Web Vitals tracking in development
        // Defaults to false meaning Vitals will only be tracked in production.
        includeInDevelopment: true,
        // Prints metrics in the console when true
        debug: true,
      }
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-remark-images`,
    // required here so frontmatter stuff works
    {
      resolve: `gatsby-plugin-netlify-cms-paths`,
      options: {
        cmsConfig: `/static/admin/config.yml`,
      }
    }, 
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [ 
          // required here so body stuff works
          {
            resolve: `gatsby-plugin-netlify-cms-paths`,
            options: {
              cmsConfig: `/static/admin/config.yml`,
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              backgroundColor: 'transparent', // required to display blurred image first
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `uploads`,
        path: `${__dirname}/static/assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `people`,
        path: `${__dirname}/content/people`,
      },
    },


    /*
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          // Including in your Remark plugins will transform any paths in your markdown body
          {
            resolve: `gatsby-plugin-netlify-cms-paths`,
            options: {
              cmsConfig: `/static/admin/config.yml`,
            }
          }, 
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1200,
              backgroundColor: 'transparent', // required to display blurred image first
              
            },
          },
        ],
      }
    },
    */
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`, // for custom preview in the Netlify CMS,
        customizeWebpackConfig: (config, { plugins }) => {
          config.node = {
            ...config.node,
            fs: "empty",
            child_process: "empty",
            module: "empty",
          };
          config.plugins.push(
            plugins.define({
              __MANIFEST_PLUGIN_HAS_LOCALISATION__: JSON.stringify('false'),
            }),
          );
        },
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-catch-links`,
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-12345678",
        includeInDevelopment: true,
        defaultDataLayer: { platform: "gatsby" },
        routeChangeEventName: "RouteChange",
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Courgette",
              variants: ["400"],
            },
            {
              family: "Itim",
              variants: ["400"],
            },
            {
              family: "Crete Round",
              variants: ["400", "400i"]
            },
            {
              family: "Open Sans",
              variants: ["400", "400i", "700"]
            }

          ]
        }
      }
    },
  ],
  mapping: {
    'mdx.frontmatter.thumbnail': `imageSharp.original.src`
  },
}
