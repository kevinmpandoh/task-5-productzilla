// Importing express
const router = require("express").Router();
const bookRoutes = require("./book.routes");
const authRoutes = require("./auth.routes");

router.use("/", authRoutes);
router.use("/books", bookRoutes);

module.exports = router;
