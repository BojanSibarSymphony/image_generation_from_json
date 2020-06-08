const express = require("express");
const router = express.Router();
const nodeHtmlToImage = require("node-html-to-image");

// @route   POST
// @body    {html: string}
// @desc    Generate image for given payload
router.post("/generate-image", async (req, res) => {
  const { imageData } = req.body;
  const { size, fontColor, backgroundColor, statistics } = imageData;
  const { width, height } = size;
  const { downloads, shazams, searches, purchases } = statistics;
  const fontColorStyle = fontColor.join(",");
  const backgroundColorStyle = backgroundColor.join(",");
  const image = await nodeHtmlToImage({
    output: "./image.png",
    html: `<html><body style="width: ${width}px; height: ${height}px;"><div style="position: relative; width: ${width}px; height: ${height}px; background-repeat: no-repeat; background-image: url(https://is5-ssl.mzstatic.com/image/thumb/Features123/v4/d7/38/37/d73837c0-0362-1933-2852-ca6756c90d87/mzl.dygddvjv.jpg/${width}x${height}bb.jpeg);">
    <div style="background-color: rgba(${backgroundColorStyle}); width: ${width}px; height: ${height}px;">
      <div style="display: flex; justify-content: space-around; align-items:center; text-align:center; height: 30%; color: rgba${fontColorStyle};">
        <div style="font-size: 2rem;"><div style="font-size: 1rem;">downloads</div>${downloads}M</div>
        <div style="font-size: 2rem;"><div style="font-size: 1rem;">shazams</div>${shazams}M</div>
        <div style="font-size: 2rem;"><div style="font-size: 1rem;">searches</div>${searches}k</div>
        <div style="font-size: 2rem;"><div style="font-size: 1rem;">purchases</div>${purchases}M</div>
        
      </div>
      <div style="position: absolute; bottom: 0; right: 0; color: gray; margin:5px;">Replay 2020</div>
    </div>
  </div><body></html>`,
  });
  res.writeHead(200, { "Content-Type": "image/png" });
  res.end(image, "binary");
});

module.exports = router;
