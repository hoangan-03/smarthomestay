import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import a1 from "../../assets/images/shs-back.jpg";
import { FacebookRounded, GitHub, Google } from "@mui/icons-material";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const switchMode = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };
  const handleRegister = (event) => {
    event.preventDefault();
    const user = {
      username,
      password,

    };

    axios
      .post("https://src-fm-backend.onrender.com/addUser", user)
      .then((res) => {
        console.log("User created successfully");
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 400) {
            console.log("User already exists");
          } else if (err.response.status === 500) {
            console.error("Internal Server Error");
          }
        } else {
          console.error(err);
        }
      });
  };
  const handleLogin = (event) => {
    event.preventDefault();
    const user = {
      name: username,
      email,
      password,
      role: "User",
    };

    axios
      .post("https://src-fm-backend.onrender.com/login", user)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          console.log(res.data.message);
          navigate("/");
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className="w-screen h-screen flex flex-row gap-10 airbnb justify-center items-center">
      <div className="flex flex-col h-[400px] items-center justify-center  pl-0 lg:pl-[200px] w-1/2 ">
        {isLogin ? (
          <div className="w-[300px] lg:w-[420px] flex flex-col gap-2 justify-center items-center">
            <h2 className="text-xl lg:text-3xl font-bold mb-4">Welcome back</h2>
            <form className="flex flex-col w-full gap-3" onSubmit={handleLogin}>
              <input
                className=" px-7 py-2 border rounded-2xl "
                type="username"
                placeholder="Usernmae"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="px-7 py-2 border rounded-2xl"
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="text-black text-sm text-end mb-6">
                Forgot password?
              </button>
              <button
                className="px-3 py-3 bg-sky-800 text-white text-sm lg:text-base rounded-3xl"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        ) : (
          <div className="w-[300px] lg:w-[420px] flex flex-col gap-2 justify-center items-center">
            <h2 className="text-xl lg:text-3xl font-bold mb-4">
              Register new account
            </h2>
            <form
              className="flex flex-col w-full gap-3"
              onSubmit={handleRegister}
            >
              <input
                className=" px-7 py-2 border rounded-2xl "
                type="text"
                placeholder="Username"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="px-7 py-2 border rounded-2xl"
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="px-3 py-3 bg-sky-800 text-white text-sm lg:text-base rounded-3xl"
                type="submit"
              >
                Register
              </button>
            </form>
          </div>
        )}
        <h2 className=" text-black text-center text-sm mt-2">
          {isLogin ? "Not a member? " : "Already had an account? "}
          <button className="text-sky-700" onClick={switchMode}>
            {isLogin ? "Register now" : "Login now"}
          </button>
        </h2>
      </div>
      <div className="w-1/2 h-full pt-[100px] pb-[50px] pr-[50px] rounded-3xl lg:block hidden">
        <img
          src={a1}
          className="w-full h-full object-cover rounded-3xl"
          alt=""
        ></img>
      </div>
    </section>
  );
};

export default Auth;
