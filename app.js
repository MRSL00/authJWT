const express = require("express");
const logger = require("morgan");
const seq = require("./src/db/connection");
const app = express();
const { remove_expires_tokens } = require("./src/tools/remove_expires_tokens");

app.use(logger("dev"));
app.use(express.json());

const PORT = 7070;

seq
  .sync({ force: false })
  .then(() => {
    console.log("[+] db connected successfully :)");
  })
  .catch((error) => {
    console.log(error.message);
  });

setInterval(remove_expires_tokens, 10000);

// app.post("/", async (req, res) => {
//   try {
//     await User.update(req.body, { where: { id: 1 }, individualHooks: true });
//     const newUser = await User.findOne({ where: { id: 1 } });
//     res.send(newUser);
//   } catch (error) {
//     res.send(error.message);
//   }
// });

app.use("/", require("./src/router/api"));

app.listen(PORT, () => {
  console.log(`Running On Port http://localhost:${PORT}`);
});
