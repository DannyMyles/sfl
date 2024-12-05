import React, { useContext, useState } from "react";
import { Toaster, toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAuthContext } from "../../context/useAuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    passcode: "",
  });
  const navigate = useNavigate();
  const { login, error, loading } = useContext(useAuthContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     await login(formData.email, formData.passcode);
  //   } catch (error) {
  //     toast.error("Invalid email or password");
  //   }
  // };

  const handleLogin = () =>{
    navigate('/sfl')
  
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Toaster position="top-right" richColors closeButton />
      <div className="relative flex-1 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-70"></div>

        <img
          src="/src/assets/sfl1e.jpg"
          alt="sfl"
          className="w-full h-full object-contain"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white text-edn text-2xl md:text-3xl font-bold px-4">
            SFL: Compliant E-signatures made easy
          </h2>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h1 className="text-[18px] mb-4">Login</h1>
          <form className="flex flex-col gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Email</span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="p-2 border-[#efefef] rounded-md my-4 outline-[#eeeeee] bg-[#e9eaeb]"
                required
                aria-label="Email"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Password</span>
              <input
                type="password"
                name="passcode"
                placeholder="Password"
                value={formData.passcode}
                onChange={handleChange}
                className="p-2 border border-[#efefef] rounded-md my-4 outline-[#eeeeee] bg-[#e9eaeb]"
                required
                aria-label="Password"
              />
            </label>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="p-2 bg-[#248E1D] text-white rounded"
              disabled={loading}
              onClick={handleLogin}
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-3 flex justify-center items-center" />
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm">Not registered? </span>
            <Link to="/register" className="text-gray-500 hover:underline text-sm">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
