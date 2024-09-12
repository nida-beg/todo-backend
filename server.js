const express = require("express");
const cors = require("cors");
const app = express();
let corsOptions = { origin: "http://localhost:3000" };
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");

db.mongoose.connect(db.url, {
  useNewUrlparser: true,
  useUnifiedtopology: true

})
  .then(() => {
    console.log("Connect to the database!");
  })
  .catch(err => {
    console.log("cannot connect to the database!", err);
    process.exit();
  })
app.get("/", (req, res) => {
  res.json({ message: "TODO LIST" });

});
require("./routes/todo.routes")(app);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => { console.log(`server is running on port ${PORT}.`); });
