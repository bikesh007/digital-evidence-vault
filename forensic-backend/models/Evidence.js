const mongoose = require("mongoose");

const EvidenceSchema =
new mongoose.Schema({

    caseId:String,

    title:String,

    description:String,

    evidenceType:String,

    originalName:String,

filePath:String,

    fileSize:Number,

    mimeType:String,

    sha256Hash:String,

    ipfsHash:String,

    blockchainTxHash:String,

    uploadedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
},

    walletAddress:String,

    /*
        5W1H METADATA
    */

    whoCollected:String,

    whatCollected:String,

    whenCollected:Date,

    whereCollected:String,

    whyCollected:String,

    howCollected:String,

    gpsLatitude:Number,

    gpsLongitude:Number,

    collectionDevice:String,

    acquisitionTool:String,

    status:{
        type:String,
        enum:[
            "COLLECTED",
            "ANALYZING",
            "VERIFIED",
            "SUBMITTED",
            "ARCHIVED"
        ],
        default:"COLLECTED"
    },

    integrityVerified:{
        type:Boolean,
        default:false
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports =
mongoose.model("Evidence",EvidenceSchema);