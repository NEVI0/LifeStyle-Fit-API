const express = require("express");

module.exports = (server) => {

    const authRoute = express.Router();
    server.use("/auth", authRoute);

    // const api = express.Router();
    // server.use("/api", api);
    // api.use(auth);

    authRoute.get("/", (req, res) => {
        return res.status(200).json({ message: `API's Running`, status: 200 });
    });

}