import { create } from "zustand";
import axios from "axios";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const { data } = await axios.post("/api/products", newProduct);
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      console.log("Error in creating product", error.message);
      return {
        success: false,
        message: error.response?.data?.message || "Error creating product",
      };
    }
  },

  fetchProducts: async () => {
    try {
      const { data } = await axios.get("/api/products");
      set({ products: data.data });
    } catch (error) {
      console.log("Error fetching product", error.message);
      return {
        success: false,
        message: error.response?.data?.message || "Error fetching product",
      };
    }
  },

  deleteProduct: async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));
      return { success: true, message: "Product deleted successfully" };
    } catch (error) {
      console.log("Error deleting product", error.message);
      return {
        success: false,
        message: error.response?.data?.message || "Error deleting product",
      };
    }
  },

  updateProduct: async (id, updatedProduct) => {
    try {
      const { data } = await axios.put(`/api/products/${id}`, updatedProduct);
      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? data.data : product,
        ),
      }));
      return { success: true, message: "Product updated successfully" };
    } catch (error) {
      console.log("Error updating product", error.message);
      return {
        success: false,
        message: error.response?.data?.message || "Error updating product",
      };
    }
  },
}));
