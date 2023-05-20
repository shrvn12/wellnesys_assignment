const express = require("express");
const fs = require("fs");
const os = require("os");
const app = express();

app.use(express.json()); // This middleware will handle JSON requests.

// creating required files (if not present)
!fs.existsSync("logs.json") && fs.writeFileSync("logs.json", "[]");
!fs.existsSync("users.json") && fs.writeFileSync("users.json", "[]");

// class for creating log information
class Log {
  msg = String;
  date = new Date().toLocaleString();
  data = Object;
  ip = String;
  response = String;

  constructor(msg = String, ip = String, response = String, data = Object) {
    this.msg = msg;
    if(ip){
        this.ip = ip;
    }
    this.response = response;
    this.data = data;
  }
}

// function to implement logging
function Logger(log) {
  const logs = require("./logs.json");
  logs.push(log)
  fs.writeFileSync("./logs.json", JSON.stringify(logs, null, 2));
}

// Implementing routes.
app.get("/", (req, res) => {
  res.send({ msg: "Welcome to website!" });
});

app.get("/users", (req, res) => {
  // Retrieving the user information from the JSON file.
  const users = require("./users.json");

  Logger(new Log("User data requested", req.ip, `${Buffer.byteLength(users.toString()) / 1024} KB`));

  // Sending a response with the user information.
  res.json(users);
});

app.post("/users", (req, res) => {

  const { name, email, password } = req.body;

  const payload = { name, email, password };

  // checking data validity
  for (let key in payload) {
    if (!payload[key]) {
      return res.status(400).send({ msg: `Please provide ${key}` });
    }
  }

  const users = require("./users.json");
  users.push(payload);
  fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));

  Logger(new Log("new user added", req.ip, "User created successfully!", payload));

  // Sending a success response.
  res.status(201).send({ msg: "User created successfully!" });
});

app.get("/logs", (req, res) => {

    // Creating a readStream for logs
    const Serverlogs = fs.createReadStream("logs.json", "utf-8");
    let log = null;

    // Sending logs data
    Serverlogs.on("data", (data) => {
        log = new Log("logs data requested", req.ip, `${Buffer.byteLength(data)/1024} KB`);
        return res.status(200).send(data);
    });

    // Handling stream error
    Serverlogs.on("error", (err) => {
        log = new Log("logs data requested", req.ip, `error: ${err.message}`)
        res.status(500).send({ msg: "Something went wrong!", error: err.message });
    });

  Logger(log);

});

// array routes used by the app
const routes = ["/users", "/", "/logs"];

// error handling for invalid routes and server errors.
app.use((req, res, next) => {
  // Checking if the request is for a valid route.
  if (!routes.includes(req.url)) {
    Logger(new Log("Invalid route requested", req.ip, "Route not found!"));

    res.status(404).send({ msg: "Route not found!" });
    return;
  }

  // Handling server errors.

  next(new Error("Something went wrong!"));
});

// server listens on port 3000.
app.listen(3000, () => {

    let systemData = {
        hostName: os.hostname(),
        cpu: os.cpus(),
        machine: os.machine(),
        platform: os.platform()
    }

    Logger(new Log("Server Connected", null, "Server listening on port ****", systemData));
    console.log("Server listening on port 3000");
});
