import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Joi from "joi";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import Logo from "../components/Logo";
import { authService, userService } from "services"; // Ensure userService includes registerUser

type SignUpDataType = {
  name: string;
  email: string;
  password: string;
};

const schema = Joi.object({
  name: Joi.string().required().label("Name"),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .label("Email"),
  password: Joi.string().required().min(5).label("Password"),
});

const SignUp = () => {
  useEffect(() => {
    document.title = "Split-A-Bill | SignUp";
  }, []);

  const [apiError, setApiError] = useState<string | null>(null);
  const [data, setData] = useState<SignUpDataType>({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<SignUpDataType>({ name: "", email: "", password: "" });

  const validate = () => {
    const { error } = schema.validate(data, { abortEarly: false });
    if (!error) return null;

    const validationErrors: any = {};
    for (const item of error.details) {
      validationErrors[item.path[0]] = item.message;
    }
    return validationErrors;
  };

  const validateProperty = ({ name, value }: any) => {
    const obj = { [name]: value };
    const { error } = schema.extract(name).validate(obj);
    return error ? error.details[0].message : null;
  };

  const handleChange = ({ currentTarget: input }: any) => {
    setApiError(null);
    const errorMessage = validateProperty(input);
    const newErrors = { ...errors, [input.name]: errorMessage };

    setData({ ...data, [input.name]: input.value });
    setErrors(newErrors);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newErrors = validate();
    if (newErrors) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await userService.registerUser(data.email, data.name);
      authService.loginWithJwt(response.headers["authorization"]);
      window.location.href = "/";
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setErrors({ ...errors, email: error.response.data });
      } else {
        setApiError(error.response.data);
      }
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <Logo />
        <h1 className="font-bold text-3xl mt-8">Create your account</h1>
        <form onSubmit={handleSubmit} className="mt-8">
          <FormInput label="Name" type="text" placeholder="Enter your name" name="name" error={errors.name} onChange={handleChange} />
          <FormInput label="Email" type="text" placeholder="Enter your email" name="email" error={errors.email} onChange={handleChange} />
          <FormInput label="Password" type="password" placeholder="Enter your password" name="password" error={errors.password} onChange={handleChange} />
          <Button type="link" width="w-full" margin="mt-6" disabled={!!validate() || !!apiError}>
            Create Account
          </Button>
        </form>
        <Link to="/signin" className="mt-3">
          Already have an account? <Button type="link" margin="ml-2">Sign in</Button>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
