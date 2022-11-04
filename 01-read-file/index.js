const fs = require("fs");
const readableStream = fs.createReadStream(`${__dirname}/text.txt`, "utf-8");
let data = "";
const { stdout } = process;
readableStream.on("data", (chunk) => (data += chunk));
readableStream.on("end", () => stdout.write(data));
