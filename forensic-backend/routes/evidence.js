const express = require("express");

const fs = require("fs");

const auth = require("../middleware/auth");

const {
    logChainActivity
} = require("../services/chainLogger");

const upload =
require("../middleware/upload");

const Evidence =
require("../models/Evidence");

const {
    generateHash
} = require("../services/hashService");

const router = express.Router();


// UPLOAD EVIDENCE

router.post(

    "/upload",

    auth,

    upload.single("file"),

    async (req, res) => {

        try {

            // READ FILE BUFFER

            const fileBuffer =
            fs.readFileSync(req.file.path);

            // GENERATE SHA256 HASH

            const sha256Hash =
            generateHash(fileBuffer);

            // SAVE EVIDENCE

            const evidence =
            new Evidence({

                title: req.body.title,

                description:
                req.body.description,

                fileName:
                req.file.filename,

                originalName:
                req.file.originalname,

                filePath:
                req.file.path,

                fileSize:
                req.file.size,

                mimeType:
                req.file.mimetype,

                sha256Hash,

                uploadedBy:
                req.user.id
            });

            await evidence.save();
            await logChainActivity({

    evidenceId: evidence._id,

    action: "EVIDENCE_UPLOADED",

    performedBy: req.user.id,

    role: req.user.role,

    remarks: "Initial evidence upload",

    ipAddress: req.ip,

    location: "Unknown"
});

            res.json({

                msg:
                "Evidence uploaded successfully",

                evidence
            });

        } catch (error) {

    console.error(error);

    res.status(500).json({
        error: error.message
    });
}
    }
);
// UPDATE EVIDENCE STATUS

router.put(

    "/status/:id",

    auth,

    async (req, res) => {

        try {

            const {
                status,
                remarks
            } = req.body;

            // FIND EVIDENCE

            const evidence =
            await Evidence.findById(
                req.params.id
            );

            if (!evidence) {

                return res.status(404)
                .json({

                    msg:
                    "Evidence not found"
                });
            }

            // STORE OLD STATUS

            const oldStatus =
            evidence.status;

            // UPDATE STATUS

            evidence.status = status;

            await evidence.save();

            // LOG ACTIVITY

            await logChainActivity({

                evidenceId:
                evidence._id,

                action:
                "STATUS_CHANGED",

                performedBy:
                req.user.id,

                role:
                req.user.role,

                previousStatus:
                oldStatus,

                newStatus:
                status,

                remarks,

                ipAddress:
                req.ip,

                location:
                "Unknown"
            });

            res.json({

                msg:
                "Evidence status updated",

                evidence
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                error:
                error.message
            });
        }
    }
);


// VERIFY EVIDENCE INTEGRITY

router.post(

    "/verify/:id",

    auth,

    async (req, res) => {

        try {

            // FIND EVIDENCE

            const evidence =
            await Evidence.findById(
                req.params.id
            );

            if (!evidence) {

                return res.status(404)
                .json({

                    msg:
                    "Evidence not found"
                });
            }

            // READ FILE

            const fileBuffer =
            fs.readFileSync(
                evidence.filePath
            );

            // GENERATE NEW HASH

            const newHash =
            generateHash(fileBuffer);

            // VERIFY HASH

            const verified =
            newHash ===
            evidence.sha256Hash;

            // UPDATE FLAG

            evidence.integrityVerified =
            verified;

            await evidence.save();

            // LOG ACTIVITY

            await logChainActivity({

                evidenceId:
                evidence._id,

                action:
                "HASH_VERIFIED",

                performedBy:
                req.user.id,

                role:
                req.user.role,

                remarks:
                verified
                ? "Integrity verified successfully"
                : "Integrity verification failed",

                ipAddress:
                req.ip,

                location:
                "Unknown"
            });

            res.json({

                verified,

                originalHash:
                evidence.sha256Hash,

                newHash
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                error:
                error.message
            });
        }
    }
);

// UPDATE 5W1H FORENSIC METADATA

router.put(

    "/metadata/:id",

    auth,

    async (req, res) => {

        try {

            // FIND EVIDENCE

            const evidence =
            await Evidence.findById(
                req.params.id
            );

            if (!evidence) {

                return res.status(404)
                .json({

                    msg:
                    "Evidence not found"
                });
            }

            // UPDATE 5W1H METADATA

            evidence.whoCollected =
            req.body.whoCollected;

            evidence.whatCollected =
            req.body.whatCollected;

            evidence.whenCollected =
            req.body.whenCollected;

            evidence.whereCollected =
            req.body.whereCollected;

            evidence.whyCollected =
            req.body.whyCollected;

            evidence.howCollected =
            req.body.howCollected;

            // EXTRA FORENSIC DETAILS

            evidence.gpsLatitude =
            req.body.gpsLatitude;

            evidence.gpsLongitude =
            req.body.gpsLongitude;

            evidence.collectionDevice =
            req.body.collectionDevice;

            evidence.acquisitionTool =
            req.body.acquisitionTool;

            evidence.walletAddress =
            req.body.walletAddress;

            await evidence.save();

            // LOG CHAIN ACTIVITY

            await logChainActivity({

                evidenceId:
                evidence._id,

                action:
                "METADATA_UPDATED",

                performedBy:
                req.user.id,

                role:
                req.user.role,

                remarks:
                "5W1H forensic metadata updated",

                ipAddress:
                req.ip,

                location:
                evidence.whereCollected
            });

            res.json({

                msg:
                "Metadata updated successfully",

                evidence
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({

                error:
                error.message
            });
        }
    }
);
module.exports = router;