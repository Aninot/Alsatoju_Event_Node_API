'use strict';
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

exports.isAuthenticated = function(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        // retrieve the authorization header and parse out the
        // JWT using the split function
        let token = req.headers.authorization.split(" ")[1];
        // On récup la private key dans le fichier.env
        dotenv.config();
        let privateKey = process.env.PRIVATE_KEY;
        // Here we validate that the JSON Web Token is valid and has been 
        // created using the same private pass phrase
        jwt.verify(token, privateKey, (err, user) => {
            // if there has been an error...
            if (err) {
                console.log('error');
                console.log(err);
                // shut them out!
                res.status(401).json({ error: "Unauthorized" });
                throw new Error("Unauthorized");
            }
            // if the JWT is valid, allow them to hit
            // the intended endpoint
            return next();
        });
    } else {
        // No authorization header exists on the incoming
        // request, return not authorized and throw a new error 
        res.status(401).json({ error: "Unauthorized" });
        throw new Error("Unauthorized");
    }
}