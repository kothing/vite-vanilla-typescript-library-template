import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import banner from "vite-plugin-banner";
// import dts from "vite-plugin-dts";
import packageJson from "./package.json";
import styleInject from "./plugins/style-inject";

// node version
const major = process.version.match(/v([0-9]*).([0-9]*)/)[1];
const minor = process.version.match(/v([0-9]*).([0-9]*)/)[2];

/**
 * cpSync
 * @param {string} source
 * @param {string} destination
 */
const cpSync = (source, destination) => {
  if (Number(major) < 16 || (Number(major) == 16 && Number(minor) < 7)) {
    if (fs.existsSync(destination)) {
      fs.rmSync(destination, { recursive: true });
    }

    fs.mkdirSync(destination, { recursive: true });
    const rd = fs.readdirSync(source);

    for (const fd of rd) {
      const sourceFullName = source + "/" + fd;
      const destFullName = destination + "/" + fd;
      const lstatRes = fs.lstatSync(sourceFullName);
      if (lstatRes.isFile()) {
        fs.copyFileSync(sourceFullName, destFullName);
      }
      if (lstatRes.isDirectory()) {
        cpSync(sourceFullName, destFullName);
      }
    }
  } else {
    fs.cpSync(source, destination, { force: true, recursive: true });
  }
};

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
    server: {
      port: 8080,
      https: false,
      open: true
    },
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
