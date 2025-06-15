import Product from "../models/product.model.js";

export const CreateNewProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      category,
      category2,
      productcategory,
      quantity,
      event,
      image,
    } = req.body.productData;

    const { userId } = req.body;

    if (
      !title ||
      !price ||
      !category ||
      !category2 ||
      !productcategory ||
      !quantity ||
      !event ||
      !image ||
      !userId
    ) {
      return res.json({ success: false, error: "All fields are required." });
    }

    // const isProductExist = await Product.findOne({
    //   title,
    //   category,
    //   creatorId: userId,
    // });

    // if (isProductExist) {
    //   return res.json({
    //     success: false,
    //     error: "Product already exists with this title and category.",
    //   });
    // }

    const newProduct = new Product({
      title,
      price,
      category,
      category2,
      productcategory,
      quantity,
      event,
      image,
      creatorId: userId,
    });

    await newProduct.save();

    return res.json({
      success: true,
      message: "Product successfully created.",
    });
  } catch (error) {
    console.log("CreateNewProduct error:", error);
    return res.json({ error: error.message, success: false });
  }
};

// Get all Men products
export const GetMenProducts = async (req, res) => {
  try {
    const products = await Product.find({ category: "Men" });
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

// Get all Women products
export const GetWomenProducts = async (req, res) => {
  try {
    const products = await Product.find({ category: "Women" });
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

// Get all Kids products
export const GetKidsProducts = async (req, res) => {
  try {
    const products = await Product.find({ category: "Kids" });
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

// Get all Home products
export const GetHomeProducts = async (req, res) => {
  try {
    const products = await Product.find({ category: "Home" });
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

export const GetSingleProducts = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, error: "Product ID is required." });
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ success: false, error: "Product not found." });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};