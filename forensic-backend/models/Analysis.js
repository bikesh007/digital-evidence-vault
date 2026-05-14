const mongoose =
require("mongoose");

const AnalysisSchema =
new mongoose.Schema({

    evidenceId:String,

    investigator:String,

    findings:String,

    toolsUsed:[String],

    reportFile:String,

    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports =
mongoose.model(
    "Analysis",
    AnalysisSchema
);