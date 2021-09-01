const express = require("express");
const session = require("express-session");
const router = express.Router();

router.get("/", (req,res) => {
    req.session.loggedin = false;
    res.redirect("/log");
    
});

router.get("/home", (req,res) => {
    if(req.session.loggedin)
        res.send("/log");
    else
        res.send("Please login");
});

router.post("/auth", (req,res) => {
    let username = req.body.username;
    let pass = req.body.password;

    request.session.loggedin = true;
    response.redirect("/home");

});

module.export = router;
