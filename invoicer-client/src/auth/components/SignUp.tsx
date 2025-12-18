import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpData } from "@/auth/constants/schema";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import signup from "@/assets/signup.jpeg";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: SignUpData) => {
    console.log("Form submitted:", data);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/signup",
        data
      );
  
      console.log("Signup success:", res.data);
  
      navigate("/signin");
    } catch (error: any) {
      console.error(
        "Signup failed:",
        error.response?.data?.message || error.message
      );
    }
  };
  

  return (
    <div className="flex flex-col md:flex-row w-screen h-screen">
      <div className="hidden md:block md:w-1/2 h-64 md:h-full relative">
        <img
          src={signup}
          alt="Sign Up"
          className="w-full h-full object-cover absolute inset-0"
          loading="eager"
        />
      </div>

      <div className="w-full md:w-1/2 h-full flex items-center justify-center px-6 md:px-10">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-sm text-gray-500">Please fill in your details</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} placeholder="Your name" />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...register("email")} placeholder="you@example.com" />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
             type="submit"
             className="w-full bg-purple-400 text-white 
             hover:bg-purple-300 
             transition-colors duration-200"
            >
          Sign Up
             </Button>

          </form>

          <div className="flex items-center justify-center">
            <span className="text-sm text-gray-500">or</span>
          </div>

          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
            <FcGoogle className="text-xl" />
            Sign up with Google
          </Button>

          <p className="text-center text-sm text-gray-500">
            Already got an account?{" "}
            <a href="/signin" className="text-blue-500 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
