import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <span className="sr-only">Split-A-Bill</span>
      <p className="text-2xl font-bold">
      Split-A<span className="text-green-600">-Bill </span>
      </p>
    </Link>
  );
};


export default Logo;
