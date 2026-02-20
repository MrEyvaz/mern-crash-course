import { Link } from "react-router-dom"
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { LuSquarePlus } from "react-icons/lu";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const { dark, setDark } = useContext(ThemeContext)

  const buttonStyle = dark ? "bg-gray-700 text-white" : "bg-gray-100 text-black"

  return (
    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <div>
        <Link to={"/"} className="bg-gradient-to-r 
        from-cyan-400 to-blue-500 bg-clip-text 
        text-transparent text-lg sm:text-3xl font-bold">
          Product Store 🛒
        </Link>
      </div>

      <div className="flex text-white text-sm gap-4 sm:text-2xl sm:gap-6 ">
        <Link to={"/create"}>
          <button className={`icon-btn ${buttonStyle}`}>
            <LuSquarePlus />
          </button>

        </Link>

        <Link>
          <button onClick={() => setDark(!dark)} className={`icon-btn ${buttonStyle}`}>
            {dark ? <MdOutlineLightMode /> : <MdDarkMode />}
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar