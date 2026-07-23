const recommendationService =
require("../services/recommendationServices");

exports.recommendProducts =
async (req, res) => {

    try {

        const recommendations =
            await recommendationService
            .getRecommendations(
                req.user.id
            );

        res.status(200).json({
            success: true,
            recommendations
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};