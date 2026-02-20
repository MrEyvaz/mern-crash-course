import { useContext, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { ThemeContext } from "../context/ThemeContext";
import { useProductStore } from "../store/product";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
    const { themeStyles } = useContext(ThemeContext)
    const { deleteProduct, updateProduct } = useProductStore()
    const [isOpen, setIsOpen] = useState(false)
    const [updatedProduct, setUpdatedProduct] = useState(product)

    const handleDelete = async () => {
        const { success, message } = await deleteProduct(product._id)
        if (!success) {
            toast.error(message)
        } else {
            toast.success(message)
        }
    }

    const handleUpdate = async () => {
        const { success, message } = await updateProduct(product._id, updatedProduct)
        if (!success) {
            toast.error(message)
        } else {
            toast.success(message)
            setIsOpen(false)
        }
    }

    return (
        <>
            <div className={`${themeStyles.card} font-bold m-4 rounded-xl shadow-2xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl`}>
                <div className="rounded-t-lg overflow-hidden h-60">
                    <img src={product.image} className="w-full h-full object-cover" />
                </div>

                <div className="p-3">
                    <h1 className="font-semibold ">{product.name}</h1>
                    <p className="mt-2 font-bold">${product.price}</p>
                    <div className="flex gap-3 mt-4">
                        <button className="bg-cyan-500 text-black rounded-md p-2" onClick={() => setIsOpen(true)}>
                            <FaRegEdit />
                        </button>
                        <button className="bg-red-400 text-black rounded-md p-2" onClick={handleDelete}>
                            <RiDeleteBin5Fill />
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

                    <div className="w-full max-w-md bg-slate-800 p-6 rounded-lg shadow-lg">

                        <h2 className="text-white text-lg font-semibold mb-6">
                            Update Product
                        </h2>

                        <input type="text"
                            className="w-full mb-4 outline-none border
                             border-slate-500 rounded bg-slate-700 text-white px-4 py-2"
                            value={updatedProduct.name}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                        />
                        <input type="text"
                            className="w-full mb-4 outline-none border
                             border-slate-500 rounded bg-slate-700 text-white px-4 py-2"
                            value={updatedProduct.price}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                        />
                        <input type="text"
                            className="w-full mb-4 outline-none border
                             border-slate-500 rounded bg-slate-700 text-white px-4 py-2"
                            value={updatedProduct.image}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                        />

                        <div className="flex justify-end gap-6 mt-3">
                            <button className="bg-sky-300 rounded p-2" onClick={handleUpdate}>Update</button>
                            <button className="text-white" onClick={()=> setIsOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default ProductCard