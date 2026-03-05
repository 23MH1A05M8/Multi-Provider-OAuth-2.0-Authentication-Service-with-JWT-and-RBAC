const express = require("express")

const router = express.Router()

const authenticateToken = require("../middleware/authMiddleware")
const authorizeRole = require("../middleware/roleMiddleware")

const userController = require("../controllers/userController")

router.get("/me",
 authenticateToken,
 userController.getProfile
)

router.patch("/me",
 authenticateToken,
 userController.updateProfile
)

router.get("/",
 authenticateToken,
 authorizeRole("admin"),
 userController.getAllUsers
)

module.exports = router