const router = require("express").Router();
const userController = require("../controllers/userController");

const auth = require("../middleware/authMiddleware");

router
  .route("/")
  .post(userController.registerUser)
  .get(auth.protect, auth.admin, userController.getUser);

router.route("/login").post(userController.login);

router
  .route("/profile")
  .get(auth.protect, userController.getUserProfile)
  .patch(auth.protect, userController.updateUserProfile);

router
  .route("/updatePassword")
  .patch(auth.protect, userController.updatePassword);
router
  .route("/:id")
  .delete(auth.protect, userController.deleteUser)
  .get(auth.protect, auth.admin, userController.getUserByIdByAdmin)
  .patch(auth.protect, auth.admin, userController.updateUserByAdmin);

module.exports = router;
