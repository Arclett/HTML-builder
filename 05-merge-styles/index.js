const fs = require("fs/promises");

const merge = async function () {
  const styleDir = await fs.readdir(`${__dirname}/styles`, {
    withFileTypes: true,
  });
  const styleDirFiltred = styleDir.filter((e) =>
    e.name.toString().split(".")[1] === "css" ? e : null
  );
  const readStyle = await Promise.all(
    styleDirFiltred.map((e) => {
      return fs.readFile(`${__dirname}/styles/${e.name}`, "utf-8");
    })
  );
  await fs.writeFile(
    `${__dirname}/project-dist/bundle.css`,
    readStyle.join("")
  );
};

merge();
