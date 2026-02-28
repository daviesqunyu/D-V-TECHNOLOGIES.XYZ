module.exports = {
  ci: {
    collect: {
      numberOfRuns: 2,
      staticDistDir: "./dist",
      url: [
        "http://localhost:4173/",
        "http://localhost:4173/services",
        "http://localhost:4173/contact",
      ],
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.9 }],
        "categories:accessibility": ["warn", { minScore: 0.9 }],
        "categories:best-practices": ["warn", { minScore: 0.9 }],
        "categories:seo": ["warn", { minScore: 0.9 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
