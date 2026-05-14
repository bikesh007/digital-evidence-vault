const mongoose = require("mongoose");

const InvestigationNoteSchema =
new mongoose.Schema({

    evidenceId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Evidence",

        required: true
    },

    investigator: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true
    },

    note: {

        type: String,

        required: true
    },

    analysisStage: {

        type: String,

        enum: [

            "INITIAL_REVIEW",

            "FORENSIC_ANALYSIS",

            "MALWARE_ANALYSIS",

            "NETWORK_ANALYSIS",

            "FINAL_REPORT"
        ],

        default:
        "INITIAL_REVIEW"
    },

    findings: {

        type: String
    },

    toolsUsed: {

        type: String
    },

    createdAt: {

        type: Date,

        default: Date.now
    }
});

module.exports =
mongoose.model(

    "InvestigationNote",

    InvestigationNoteSchema
);