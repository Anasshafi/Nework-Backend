const router = require("express");
const portfolioController = require("../controllers/portfolioController");

const PortfolioRouter = router.Router();

const auth = require("../middleware/authMiddleware");

PortfolioRouter.route("/:id")
  .get(portfolioController.get)
  .patch(portfolioController.update)
  .delete(portfolioController.delete);

PortfolioRouter.route("/")
  .post(portfolioController.create)
  .get(portfolioController.getAll);

module.exports = PortfolioRouter;
