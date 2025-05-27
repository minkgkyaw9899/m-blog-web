import type { PostsResponse } from "@/pages/HomePage";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import UpdateLocal from "dayjs/plugin/updateLocale";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { HeartIcon, MessageCircleMoreIcon } from "lucide-react";
import { Link } from "react-router";

dayjs.extend(UpdateLocal);
dayjs.extend(RelativeTime);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "One day",
    dd: "%d days",
    M: "One month",
    MM: "%d months",
    y: "One year",
    yy: "%d years",
  },
});

type Props = {
  posts?: PostsResponse["data"];
};

const postFormatter = (posts: Props["posts"]) => {
  if (!posts) return [];
  const expectArray = [];
  console.log("posts", posts);
  for (let i = 0; i < posts.length; i += 4) {
    expectArray.push(posts.slice(i, i + 4));
  }
  return expectArray;
};

const MasonryGrid = ({ posts }: Props) => {
  if (!posts) return;
  return (
    <div className="grid grid-rows-4 gap-4">
      {postFormatter(posts).map((postArr) => (
        <div key={nanoid()} className="grid grid-cols-4 gap-4 ">
          {postArr.map((post) => (
            <Link key={post.id} to={`posts/${post.id}`}>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{post.title}</CardTitle>
                    <span className="text-sm font-thin text-slate-500">
                      {dayjs(post.createdAt).fromNow()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <CardDescription>{post.author.name}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  {post.image ? (
                    <img
                      className="h-auto max-w-full rounded-lg"
                      src={post.image}
                      alt=""
                    />
                  ) : (
                    <p className="text-slate-600 text-sm tracking-tight text-pretty">
                      {post.content.slice(0, 80)}
                    </p>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <HeartIcon stroke="#e11d48" />
                    {post.totalLikes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircleMoreIcon />
                    {post.totalComments}
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;
