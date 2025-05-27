import { NavLink, useParams } from "react-router";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "dayjs";
import { HeartIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axiosInstance";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import Lottie from "lottie-react";
import AnimationData from "@/assets/loading.json";
import { isAxiosError } from "axios";

type Response = {
  meta: {
    status: number;
    message: string;
  };
  data: {
    id: number;
    title: string;
    content: string;
    image: null | string;
    authorId: null;
    updatedAt: Date;
    createdAt: Date;
    author: {
      id: number;
      name: string;
      avatar: null | string;
    };
    isLiked: boolean;
    totalLikes: number;
    totalComments: number;
  };
};

const PostDetailPage = () => {
  const param = useParams();

  const token = useContext(AuthContext).token;

  const { isPending, error, data } = useQuery({
    queryKey: ["post", param.postId],
    enabled: !!param.postId,
    queryFn: async () => {
      try {
        const response = await axiosInstance.get<Response>(
          `/posts/${param.postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return response.data;
      } catch (error) {
        if (isAxiosError(error)) {
          throw new Error(
            error.response?.data.meta.message || "An error occurred"
          );
        }
      }
    },
  });

  return (
    <div className="my-6 space-y-4 flex flex-col justify-center ">
      <section className="flex justify-between items-start">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <NavLink to={"/"}>Posts</NavLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {data && (
              <BreadcrumbItem>
                <BreadcrumbPage>{data.data.title}</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </section>
      <p className="text-2xl font-semibold tracking-wide text-center text-slate-700">
        {data?.data.title}
      </p>
      <>
        {error ? (
          <div className="flex items-center justify-center">
            <p className="text-2xl tracking-widest font-semibold text-rose-500">
              {error.message}
            </p>
          </div>
        ) : data ? (
          <>
            {data?.data.image !== null && (
              <div className="w-3/5 h2/5 self-center">
                <AspectRatio ratio={16 / 9} className="bg-muted">
                  <img
                    src={data?.data.image}
                    alt="Photo by Drew Beamer"
                    className="h-full w-full rounded-md object-cover"
                  />
                </AspectRatio>
              </div>
            )}
            <div className="flex justify-between items-center">
              <div className="flex items-start gap-4">
                <Avatar className="cursor-pointer">
                  <AvatarImage src={data?.data.author.avatar ?? ""} />
                  <AvatarFallback>
                    {data?.data.author.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-slate-600 font-semibold capitalize">
                    {data?.data.author.name}
                  </p>
                  {data && (
                    <p className="text-slate-400 font-light text-sm">
                      {dayjs(data.data.createdAt).fromNow()}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1">
                <HeartIcon
                  fill={data?.data.isLiked ? "#e11d48" : "transparent"}
                  stroke="#e11d48"
                />
                <p className="text-slate-500 font-normal text-sm">
                  {data?.data.totalLikes || 0} likes
                </p>
              </div>
            </div>

            <div>
              <p className="content indent-12 text-slate-700 tracking-tight">
                {data?.data.content}
              </p>
            </div>
            <div className="border-b border-slate-200 my-8" />
            <div>
              <p className="text-slate-500 font-normal text-sm">
                {data.data.totalComments > 0
                  ? `${data.data.totalComments} comments`
                  : "No comments yet"}
              </p>
            </div>
          </>
        ) : isPending ? (
          <div className="flex items-center justify-center">
            <Lottie animationData={AnimationData} />
          </div>
        ) : null}
      </>
    </div>
  );
};

export default PostDetailPage;
