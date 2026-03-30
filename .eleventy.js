module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addCollection("essays", function(collectionApi) {
    return collectionApi.getFilteredByTag("essay").reverse();
  });

  eleventyConfig.addCollection("reflections", function(collectionApi) {
    return collectionApi.getFilteredByTag("reflection").reverse();
  });

  eleventyConfig.addCollection("workingPapers", function(collectionApi) {
    return collectionApi.getFilteredByTag("working-paper").reverse();
  });

  eleventyConfig.addCollection("notes", function(collectionApi) {
    return collectionApi.getFilteredByTag("note").reverse();
  });

  eleventyConfig.addCollection("endorsementItems", function(collectionApi) {
  return collectionApi.getFilteredByTag("project-endorsement-ministry").reverse();
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    }
  };
};