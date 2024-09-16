// import { allProjects } from "contentlayer/generated";

// export async function getServerSideProps({ res }) {
//     const projects = allProjects;
   
//     // Generate the XML sitemap with the blog data
//     const sitemap = generateSiteMap(projects);
   
//     res.setHeader("Content-Type", "text/xml");
//     // Send the XML to the browser
//     res.write(sitemap);
//     res.end();
   
//     return {
//       props: {},
//     };
//   }

//   function generateSiteMap(posts) {
//       let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
//       <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//       <!-- Add the static URLs manually -->
//      <url>
//        <loc>${URL}</loc>
//      </url>
//      <url>
//        <loc>${URL}/projects</loc>
//      </url>
//       <url>
//        <loc>${URL}/contact</loc>
//      </url>`;

//       posts.forEach(post => {
//           sitemap += `
//           <url>
//               <loc>${`${URL}/projects/${post.slug}`}</loc>
//               <lastmod>${post.published}</lastmod>
//               <changefreq>daily</changefreq>
//               <priority>0.7</priority>
//           </url>`;
//       });

//       sitemap += `</urlset>`;
//       return sitemap;
//   }
  
   
//   export default function SiteMap() {}

// app/sitemap.js
 
import { allProjects } from "contentlayer/generated";

const URL = "https://davidemarcoli.dev";
 
export default async function sitemap() {
  const posts = allProjects.map((project) => ({
    url: `${URL}/projects/${project.slug}`,
    lastModified: project.date,
  }));
 
  const routes = ["", "/projects", "/contact"].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));
 
  return [...routes, ...posts];
}