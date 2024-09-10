const Router = require("express")
const router = new Router()
const controller = require("./authController")
const { check } = require("express-validator")
const authMiddleware = require("./middleware/authMiddleware")
const roleMiddleware = require("./middleware/roleMiddleware")

router.post("/registration", [
    check("username", "Name can't be empty").notEmpty(),
    check("password", "Password can't be empty").notEmpty()
], controller.registration)
router.post("/login", controller.login)
router.get("/users", roleMiddleware(["ADMIN"]), controller.getUsers)

module.exports = router