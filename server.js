const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const booksRoute = require("./routes/books.route.js");
const usersRoute = require("./routes/users.route.js");
const transactionRoute = require("./routes/transaction.route.js");
const authRoute = require("./routes/auth.route.js");

const authMiddleware = require("./middleware/auth.middleware.js");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/books", authMiddleware.requiredAuth, booksRoute);
app.use("/users", authMiddleware.requiredAuth, usersRoute);
app.use("/transactions", authMiddleware.requiredAuth, transactionRoute);
app.use("/auth", authRoute);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
