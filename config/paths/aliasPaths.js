const { lstatSync, readdir, writeFile } = require("fs");
const path = require("path");
const { promisify } = require("util");

const promiseReadDir = promisify(readdir);
const promiseWriteFile = promisify(writeFile);

const getSrcDirs = async () => {
  const dirContent = await promiseReadDir(
    path.resolve(path.resolve(__dirname, "../..", "src"))
  );

  const dirs = dirContent
    .filter((item) =>
      lstatSync(path.resolve(__dirname, "../..", "src", item)).isDirectory()
    )
    .map((dir) => ({ name: `@${dir}`, path: dir }));

  await promiseWriteFile(
    path.resolve(__dirname, "PATH_ALIASES.json"),
    JSON.stringify(dirs)
  );
  return dirs;
};

const setUpPathAliases = async () => {
  const PATH_ALIASES = await getSrcDirs();

  const tsconfigBase = {
    compilerOptions: {
      baseUrl: "../../src",
      paths: PATH_ALIASES.reduce(
        (acc, pathAlias) => ({
          ...acc,
          [pathAlias.name]: [`./${pathAlias.path}`],
        }),
        {}
      ),
    },
  };

  await promiseWriteFile(
    path.resolve(__dirname, "tsconfig-path-aliases.json"),
    JSON.stringify(tsconfigBase)
  );
};

setUpPathAliases();
