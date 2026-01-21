import { Link, useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useEffect } from "react";


function Navbar() {
    const location = useLocation()
    const path = location.pathname
    
  useEffect(()=>{
  },[path])

  return (
    <div className="border-b flex justify-between items-center mx-4">
        <Link to={"/"} className="font-semibold text-xl text-zinc-900 flex justify-center items-center gap-2 whitespace-nowrap my-2"> <img src="/vite.svg" className=" cursor-pointer h-6"></img>CA MONK</Link>

        <nav className="flex justify-center items-center gap-6 text-zinc-800 ">
            <Link className={`hidden md:block ${path==="/"?"border-b-2  border-blue-500":""}`} to={"/"} >Blogs</Link>
            <Link className={`hidden md:block ${path==="/Tools"?"border-b-2  border-blue-500":""}`} to={"/Tools"} >Tools</Link>
            <Link  className={`hidden md:block ${path==="/Events"?"border-b-2  border-blue-500":""}`}  to={"/Events"} >Events</Link>
            <Link className={`hidden md:block ${path==="/Practice"?"border-b-2  border-blue-500":""}`} to={"/Practice"} >Practice    </Link>
            <Link className={`hidden md:block ${path==="/Points"?"border-b-2  border-blue-500":""}`} to={"/Points"} >Points</Link>
           
        </nav>
       <Link to={"/Profile"} className="py-2 hidden md:block"> <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer font-bold">Profile</Button></Link>
       <div className="md:hidden block">
        <DropdownMenu>
  <DropdownMenuTrigger><HiMiniBars3CenterLeft size={20}/></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem><Link className={`${path==="/"?"bg-blue-600 rounded px-1 w-full text-white":""}`} to={"/"} >Blogs</Link></DropdownMenuItem>
    <DropdownMenuItem><Link className={`${path==="/Tools"?"bg-blue-600 rounded px-1 w-full text-white":""}`} to={"/Tools"} >Tools</Link></DropdownMenuItem>
    <DropdownMenuItem><Link   className={`${path==="/Events"?"bg-blue-600 rounded px-1 w-full text-white":""}`} to={"/Events"} >Events</Link></DropdownMenuItem>
    <DropdownMenuItem><Link  className={`${path==="/Practice"?"bg-blue-600 rounded px-1 w-full text-white":""}`} to={"/Practice"} >Practice    </Link></DropdownMenuItem>
    <DropdownMenuItem><Link  className={`${path==="/Points"?"bg-blue-600 rounded px-1 w-full text-white":""}`}  to={"/Points"} >Points</Link></DropdownMenuItem>
    <DropdownMenuItem><Link className="bg-blue-500 hover:bg-blue-600 cursor-pointer px-2 text-center rounded text-zinc-100 font-semibold" to={"/Profile"}>Profile</Link>
</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
       </div>
    </div>
  )
}

export default Navbar