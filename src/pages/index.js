import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import kebabCase from "lodash/kebabCase"
import Banner from "../components/banner"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <>
        <Layout location={location} title={siteTitle}>
          <Seo title="All posts" />
          <Bio />
          <p>No blog posts found.</p>
        </Layout>
      </>
    )
  }

  return (
    <>
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <div className="layout">
          <div className="tags">
            {" "}
            <h1 className="main-heading">Tags</h1>
            <ul className="tag-list">
              {data.allMarkdownRemark.group.map(tag => (
                <li key={tag.fieldValue}>
                  <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                    {tag.fieldValue} ({tag.totalCount})
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <Link to="/gallery">
                <h1> Image Gallery</h1>
              </Link>
            </div>
            <Banner
              className="adsbygoogle"
              style={{ display: "block" }}
              slot="6410762425"
              format="auto"
              responsive="true"
            />
          </div>
          <main>
            <h1 className="main-heading">Recent Posts</h1>
            <ol style={{ listStyle: `none` }}>
              {posts.slice(0, 5).map(post => {
                const title = post.frontmatter.title || post.fields.slug

                return (
                  <li key={post.fields.slug}>
                    <article
                      className="post-list-item"
                      itemScope
                      itemType="http://schema.org/Article"
                    >
                      <header>
                        <h2>
                          <Link to={post.fields.slug} itemProp="url">
                            <span itemProp="headline">{title}</span>
                          </Link>
                        </h2>
                        <small>{post.frontmatter.date}</small>
                      </header>
                      <section>
                        <p
                          dangerouslySetInnerHTML={{
                            __html:
                              post.frontmatter.description || post.excerpt,
                          }}
                          itemProp="description"
                        />
                      </section>
                      <div
                        style={{
                          margin: "10px",
                        }}
                      >
                        {" "}
                        &#123;
                        {post.frontmatter.tags.map(tag => (
                          <Link key={tag} to={`/tags/${kebabCase(tag)}/`}>
                            <button
                              style={{
                                backgroundColor: "#f5f5f5",
                                border: "none",
                                color: "#000",
                                padding: "5px 10px",
                                textAlign: "center",
                                textDecoration: "none",
                                display: "inline-block",
                                fontSize: "16px",
                                margin: "4px 2px",
                                cursor: "pointer",
                                borderRadius: "5px",
                              }}
                            >
                              {tag}
                            </button>
                          </Link>
                        ))}
                        &#125;
                      </div>
                    </article>
                  </li>
                )
              })}
            </ol>
          </main>
        </div>
        <div>
          <h2 style={{ textAlign: "center" }}>
            <span itemProp="headline">
              <Link to="/tags/">All tags</Link>
            </span>
          </h2>
        </div>
        <div className="gallery-link">
          <h2 style={{ textAlign: "center" }}>
            <span itemProp="headline">
              <Link to="/gallery/">Image Gallery</Link>
            </span>
          </h2>
        </div>
      </Layout>
    </>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        }
      }
    }
  }
`
