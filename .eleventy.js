module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");

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

  eleventyConfig.addCollection("featuredHome", function(collectionApi) {
    return collectionApi.getAll().filter(item => {
      return item.data.featured === true && item.data.feature_home === true;
  }).sort((a, b) => {
      return (a.data.feature_home_order || 999) - (b.data.feature_home_order || 999);
    });
  });

  eleventyConfig.addCollection("featuredPluralism", function(collectionApi) {
    return collectionApi.getAll().filter(item => {
      return item.data.featured === true && item.data.feature_section === "pluralism";
    }).sort((a, b) => {
      return (a.data.feature_section_order || 999) - (b.data.feature_section_order || 999);
    });
  });

  eleventyConfig.addCollection("featuredCovenantalEconomics", function(collectionApi) {
  return collectionApi.getAll().filter(item => {
    return item.data.featured === true && item.data.feature_section === "covenantal-economics";
  }).sort((a, b) => {
    return (a.data.feature_section_order || 999) - (b.data.feature_section_order || 999);
  });
});

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    }
  };
};
