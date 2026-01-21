import { useEffect, useState } from "react";
import BlogTitleCard from "../components/BlogTitleCard";
import BlogCard from "../components/BlogCard";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import BlogCardScaliton from "../components/BlogCardScaliton";
import BlogTItleCardScaliton from "../components/BlogTItleCardScaliton";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

interface BlogType {
  id: number;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}

function Blogs() {
  const [id, setId] = useState<number>();
  const api = import.meta.env.VITE_API!;

  //functions for React Queary
  //get all blogs
  const getBlogs = async (): Promise<BlogType[]> => {
    const res = await fetch(`${api}/blogs`);

    if (!res.ok) {
      throw new Error("Failed to Fetch Blogs");
    }

    return res.json();
  };

  //get single blog
  const getBlog = async (id:number):Promise<BlogType> =>{
    const res = await fetch(`${api}/blogs/${id}`)
    
    if (!res.ok) {
      throw new Error("Failed to Fetch Blog");
    }

    return res.json()
  }




  //React Quearies
  //get AllBlogs
  const {data: blogs,isLoading,error,isError} = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    select: (data) =>
    [...data].sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    ),
  });

  //get single blog
  const {data:blog,isLoading:isBlogLoading,error:blogError} = useQuery({
    queryKey:["blog",id],
    queryFn: () => getBlog(id!),
    enabled: !!id,
  })



 
  useEffect(() => {
  if (error) {
    toast.error(error.message || "Failed to fetch blogs");
  }
  if(blogError){
    toast.error(blogError.message || "Failed to fetch blog")
  }
}, [error,blogError]);

  if (isLoading) {
    return (
      <div className="flex-grow flex md:flex-row flex-col justify-start md:p-5 p-2 min-h-screen">
        <div className="md:max-h-full max-h-80 overflow-y-scroll md:min-w-xl border-b">
          {Array.from({length:7}).map((b,i) => {
            return (
              <div key={i}>
                <BlogTItleCardScaliton/>
              </div>
            );
          })}
        </div>
        <div className="px-5 flex justify-center items-start w-full pt-5">
          <BlogCardScaliton/>
        </div>
      </div>
    );
  }

  if(isError){
    return  <p  className="text-3xl text-red-500 my-50 h-screen text-center font-semibold ">Something Went Wrong</p>

  }

  return (
    <div className="flex-grow flex md:flex-row flex-col justify-start md:p-5 p-2 min-h-screen">
      <div className="md:h-screen h-80 border-b mb-9 overflow-y-scroll md:min-w-xl static mt-10">
        <Link className="absolute top-16 left-5" to={"create-blog"}><Button className="bg-blue-500 hover:bg-blue-600 cursor-pointer" >Create Blog</Button></Link>
        {blogs?.map((b) => {
          return (
            <div key={b.id} onClick={() => setId(b.id)}>
              <BlogTitleCard
                title={b.title}
                category={b.category}
                description={b.description}
                date={b.date}
                current={b.id === id}
              />
            </div>
          );
        })}
      </div>
      <div className="md:px-5 flex justify-center items-start w-full md:mt-20 ">
        {!id && (
          <div className="text-gray-500 text-center my-20">
            <p className="text-lg font-medium">Select a blog</p>
            <p className="text-sm">Choose a blog from the list to read</p>
          </div>
        )}
        {
          !blog && id && (
            <BlogCardScaliton/>
          )
        }
        {blog && !isBlogLoading && (
          <BlogCard
            title={blog.title}
            category={blog.category}
            description={blog.description}
            date={blog.date}
            coverImage={blog.coverImage}
            content={blog.content}
          />
        )}
      </div>
      
    </div>
    
  );
}

export default Blogs;
