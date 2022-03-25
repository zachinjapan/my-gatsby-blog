const React = require("react")

const HeadComponents = [
  <script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2495439414515461"
    crossOrigin="anonymous"
  ></script>,
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>,
]

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  setHeadComponents(HeadComponents)
}
