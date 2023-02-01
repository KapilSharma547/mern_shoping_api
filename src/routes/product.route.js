const Product = require("../models/Product.model");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// Create Product

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json({ message: "Product Created ", savedProduct });
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update any Product

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Product Updated Successfull", updatedProduct });
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete Any Product

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json("Product has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get Product

router.get("/find/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get All Products

router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 });
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json({ message: "Product Fetch Succefull", products });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
