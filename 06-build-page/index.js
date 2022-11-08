const fs = require("fs/promises");
const path = require("path");

const createHtml = async function () {
  await fs.rm(path.join(__dirname, "project-dist"), {
    recursive: true,
    force: true,
  });
  await fs.mkdir(`${__dirname}/project-dist`, { recursive: true });
  let template = await fs.readFile(`${__dirname}/template.html`, "utf-8");
  const components = await fs.readdir(`${__dirname}/components`, {
    withFileTypes: true,
  });
  const compFiltred = components.filter((e) =>
    e.name.toString().split(".")[1] === "html" ? e : null
  );
  const compData = await Promise.all(
    compFiltred.map((e) => {
      return fs.readFile(`${__dirname}/components/${e.name}`, "utf-8");
    })
  );
  compFiltred.forEach((e, i) => {
    template = template.replace(
      `{{${e.name.toString().split(".")[0]}}}`,
      compData[i]
    );
  });
  await fs.writeFile(`${__dirname}/project-dist/index.html`, template);
};

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
  await fs.writeFile(`${__dirname}/project-dist/style.css`, readStyle.join(""));
};

const copyDir = async function (inp, out) {
  try {
    const dir = await fs.readdir(`${inp}`, {
      withFileTypes: true,
    });
    await fs.mkdir(`${out}`, { recursive: true });
    await Promise.all(
      dir.map((e) => {
        if (e.isFile()) {
          return fs.copyFile(
            path.join(inp, e.name.toString()),
            path.join(out, e.name.toString())
          );
        } else {
          return copyDir(
            path.join(inp, e.name.toString()),
            path.join(out, e.name.toString())
          );
        }
      })
    );
  } catch (err) {
    console.error(err.message);
  }
};

(async () => {
  await createHtml();
  await merge();
  await copyDir(
    path.join(__dirname, "assets"),
    path.join(__dirname, "project-dist/assets")
  );
})();
