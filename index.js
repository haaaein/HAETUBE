/**
 * 서버를 생성하고 route를 생성하고 그리고 그것에 응답하는 방식.
 * express와 node.js로 할 수 있음.
 */

const express = require('express');
const app = express();

const PORT = 4000; 

function handleListening() {
    console.log(`Listening on: http://localhost:${PORT}`);
}

function handleHome(req, res) {
    console.log(req);
    res.send("Hello from Home");
}

function handleProfile(req, res) {
    res.send("You are on my profile");
}
app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);