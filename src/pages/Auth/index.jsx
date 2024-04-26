import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import a1 from "../../assets/images/shs-back.jpg";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [key, setKey] = useState("");
  const navigate = useNavigate();
  const switchMode = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };
  const handleRegister = (event) => {
    event.preventDefault();
    const user = {
      username,
      password,
      acc_id: Math.floor(Math.random() * (40000 - 400 + 1)) + 400,
      key
    };

    axios
      .post("http://localhost:8000/register", user)
      .then((res) => {
        console.log("User created successfully");
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 400) {
            console.log("User already exists");
          } else if (err.response.status === 500) {
            console.error("Internal Server Response");
          }
        } else {
          console.error(err);
        }
      });
  };
  const handleLogin = (event) => {
    event.preventDefault();
    const user = {
      username,
      password,
    };

    axios
      .post("http://localhost:8000/signin", user)
      .then((res) => {
        if (res.data.message) {
          sessionStorage.setItem("user", JSON.stringify(res.data.user));
          console.log("user",res.data.user);
          navigate("/");
        }
      })
      .catch((err) => {
        if (err.response && err.response.data.error) {
          console.log(err.response.data.error);
        } else {
          console.error(err);
        }
      });
  };
  console.log("user",username);
  console.log("password",password);

  return (
    <section className="w-screen h-auto flex flex-row gap-10 airbnb justify-center items-start">
      <div className="flex flex-col h-[400px] items-start justify-center  pl-0 lg:pl-[200px] w-1/2 ">
        {isLogin ? (
          <div className="w-[300px] lg:w-[420px] flex flex-col gap-2 justify-center items-center">
            <h2 className="text-xl lg:text-3xl font-bold mb-4">Welcome back</h2>
            <form className="flex flex-col w-full gap-3" onSubmit={handleLogin}>
              <input
                className=" px-7 py-2 border rounded-2xl "
                type="username"
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
              <input
                className="px-7 py-2 border rounded-2xl"
                type="key"
                placeholder="Key"
                required
                onChange={(e) => setKey(e.target.value)}
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
      <div className="w-1/2 h-[500px] pt-[20px] pb-[50px] pr-[50px] rounded-3xl lg:block hidden">
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
