import express from "express";
import EventEmitter from "events";
/* import path from "path";
import cors from "cors"; */

//const __dirname = path.resolve();

const app = express();
app.use(express.urlencoded());
//app.use(cors); 
//app.use(express.static(path.join(__dirname, "build")));

const emitter = new EventEmitter();

/* app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
}) */

app.post("/authenticate", (req, res) => {
    const unity_deviceId = req.body.deviceId;
    console.log(unity_deviceId);

    emitter.on("logged-in", (web_deviceId) => {
        if (web_deviceId === unity_deviceId) {
            res.send("OK");
        }
    })
})

app.post("/login_success", (req, res) => {
    console.log(req.body.deviceId);
    emitter.emit("logged-in", req.body.deviceId);
    res.send("OK");
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening on port : " + port);
});