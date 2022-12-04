const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const db = require("./db");

const port = 3300 || process.env.PORT;

db();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
