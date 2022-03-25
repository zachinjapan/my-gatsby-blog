const React = require("react")

const HeadComponents = [
  <script
    async
    src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
  ></script>,
]

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  setHeadComponents(HeadComponents)
}
