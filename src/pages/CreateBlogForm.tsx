import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "../components/ui/input-group";
import { useState } from "react";
import { Label } from "../components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "../components/ui/calendar";
import { Card, CardContent } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title can't be Empty.",
  }),
  category: z
    .array(z.string())
    .min(1, "Select at least one category")
    .max(2, "You can select at most 2 categories"),
  description: z.string().min(1, {
    message: "description can't be Empty.",
  }),
  date: z.date(),
  coverImage: z.string().min(1, {
    message: "coverImage can't be Empty.",
  }),
  content: z
    .string()
    .min(1, {
      message: "content can't be Empty.",
    })
    .max(5000, {
      message: "Max 5000 characters are allowed",
    }),
});

function CreateBlogForm() {
  const [open, setOpen] = useState(false);
  const api = import.meta.env.VITE_API!;
  const queryClient = useQueryClient();

  const categories = [
    "FINANCE",
    "TECH",
    "CAREER",
    "EDUCATION",
    "REGULATIONS",
    "LIFESTYLE",
  ];
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: [],
      description: "",
      date: undefined,
      coverImage: "",
      content: "",
    },
  });

  const createBlog = async (data: z.infer<typeof formSchema>) => {
    const res = await fetch(`${api}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        date: data.date.toISOString(),
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to create blog");
    }

    return res.json();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog created successfully");
      form.reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <div className="flex-grow md:w-5xl md:mx-auto mx-2 my-5">
      <Card>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories (max 2)</FormLabel>

                    <div className="flex flex-wrap gap-4">
                      {categories.map((cat) => {
                        const isChecked = field.value.includes(cat);
                        const disabled = !isChecked && field.value.length >= 2;

                        return (
                          <div key={cat} className="flex items-center gap-2">
                            <Checkbox
                              checked={isChecked}
                              disabled={disabled}
                              className="border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-white"
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...field.value, cat]);
                                } else {
                                  field.onChange(
                                    field.value.filter((v) => v !== cat),
                                  );
                                }
                              }}
                            />
                            <span
                              className={
                                disabled ? "text-muted-foreground" : ""
                              }
                            >
                              {cat}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="date" className="px-1">
                          Date
                        </Label>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="date"
                              className="w-48 justify-between font-normal"
                            >
                              {field.value
                                ? field.value.toLocaleDateString()
                                : "Select date"}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                field.onChange(date);
                                setOpen(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image</FormLabel>
                    <FormControl>
                      <Input placeholder="coverImage" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <InputGroup>
                        <InputGroupTextarea
                          placeholder="Enter your message"
                          {...field}
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText className="text-muted-foreground text-xs">
                            5000 characters Max
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isPending ? "Creating..." : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateBlogForm;
