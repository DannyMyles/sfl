import React, { useContext, useState } from "react";
import { Toaster, toast } from "sonner";
import { Dropdown } from "primereact/dropdown";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { accReg } from "../../api/apiService";
import { AuthContext } from "../../context/AuthContext";

const Registration = () => {
  const { login, error, loading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    role: null,
    password: "",
  });


  const roles = [
    { label: "Admin", value: 1 },
    { label: "User", value: 2 },
  ];
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        username: formData.username, 
        password: formData.password,
        roleId: formData.role,
      };

      const resp = await accReg(payload);
      const user = resp.data.user;
      await login(user);
      console.log("registration response: ", user);
      toast.success("Registration successful!");
      navigate("/sfl/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration");
    }
  };

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
          <h1 className="text-[18px] mb-4">Register</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Full Name</span>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 border-[#efefef] rounded-md my-2 outline-[#eeeeee] bg-[#e9eaeb]"
                required
                aria-label="Name"
              />
            </label>

            <div className="flex justify-between gap-2">
              <div className="w-1/2">
                <label className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Username</span>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="p-2 border-[#efefef] rounded-md my-2 outline-[#eeeeee] bg-[#e9eaeb]"
                    required
                    aria-label="Username"
                  />
                </label>
              </div>

              <div className="w-1/2">
                <label className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Password</span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="p-2 border-[#efefef] rounded-md my-2 outline-[#eeeeee] bg-[#e9eaeb]"
                    required
                    aria-label="Password"
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <div className="w-1/2">
                <label className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="p-2 border-[#efefef] rounded-md my-2 outline-[#eeeeee] bg-[#e9eaeb]"
                    required
                    aria-label="Email"
                  />
                </label>
              </div>

              <div className="w-1/2">
                <label className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Role</span>
                  <Dropdown
                    value={formData.role}
                    options={roles}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.value })
                    }
                    placeholder="Select a role"
                    className="my-2"
                  />
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="p-2 bg-[#248E1D] text-white rounded"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                  Registering...
                </span>
              ) : (
                "Register"
              )}
            </button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm">Already registered? </span>
            <Link to="/" className="text-gray-500 hover:underline text-sm">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
