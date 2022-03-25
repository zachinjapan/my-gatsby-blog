import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import kebabCase from "lodash/kebabCase"
import ad1 from "../images/ad1.jpg"
import ad2 from "../images/ad2.png"
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
              <hr
                style={{
                  border: "1px solid #ccc",
                  width: "100%",
                  margin: "0 auto",
                }}
              ></hr>
              <Link to="/gallery">
                <h1 className="main-heading"> Image Gallery</h1>
              </Link>
              <hr
                style={{
                  border: "1px solid #ccc",
                  width: "100%",
                  margin: "0 auto",
                }}
              ></hr>
              <a href="https://hakujobs.com/" target={"_blank"}>
                <img
                  src={ad1}
                  alt="ad1"
                  style={{
                    width: "100%",
                    height: "auto",
                    border: "solid 1px black",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                />
              </a>
              <hr
                style={{
                  border: "1px solid #ccc",
                  width: "100%",
                  margin: "0 auto",
                }}
              ></hr>
              <a
                href="https://my-anime-collection.herokuapp.com/landing"
                target={"_blank"}
              >
                <img
                  src={ad2}
                  alt="ad"
                  style={{
                    width: "100%",
                    height: "auto",
                    border: "solid 1px black",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                />
              </a>
              <hr
                style={{
                  border: "1px solid #ccc",
                  width: "100%",
                  margin: "0 auto",
                }}
              ></hr>
            </div>
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
