import { Card, CardContent} from './ui/card'

function BlogCardScaliton() {
  return (
    <Card className="overflow-hidden w-full pt-0">
  <div className="w-full md:h-150 h-50 bg-zinc-300 animate-pulse" />

  <CardContent className="space-y-4 mt-4">
    <div className="flex gap-2">
      <div className="rounded h-4 w-16 bg-zinc-300 animate-pulse" />
      <div className="rounded h-4 w-16 bg-zinc-300 animate-pulse" />
    </div>

    <div className="rounded h-4 w-2/3 bg-zinc-300 animate-pulse" />
    <div className="rounded h-4 w-full bg-zinc-300 animate-pulse" />
    <div className="rounded h-4 w-5/6 bg-zinc-300 animate-pulse" />
  </CardContent>
</Card>

  )
}

export default BlogCardScaliton