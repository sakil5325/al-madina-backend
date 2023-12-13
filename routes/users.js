const express = require("express");
const router = express.Router();

const {
    getAllUsers,
    getAllUsersTesting,
    getUserByID,
} = require("../controllers/usersCtrl");

router.route("/").get(getAllUsers);
router.route("/testing").get(getAllUsersTesting);
router.route("/:id").get(getUserByID);

module.exports = router;