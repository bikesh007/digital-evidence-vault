const mongoose = require("mongoose");

const ChainOfCustodySchema =
new mongoose.Schema({

    evidenceId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Evidence",

        required: true
    },

    action: {

        type: String,

        required: true
    },

    performedBy: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true
    },

    role: {

        type: String
    },

    walletAddress: {

        type: String
    },

    previousStatus: {

        type: String
    },

    newStatus: {

        type: String
    },

    remarks: {

        type: String
    },

    ipAddress: {

        type: String
    },

    location: {

        type: String
    },

    timestamp: {

        type: Date,

        default: Date.now
    }
});

module.exports =
mongoose.model(
    "ChainOfCustody",
    ChainOfCustodySchema
);