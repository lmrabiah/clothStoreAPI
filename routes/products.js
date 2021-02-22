const express = require("express");
// const upload = require("../middleware/multer");
const router = express.Router();
const {
  deletProduct,
  productList,
  updateProduct,
  fetchProduct,
  creatProduct,
} = require("../controllers/productController");
// const passport = require("passport");

router.param("productId", async (req, res, next, productId) => {
  const product = await fetchProduct(productId, next);
  if (product) {
    req.product = product;
    next();
  } else {
    const err = {
      status: 404,
      message: "product not found",
    };
    next(err);
  }
});

router.delete(
  "/:productId",
  // passport.authenticate("jwt", { session: false }),
  deletProduct
);

router.get("/", productList);

router.put(
  "/:productId",
  // passport.authenticate("jwt", { session: false }),
  // upload.single("img"),
  updateProduct
);

router.post(
  "/products",
  //i can add store if i don't have token
  // passport.authenticate("jwt", { session: false }),
  //
  // upload.single("img"),
  creatProduct
);

module.exports = router;
