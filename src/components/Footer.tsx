import { Link } from "react-router-dom"

function Footer() {
  return (
    <div className="bg-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 text-zinc-200 p-5 md:p-10 gap-20">

        <div className="flex flex-col items-start md:px-4 gap-2 mx-auto md:max-w-xs max-w-34">
            <Link to={"/"} className="font-bold text-xl flex justify-center items-center gap-2 whitespace-nowrap"> <img src="/vite.svg" className="bg-white p-1 rounded cursor-pointer h-6"></img>CA MONK</Link>

            <p className="text-zinc-400">Empowering the next genration of financial leaders with tools, community and knowledge</p>
            
        </div>
        <div className="flex flex-col items-start md:px-4 gap-2 mx-auto">
            <h1 className="font-bold text-xl text-gray-400">RESOURCES</h1>
            <Link to={"/"}>Blog</Link>
            <Link to={"/"}>webinars</Link>
            <Link to={"/"}>Case studies</Link>
        </div>
        <div className="flex flex-col items-start  md:px-4 gap-2 mx-auto">
            <h1 className="font-bold  text-xl text-gray-400">PLATFORM</h1>
            <Link to={"/"}>Job Boards</Link>
            <Link to={"/"}>Practice Tests</Link>
            <Link to={"/"}>Mentorship</Link>
        </div>
        <div className="flex flex-col items-start md:px-4 gap-2 mx-auto">
            <h1 className="font-bold text-xl  text-gray-400">CONNECT</h1>
            <Link to={"/"}>Linkedin</Link>
            <Link to={"/"}>Twitter</Link>
            <Link to={"/"}>instagram</Link>
        </div>
    </div>
  )
}

export default Footer