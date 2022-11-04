const fs = require("fs");
const output = fs.createWriteStream(`${__dirname}/text.txt`);

const { stdin, stdout } = process;
stdout.write("Enter your text:\n");
process.on("exit", () => {
  stdout.write("Good bye!");
});
process.on("SIGINT", () => process.exit());
stdin.on("data", (data) => {
  if (data.toString().trim() === "exit") {
    process.exit();
  }
  output.write(data.toString());
});
