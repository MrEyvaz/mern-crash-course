import { useState } from "react"
import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { useProductStore } from "../store/product"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const CreatePage = () => {
  const { dark, themeStyles } = useContext(ThemeContext)
  const navigate = useNavigate()

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  })

  const { createProduct } = useProductStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { success, message } = await createProduct(newProduct)
    console.log(success, message);
    if (!success) {
      toast.error(message)
    } else {
      toast.success('Successfully toasted!')
      navigate("/")
    }
    setNewProduct({ name: "", price: "", image: "" })
  }

  return (
    <div className="flex justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        <h1 className={`text-3xl sm:text-4xl mb-10 text-center ${dark ? "text-white" : "text-gray-700"} font-bold`}>Create New Product</h1>
        <form className={`${themeStyles.createCard} rounded-lg p-6 flex flex-col gap-4`} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className={`${themeStyles.input} outline-none rounded-lg px-4 py-2`}
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className={`${themeStyles.input} outline-none rounded-lg px-4 py-2 `}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            className={`${themeStyles.input} outline-none rounded-lg px-4 py-2`}
          />
          <button type="submit" className="bg-[#8ecdf0] rounded-lg text-black font-semibold py-2">Add Product</button>
        </form>
      </div>
    </div>
  )
}

export default CreatePage