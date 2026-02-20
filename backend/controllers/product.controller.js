import mongoose from "mongoose";
import { Product } from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in fetching product", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;
  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product({ name, price, image });

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct }); // json converts js obj to json string
  } catch (error) {
    console.log("Error in creating product", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({success:false,message:"Invalid Product Id"})
  }

  try {
    const updatedProject = await Product.findByIdAndUpdate(id, product, {new:true});
    res.status(200).json({ success: true, data: updatedProject });
  } catch (error) {
    console.log("Error in deleting product", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({success:false,message:"Invalid Product Id"})
  }
  
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("Error in deleting product", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}