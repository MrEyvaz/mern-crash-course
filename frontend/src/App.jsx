import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import { useContext } from "react"
import { ThemeContext } from "./context/ThemeContext"

function App() {
  const { themeStyles } = useContext(ThemeContext)

  return (
    <div className={`min-h-screen ${themeStyles.background}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </div>
  )
}

export default App