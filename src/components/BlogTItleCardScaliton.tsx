import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

function BlogTItleCardScaliton() {
  return (
    <div>
        <Card className="mb-4 ">
       
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                
                <p className=" rounded h-4 w-20 bg-zinc-300 animate-pulse"></p>
                
                <p className="w-16 rounded h-4 bg-zinc-300 animate-pulse"></p>
              </div>
              <CardTitle className="w-20 rounded  h-4 bg-zinc-300 animate-pulse"></CardTitle>
              <CardDescription className="w-2/3 rounded  h-4 bg-zinc-300 animate-pulse"></CardDescription>
            </div>
          </CardContent>
        
      </Card>
    </div>
  )
}

export default BlogTItleCardScaliton