import React, { ReactNode } from "react";
import { useStaticQuery, graphql } from "gatsby";
import "./layout.css";
import "../fonts/fonts.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default Layout;
