import { useEffect } from "react"
import { useProductStore } from "../store/product"
import ProductCard from "../components/ProductCard"
import { Link } from "react-router-dom"

const HomePage = () => {
  const { products, fetchProducts } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="bg-gradient-to-r text-center mt-8
          from-cyan-400 to-blue-500 bg-clip-text 
          text-transparent text-lg sm:text-3xl font-bold">
        Current Products 🚀
      </h1>
      {products.length === 0 ? (
        <div className="flex justify-center mt-16 gap-4 font-bold text-lg">
          <span className="text-gray-400">No products found 😥</span>
          <Link to={"/create"} className="text-sky-500 hover:underline">Create a product</Link>
        </div>
      ) : (
        <div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage