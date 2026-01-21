import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "./ui/card";

interface Props {
  title: string;
  category: string[];
  description: string;
  date: string;
  current:boolean
}

function BlogTitleCard({ title, category, description, date ,current}: Props) {
  return (
    <div className="">
      <Card className={`mt-3 cursor-pointer transition hover:shadow-md ${current ? "border-l-4 border-blue-500" : ""}`}>
        
          <CardContent>
            <div className="flex flex-col gap-1 md:gap-2">
              <div className="flex justify-between">
                <div className="flex justify-center gap-2">
                {category.map((c,i)=><p key={i} className="text-sm  text-gray-500  rounded-xl  font-semibold">{c}</p>)}
              </div>
                <p className="md:text-md text-sm">{new Date(date).toLocaleDateString("en-IN",{day:"2-digit", month:"short" , year:"numeric"})}</p>
              </div>
              <CardTitle className="md:text-lg">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </CardContent>
       
      </Card>
    </div>
  );
}

export default BlogTitleCard;
