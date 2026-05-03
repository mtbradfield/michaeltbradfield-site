module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");

  eleventyConfig.addGlobalData("eleventyComputed", {
    shelf_sort_title: data => {
      return data.series_title || data.title || "";
    }
  });

  eleventyConfig.addCollection("recentWorks", function(collectionApi) {
  return collectionApi.getAll().filter(item => {
    return item.data.publication_status === "public" && item.url;
  }).sort((a, b) => {
    const dateA = new Date(a.data.revised || a.data.first_written || "1900-01-01");
    const dateB = new Date(b.data.revised || b.data.first_written || "1900-01-01");
    return dateB - dateA;
  }).slice(0, 5);
});

  eleventyConfig.addCollection("essays", function(collectionApi) {
  return collectionApi.getAll().filter(item => {
    const formMatch = item.data.form === "essay";
    const formsMatch = Array.isArray(item.data.forms) && item.data.forms.includes("essay");
    return formMatch || formsMatch;
  }).sort((a, b) => {
    const dateA = new Date(a.data.first_written || "1900-01-01");
    const dateB = new Date(b.data.first_written || "1900-01-01");
    return dateB - dateA; // newest first
  });
});

    eleventyConfig.addCollection("workingPapers", function(collectionApi) {
  return collectionApi.getAll().filter(item => {
    const formMatch = item.data.form === "working-paper";
    const formsMatch = Array.isArray(item.data.forms) && item.data.forms.includes("working-paper");
    return formMatch || formsMatch;
  }).sort((a, b) => {
    const dateA = new Date(a.data.first_written || "1900-01-01");
    const dateB = new Date(b.data.first_written || "1900-01-01");
    return dateB - dateA; // newest first
  });
});

  eleventyConfig.addCollection("notes", function(collectionApi) {
  return collectionApi.getAll().filter(item => {
    const formMatch = item.data.form === "note";
    const formsMatch = Array.isArray(item.data.forms) && item.data.forms.includes("note");
    return formMatch || formsMatch;
  }).sort((a, b) => {
    const dateA = new Date(a.data.first_written || "1900-01-01");
    const dateB = new Date(b.data.first_written || "1900-01-01");
    return dateB - dateA; // newest first
  });
});

eleventyConfig.addCollection("notesFeatured", function(collectionApi) {
  return collectionApi.getAll().filter(item => {
    const formMatch = item.data.form === "note";
    const formsMatch = Array.isArray(item.data.forms) && item.data.forms.includes("note");
    const isNote = formMatch || formsMatch;

    return (
      isNote &&
      item.data.featured === true &&
      item.data.feature_section === "note"
    );
  }).sort((a, b) => {
    const orderA = Number(a.data.feature_section_order || 999);
    const orderB = Number(b.data.feature_section_order || 999);
    return orderA - orderB;
  });
});

eleventyConfig.addCollection("topicPublicLifeEthics", function(collectionApi) {
  return collectionApi.getAll().filter(item => {
    const topics = Array.isArray(item.data.topics) ? item.data.topics : [];
    return topics.includes("public-life-ethics");
  }).sort((a, b) => {
    const dateA = new Date(a.data.first_written || "1900-01-01");
    const dateB = new Date(b.data.first_written || "1900-01-01");
    return dateB - dateA; // newest first
  });
});

eleventyConfig.addCollection("topicFaithAndTheology", function(collectionApi) {
  return collectionApi.getAll().filter(item => {
    const topics = Array.isArray(item.data.topics) ? item.data.topics : [];
    return topics.includes("faith-and-theology");
  }).sort((a, b) => {
    const dateA = new Date(a.data.first_written || "1900-01-01");
    const dateB = new Date(b.data.first_written || "1900-01-01");
    return dateB - dateA; // newest first
  });
});

eleventyConfig.addCollection("topicInstitutionsAndLeadership", function(collectionApi) {
  return collectionApi.getAll().filter(item => {
    const topics = Array.isArray(item.data.topics) ? item.data.topics : [];
    return topics.includes("institutions-and-leadership");
  }).sort((a, b) => {
    const dateA = new Date(a.data.first_written || "1900-01-01");
    const dateB = new Date(b.data.first_written || "1900-01-01");
    return dateB - dateA; // newest first
  });
});

eleventyConfig.addCollection("topicSpiritualityAndCommunity", function(collectionApi) {
  return collectionApi.getAll().filter(item => {
    const topics = Array.isArray(item.data.topics) ? item.data.topics : [];
    return topics.includes("spirituality-and-community");
  }).sort((a, b) => {
    const dateA = new Date(a.data.first_written || "1900-01-01");
    const dateB = new Date(b.data.first_written || "1900-01-01");
    return dateB - dateA; // newest first
  });
});

eleventyConfig.addCollection("endorsementItems", function(collectionApi) {
  return collectionApi.getAll().filter(item => {
    const projectMatch =
      Array.isArray(item.data.projects) &&
      item.data.projects.includes("endorsement");

    const isPublic = item.data.publication_status !== "private";

    return projectMatch && isPublic;
  }).sort((a, b) => {
    const dateA = new Date(a.data.first_written || "1900-01-01");
    const dateB = new Date(b.data.first_written || "1900-01-01");
    return dateB - dateA;
  });
});

eleventyConfig.addCollection("seriesList", function(collectionApi) {
  const seriesMap = new Map();

  collectionApi.getAll().forEach(item => {
    if (
      item.data.series_slug &&
      item.data.series_title &&
      item.data.publication_status !== "private"
    ) {
      const slug = item.data.series_slug;

      if (!seriesMap.has(slug)) {
        seriesMap.set(slug, {
          slug: slug,
          title: item.data.series_title,
          description: item.data.series_description || ""
        });
      }
    }
  });

  return Array.from(seriesMap.values());
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

eleventyConfig.addCollection("transformingCommunity", function(collectionApi) {
  return collectionApi.getAll().filter(item => {

    const isTC = Array.isArray(item.data.projects) &&
      item.data.projects.includes("transforming-community");

    const isPublic = item.data.publication_status !== "private";

    return isTC && isPublic;

  }).sort((a, b) => {
    const dateA = new Date(a.data.first_written || "1900-01-01");
    const dateB = new Date(b.data.first_written || "1900-01-01");
    return dateB - dateA;
  });
});

eleventyConfig.addCollection("voterIdentification", function(collectionApi) {
  return collectionApi.getAll().filter(item => {

    const isVoterProject = Array.isArray(item.data.projects) &&
      item.data.projects.includes("voter-identification");

    const isPublic = item.data.publication_status !== "private";

    return isVoterProject && isPublic;

  }).sort((a, b) => {
    const dateA = new Date(a.data.first_written || "1900-01-01");
    const dateB = new Date(b.data.first_written || "1900-01-01");
    return dateB - dateA;
  });
});

  eleventyConfig.addCollection("reflections", function(collectionApi) {
  return collectionApi.getAll().filter(item => {
    const formMatch = item.data.form === "reflection";
    const formsMatch = Array.isArray(item.data.forms) && item.data.forms.includes("reflection");
    return formMatch || formsMatch;
  }).sort((a, b) => {
    const dateA = new Date(a.data.first_written || "1900-01-01");
    const dateB = new Date(b.data.first_written || "1900-01-01");
    return dateB - dateA; // newest first
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
