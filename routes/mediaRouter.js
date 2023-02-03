const router = require("express");
const mediaController = require("../controllers/mediaController");

const MediaRouter = router.Router();

MediaRouter.route("/").post(mediaController.create);

module.exports = MediaRouter;
