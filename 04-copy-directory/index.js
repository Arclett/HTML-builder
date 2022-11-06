const fs = require("fs/promises");

const copyDir = async function () {
  try {
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
