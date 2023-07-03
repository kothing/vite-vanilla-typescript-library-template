import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import banner from "vite-plugin-banner";
// import dts from "vite-plugin-dts";
import packageJson from "./package.json";
import styleInject from "./plugins/style-inject";

const getPackageName = () => {
  return packageJson.name;
};

const getPackageNameCamelCase = () => {
  try {
    return getPackageName().replace(/-./g, (char) => char[1].toUpperCase());
  } catch (err) {
    throw new Error("Name property in package.json is missing.");
  }
};

const fileName = {
  es: `${getPackageName()}.es.js`,
  umd: `${getPackageName()}.umd.js`,
  iife: `${getPackageName()}.iife.js`,
};

const pkgInfo = `/**
 * name: ${packageJson.name}
 * version: ${packageJson.version}
 * description: ${packageJson.description}
 * author: ${packageJson.author}
 * homepage: ${packageJson.homepage}
 * repository: ${packageJson.repository.url}
 */`;

export default defineConfig(({ command, mode }) => {
  // when command line: vite
  if (command === "serve") {
    // do something
  }
  // when command line: vite build
  else if (command === "build") {
    // do something
    // fs.rmdirSync("./dist", { recursive: true });
  }

  // such as command line: vite --mode development
  if (mode === "development") {
    // do something
  }
  // such as command line: vite build --mode production
  else if (mode === "production") {
    // do something
  }
  
  return {
    base: "./",
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: getPackageNameCamelCase(),
        formats: ["es", "umd", "iife"],
        fileName: (format) => fileName[format],
      },
    },
    plugins: [
      banner(pkgInfo),
      styleInject(),
      // dts({
      //   insertTypesEntry: true,
      // }),
    ],
    resolve: {
      alias: {
        "@/*": path.resolve(__dirname, "src"),
      },
    },
  };
});
