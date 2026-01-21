import { Route, Routes } from "react-router-dom"
import Blogs from "./pages/Blogs"
import NotFound from "./pages/NotFound"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Toaster } from "react-hot-toast"
import CreateBlogForm from "./pages/CreateBlogForm"

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" reverseOrder={false}/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Blogs/>} />
        <Route path="/create-blog" element={<CreateBlogForm/>}/>
        <Route path="*" element={<NotFound/>}/>

      </Routes>
      <Footer/>
    </div>
  )
}

export default App