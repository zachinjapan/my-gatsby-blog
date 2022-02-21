import { graphql, Link } from "gatsby"
import * as React from "react"
import { IGatsbyImageData } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Gallery from "@browniebroke/gatsby-image-gallery"

interface ImageSharpEdge {
  node: {
    childImageSharp: {
      thumb: IGatsbyImageData
      full: IGatsbyImageData
    }
  }
}

interface PageProps {
  data: {
    images: {
      edges: ImageSharpEdge[]
    }
  }
}

const gallery: React.FC<PageProps> = ({ data }) => {
  const images = data.images.edges.map(({ node }, index) => ({
    ...node.childImageSharp,
    // Generate name based on the index as caption.
    caption: `Image ${index}`,
  }))

  // Override some of Lightbox options to localise labels in French
  const lightboxOptions = {
    imageLoadErrorMessage: "Impossible de charger cette image",
    nextLabel: "Image suivante",
    prevLabel: "Image précédente",
    zoomInLabel: "Zoomer",
    zoomOutLabel: "Dézoomer",
    closeLabel: "Fermer",
  }

  //Add callback to Lightbox onCloseRequest
  const onClose = () => {
    console.log("Lightbox was closed")
  }

  return (
    <Layout>
      <SEO title="Gallery" />
      <h1>A Bit Of My LIfe</h1>
      <Gallery
        images={images}
        lightboxOptions={lightboxOptions}
        onClose={onClose}
      />
      <Link to="/">
        {" "}
        <h1>Back Home </h1>
      </Link>
      <Link to="/tags/">All Tags</Link>
    </Layout>
  )
}

export const pageQuery = graphql`
  query ImagesForGallery {
    images: allFile(
      filter: { relativeDirectory: { eq: "gallery" } }
      sort: { fields: name }
    ) {
      edges {
        node {
          childImageSharp {
            thumb: gatsbyImageData(
              width: 270
              height: 270
              placeholder: BLURRED
            )
            full: gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`

export default gallery
