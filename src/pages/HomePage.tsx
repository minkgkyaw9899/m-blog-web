import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/authContext";
import { axiosInstance } from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { PlusCircleIcon } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router";
import MasonryGrid from "@/components/home/MasonryGrid";

export type PostsResponse = {
  meta: {
    status: 200;
    message: "Successfully get all posts";
    limit: 10;
    total: 3;
    page: 1;
    hasNextPage: false;
    totalPages: 1;
  };
  data: {
    id: number;
    title: string;
    content: string;
    image: null | string;
    updatedAt: Date;
    createdAt: Date;
    author: {
      id: number;
      name: string;
      avatar: null | string;
    };
    totalLikes: number;
    totalComments: number;
  }[];
};
const HomePage = () => {
  const { token } = useContext(AuthContext);

  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axiosInstance.get<PostsResponse>("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });

  return (
    <div className="">
      <section className="flex justify-between items-start">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Home</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Link to={"/post/create"}>
          <Button>
            <PlusCircleIcon />
            Create Post
          </Button>
        </Link>
      </section>

      <section className="w-full py-10 h-full">
        <MasonryGrid posts={data?.data} />
      </section>
    </div>
  );
};

export default HomePage;
