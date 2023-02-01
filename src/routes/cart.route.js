const Cart = require("../models/Cart.model");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//Create Cart

router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json({ message: "Cart created Successfull", savedCart });
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Cart.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({ message: "Cart Updated", updatedProduct });
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const { id } = req.params;

  try {
    await Cart.findByIdAndDelete(id);
    res.status(200).json("Cart has benn deleted...");
  } catch (error) {
    res.status(500).json(err);
  }
});

//Get User Cart

router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

///Get All

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
