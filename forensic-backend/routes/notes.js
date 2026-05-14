const express = require("express");

const auth = require("../middleware/auth");

const InvestigationNote =
require("../models/InvestigationNote");

const {
    logChainActivity
} = require("../services/chainLogger");

const router = express.Router();


// ADD INVESTIGATION NOTE

router.post(

    "/add/:evidenceId",

    auth,

    async (req, res) => {

        try {

            const {

                note,

                analysisStage,

                findings,

                toolsUsed

            } = req.body;

            // CREATE NOTE

            const newNote =
            new InvestigationNote({

                evidenceId:
                req.params.evidenceId,

                investigator:
                req.user.id,

                note,

                analysisStage,

                findings,

                toolsUsed
            });

            await newNote.save();

            // LOG CHAIN ACTIVITY

            await logChainActivity({

                evidenceId:
                req.params.evidenceId,

                action:
                "INVESTIGATION_NOTE_ADDED",

                performedBy:
                req.user.id,

                role:
                req.user.role,

                remarks:
                "Investigation note added",

                ipAddress:
                req.ip,

                location:
                "Unknown"
            });

            res.json({

                msg:
                "Investigation note added",

                note:
                newNote
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


// GET ALL NOTES FOR EVIDENCE

router.get(

    "/:evidenceId",

    auth,

    async (req, res) => {

        try {

            const notes =
            await InvestigationNote.find({

                evidenceId:
                req.params.evidenceId
            })

            .populate(
                "investigator",
                "name email role"
            )

            .sort({

                createdAt: -1
            });

            res.json(notes);

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