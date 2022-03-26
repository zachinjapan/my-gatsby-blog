import React from "react"

import ad1 from "../images/ad1.jpg"
import ad2 from "../images/ad2.png"

const Ads = () => {
  return (
    <div className="ads">
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
      <a href="https://www.my-anime-collection.com/landing" target={"_blank"}>
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
  )
}
export default Ads
