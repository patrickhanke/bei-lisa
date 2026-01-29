import type { GatsbyConfig } from 'gatsby';
import { bei_lisa_schema } from './constants/bei_lisa_schema';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Haarstudio Bi Lisa`,
    description: `Ihr Friseursalon in Freiburg St. Georgen`,
    author: `@PH`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
        ignore: [`**/\.*`]
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/bei_lisa_square.png`,
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
          alias: {
              "@ui": "src/ui/index.ts",
              "@content": "src/content/index.ts",
              "@components": "src/components/index.ts",
              "@provider": "src/provider/index.ts",
              "@settings": "src/settings/index.ts",
              "@styles": "src/styles/index.ts",
              "@types": "src/types/index.ts"
          },
          extensions: ["ts"]
      }
    },
    {
      resolve: `gatsby-source-patstore`,
      options: {
          projectId: process.env.GATSBY_PATSTORE_PROJECT_ID,
          uri: process.env.GATSBY_PATSTORE_GRAPHQL_API_URL,
          appId: process.env.GATSBY_PATSTORE_APP_ID,
          restKey: process.env.GATSBY_PATSTORE_REST_KEY,
          masterKey: process.env.GATSBY_PATSTORE_MASTER_KEY,
          schemaArray: bei_lisa_schema
      }
    }
  ],
};

export default config;
