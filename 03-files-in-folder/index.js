const fs = require("fs/promises");

const inspectFolder = async function () {
  const dir = await fs.readdir(`${__dirname}/secret-folder`, {
    withFileTypes: true,
  });
  const dirFiles = dir.filter((e) => (!e.isDirectory() ? e : undefined));
  const size = await Promise.all(
    dirFiles.map((e) =>
      fs.stat(`${__dirname}/secret-folder/${e.name.toString()}`)
    )
  );
  const namesAndRes = dirFiles.map((e) => {
    return e.name.toString().split(".");
  });
  dirFiles.forEach((e, i) => {
    console.log(
      `${namesAndRes[i][0]} - ${namesAndRes[i][1]} - ${size[i].size}b`
    );
  });
};

inspectFolder();
