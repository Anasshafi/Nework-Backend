const router = require("express");
const jobsController = require("../controllers/jobPostController");

const JobsRouter = router.Router();

const auth = require("../middleware/authMiddleware");

JobsRouter.route("/:id")
  .get(jobsController.get)
  .patch(jobsController.update)
  .delete(jobsController.delete);

JobsRouter.route("/").post(jobsController.create).get(jobsController.getAll);

module.exports = JobsRouter;
