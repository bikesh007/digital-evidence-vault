const ChainOfCustody =
require("../models/ChainOfCustody");

exports.logChainActivity =
async ({
    evidenceId,
    action,
    performedBy,
    role,
    walletAddress,
    previousStatus,
    newStatus,
    remarks,
    ipAddress,
    location
}) => {

    try {

        const log =
        new ChainOfCustody({

            evidenceId,

            action,

            performedBy,

            role,

            walletAddress,

            previousStatus,

            newStatus,

            remarks,

            ipAddress,

            location
        });

        await log.save();

    } catch (error) {

        console.error(
            "Chain Logger Error:",
            error.message
        );
    }
};