import { Card, CardAction, CardContent, CardDescription, CardTitle } from "./ui/card"

interface BlogType{
  title:string
  category:string[]
  description:string
  date:string
  coverImage:string
  content:string
}

function BlogCard({title,category, description, date, coverImage, content} : BlogType) {
  return (
    <div className="w-full">
      <Card className="pt-0">
        
            <img src={coverImage} className="w-full md:h-120 h-60 object-cover rounded-t-xl"></img>
          
       
          
          
          <CardContent className="flex flex-col gap-2">
            
              <div className="flex justify-center gap-2">
                {category.map((c,i)=><p key={i} className="text-sm  text-blue-500 border border-blue-200 rounded-xl px-2 font-semibold">{c}</p>)}
              </div>
           <div className="flex md:flex-row flex-col md:justify-between">
            <p className="mx-auto text-sm text-gray-400 font-medium md:hidden block">{new Date(date).toLocaleDateString("en-IN",{day:"2-digit",month:"short", year:"numeric"})}</p>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardAction className="mx-auto md:mx-0 md:block hidden"> {new Date(date).toLocaleDateString("en-IN",{day:"2-digit",month:"short", year:"numeric"})}</CardAction>
            </div>
            
            <CardDescription>{description}</CardDescription>
          </CardContent>
          
          <CardContent>
            {content}
          </CardContent>
            
          
       
      </Card>
    </div>
  )
}

export default BlogCard