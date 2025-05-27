import CreatePostForm from "@/components/create-post/CreatePostForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { NavLink } from "react-router";

const CreatePostPage = () => {
  return (
    <div>
      <section className="flex justify-between items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <NavLink to={"/"}>Posts</NavLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Create Post</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <section className="flex my-10 items-center justify-center">
        <CreatePostForm />
      </section>
    </div>
  );
};

export default CreatePostPage;
