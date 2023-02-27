import { Outlet, LiveReload, Link, Links, Meta } from "@remix-run/react";
import globalStylesUrl from "~/styles/global.css";

export const links = () => [{rel: 'stylesheet', href: globalStylesUrl}];

export const meta = () => {
  const description = 'A blog built with Remix';
  const keywords = 'remix,react,react-router,react-query';
  return {
    description,
    keywords,
  }
};

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

function Document({children, title}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>{title ? title : 'Remix Blog'}</title>
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === "development" ? <LiveReload />:null}
      </body>
    </html>
  );
}

function Layout({children}) {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className = "logo">
          Y43 Lite
        </Link>
        <ul className="nav">
          <li>
            <Link to = "/customers">Customers</Link>
          </li>
        </ul>
      </nav>
      
      <div className="container">
        {children}
      </div>
    </>
  );
}


export function ErrorBoundary({error}) {
  console.log(error)
  return (
      <Document>
        <Layout>
          <h1>Something went wrong</h1>
          <p>{error.message}</p>
        </Layout>
      </Document>
  )
}