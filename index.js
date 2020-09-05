const http = require("http");
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/notes", (req, res) => {
  fetch("https://5f5265717c47c30016e305b7.mockapi.io/notes")
    .then((res) => res.json())
    .then((json) => res.send(json))
    .catch((e) => console.error("Error: ", e));
});

app.get("/note/:id", (req, res) => {
  fetch(`https://5f5265717c47c30016e305b7.mockapi.io/notes/${req.params.id}`)
    .then((res) => res.json())
    .then((json) => res.send(json))
    .catch((e) => console.error("Error: ", e));
});

app.post("/new", (req, res) => {
  fetch("https://5f5265717c47c30016e305b7.mockapi.io/notes", {
    method: "POST",
    body: JSON.stringify(req.body),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => res.send(json))
    .catch((e) => console.error("Error: ", e));
});

app.put("/note/:id", (req, res) => {
  fetch(`https://5f5265717c47c30016e305b7.mockapi.io/notes/${req.params.id}`, {
    method: "PUT",
    body: JSON.stringify(req.body),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => res.send(json))
    .catch((e) => console.error("Error: ", e));
});

app.delete("/note/:id", (req, res) => {
  fetch(`https://5f5265717c47c30016e305b7.mockapi.io/notes/${req.params.id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((json) => res.send(json))
    .catch((e) => console.error("Error: ", e));
});

app.use("*", (req, res) => {
  res.send("CHECK YOUR ROUTE");
});

const server = http.createServer(app);

server.listen(8081);
server.on("listening", onListening);

async function onListening() {
  var addr = server.address();
  var bind = typeof addr == "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Server listening on " + bind);
}
