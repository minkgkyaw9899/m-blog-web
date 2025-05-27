import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/authContext";
import { axiosInstance } from "@/lib/axiosInstance";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PlusCircleIcon } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router";
import MasonryGrid from "@/components/home/MasonryGrid";
import Lottie from "lottie-react";
import AnimationData from "@/assets/loading.json";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
} from "@/components/ui/pagination";

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

  // const { data } = useQuery({
  //   queryKey: ["posts"],
  //
  // });

  const {
    data,
    isPending,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    fetchPreviousPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam }) => {
      const response = await axiosInstance.get<PostsResponse>(
        `/posts?page=${pageParam}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (res) => {
      return res.meta.hasNextPage ? res.meta.page + 1 : undefined;
    },
  });

  if (isPending) {
    return (
      <div className="flex items-center justify-center">
        <Lottie animationData={AnimationData} />
      </div>
    );
  }

  console.log("data", data);

  return (
    <div className="">
      <section className="flex justify-between items-start">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Posts</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Link to={"/posts/create"}>
          <Button>
            <PlusCircleIcon />
            Create Post
          </Button>
        </Link>
      </section>

      <section className="w-full pt-10 mb-4 h-full">
        <MasonryGrid posts={data?.pages?.flatMap((page) => page.data)} />
        <Pagination>
          <PaginationContent>
            {/* <PaginationItem>
              <PaginationPrevious
                onClick={() => hasPreviousPage && fetchPreviousPage()}
              />
            </PaginationItem> */}
            <PaginationItem>
              <PaginationNext onClick={() => hasNextPage && fetchNextPage()} />
            </PaginationItem>

            {/* <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem> */}
          </PaginationContent>
        </Pagination>
      </section>
    </div>
  );
};

export default HomePage;
