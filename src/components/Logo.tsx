import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <span className="sr-only">SplitWise</span>
      <p className="text-2xl font-bold">
        Split<span className="text-green-600">Wise </span>
      </p>
    </Link>
  );
};


export default Logo;
