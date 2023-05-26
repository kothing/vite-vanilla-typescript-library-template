// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require("./package.json");

const config = {
  compilationOptions: {
    preferredConfigPath: "./tsconfig.json",
  },
  entries: [
    {
      filePath: "./src/index.ts",
      outFile: `./dist/${packageJson.name}.es.d.ts`,
      output: {
        noBanner: true,
      },
    },
  ],
};

module.exports = config;
