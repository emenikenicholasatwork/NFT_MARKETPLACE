const express = require("express");
const nftController = require("../controllers/nftController");
const router = express.Router();

router.route("/").get(nftController.getAllNfts).post(nftController.createNft);

router.route("/:id").get(nftController.getNft);

module.exports = router;
