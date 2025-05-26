import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axiosInstance";
import { AxiosError, type AxiosResponse } from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";

const formSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(3, "Title must be at least 3 characters")
    .max(100, "Maximum 100 only"),
  content: z
    .string({ required_error: "Content is required" })
    .min(10, "Content must be at least 10 characters")
    .max(5000, "Maximum 5000 only"),
});

type FormFields = z.infer<typeof formSchema>;

type CreatePostResponse = {
  meta: {
    status: number;
    message: string;
  };
  data: {
    id: number;
    title: string;
    content: string;
    image: null | string;
    authorId: number;
    updatedAt: Date;
    createdAt: Date;
  };
};

const CreatePostForm = () => {
  const { handleSubmit, ...otherFormField } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["create post"],
    mutationFn: async (data: FormFields) => {
      const response = await axiosInstance.post<
        FormFields,
        AxiosResponse<CreatePostResponse>
      >("/posts", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onSuccess: async (res) => {
      if (res.meta.status === 200) {
        toast.success(res.meta.message);
        otherFormField.reset();
        return navigate("/", {
          replace: true,
        });
      }
    },
    onError: (err) => {
      if (err instanceof AxiosError)
        toast.error(err.response?.data.meta.message);
    },
  });

  const onSubmit = async (value: FormFields) => {
    await mutateAsync(value);
  };

  return (
    <Form handleSubmit={handleSubmit} {...otherFormField}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-[650px]">
          <CardHeader>
            <CardTitle className="text-center">Create New Post</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <FormField
                name={"title"}
                control={otherFormField.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Title</FormLabel>
                    <Input {...field} placeholder="Type your post title here" />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name={"content"}
                control={otherFormField.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel>Content</FormLabel>
                    <Textarea {...field} placeholder="Type your content here" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex">
            <Button
              disabled={isPending || !otherFormField.formState.isValid}
              type="submit"
              className="w-full"
            >
              Post <UploadIcon />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default CreatePostForm;
