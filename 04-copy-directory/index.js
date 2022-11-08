const fs = require("fs/promises");

const copyDir = async function () {
  try {
    const root = await fs.readdir(__dirname, "utf-8");
    if (root.includes("files-copy")) {
      await fs.rm(`${__dirname}/files-copy`, { recursive: true });
    }
    const dir = await fs.readdir(`${__dirname}/files`);
    await fs.mkdir(`${__dirname}/files-copy`, { recursive: true });
    await Promise.all(
      dir.map((e) => {
        return fs.copyFile(
          `${__dirname}/files/${e.toString()}`,
          `${__dirname}/files-copy/${e.toString()}`
        );
      })
    );
  } catch (err) {
    console.error(err.message);
  }
};

copyDir();
