const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes = "100vw", className = null) {
  const path = require("path");
  const extension = path.extname(src).toLowerCase();
  
  // For GIFs, preserve the format to keep animation
  let formats = ["webp", "jpeg"];
  let sharpOptions = {};
  if (extension === ".gif") {
    formats = ["gif", "webp"];
    // Keep every frame instead of collapsing to the first one
    sharpOptions = { animated: true };
  }

  // For images in src/assets/images
  let metadata = await Image(src, {
    widths: [600, 1200, 1800, 2400],
    formats: formats,
    outputDir: "./_site/img/",
    urlPath: "/img/",
    sharpOptions: sharpOptions,
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}w.${format}`;
    }
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  if (className) {
    imageAttributes.class = className;
  }

  return Image.generateHTML(metadata, imageAttributes);
}

const path = require("path");

module.exports = function (eleventyConfig) {
  // Pass through fonts and favicon (but not images - they'll be processed)
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/favicon.png");
  eleventyConfig.addPassthroughCopy("src/assets/og-image.jpg");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/assets/images/**/*.mp4");
  eleventyConfig.addPassthroughCopy({
    "src/assets/images/transcript-magazine-black.svg": "assets/images/transcript-magazine-black.svg"
  });
  
  // Add image shortcode
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
