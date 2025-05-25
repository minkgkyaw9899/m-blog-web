import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        M Blog
      </span>
    </Link>
  );
};

export default Logo;
