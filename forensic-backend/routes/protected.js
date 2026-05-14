const express = require("express");

const auth = require("../middleware/auth");

const role = require("../middleware/role");

const router = express.Router();


// GENERAL PROTECTED ROUTE

router.get(

    "/profile",

    auth,

    (req, res) => {

        res.json({

            msg: "Protected profile accessed",

            user: req.user
        });
    }
);


// ADMIN ONLY ROUTE

router.get(

    "/admin",

    auth,

    role("ADMIN"),

    (req, res) => {

        res.json({

            msg: "Welcome Admin"
        });
    }
);


// INVESTIGATOR + ADMIN ROUTE

router.get(

    "/investigation",

    auth,

    role("ADMIN", "INVESTIGATOR"),

    (req, res) => {

        res.json({

            msg: "Investigation data accessed"
        });
    }
);

module.exports = router;