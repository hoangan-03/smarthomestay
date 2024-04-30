import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useData } from "../../components/DataProvider";
import a1 from "../../assets/images/shs-back.jpg";
import Modal from "@mui/material/Modal";
import tick from "../../assets/icons/accept.png";
import info from "../../assets/icons/info.png";
import close from "../../assets/icons/close.png";
const Auth = () => {
  // const [isLogin, setIsLogin] = useState(true);
  const [active, setActive] = useState("");
  const {isLogin, setIsLogin, setCookie, getCookie, setUser} = useData();
  const handleActive = (boole) => {
    setActive(boole);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [key, setKey] = useState("");
  const [open, setOpen] = useState(false);
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
    //Invalid key // Username already exists
    axios
      .post("http://localhost:8000/register", user)
      .then((res) => {
        console.log("User created successfully");
        handleActive(true);
        setOpen(true);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 400) {
            console.log(err.response.data.error);
            handleActive(false);
            setOpen(true);
          } else if (err.response.status === 500) {
            console.error("Internal Server Response");
          }
        } else {

          console.error(err);
        }
      });
  };
  const handleClose = () => {
    setOpen(false);
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
          handleActive(true);
          setOpen(true);
          console.log("RES DATA", res.data);
          setCookie('cookieUser', res.data.user, 1);
          console.log("Cookie id: ", getCookie('cookieUser'));
          setUser(getCookie('cookieUser'))
          
          sessionStorage.setItem("user", JSON.stringify(res.data.user));
          console.log("user", res.data.user);
          navigate("/");
        }
      })
      .catch((err) => {
        if (err.response && err.response.data.error) {
          console.log(err.response.data.error);

        } else {
          console.error(err);
        }
        handleActive(false);
        setOpen(true);
      });
  };
  console.log("user", username);
  console.log("password", password);

  return (
    <section className="w-screen h-auto flex flex-row gap-10 airbnb justify-center items-start">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className={`absolute border-b-[8px] ${active ? "border-b-green-500" : "border-b-amber-600"
            }  left-1/2 gap-1 top-1/2 flex h-[100px] w-[620px] -translate-x-[50%] -translate-y-[50%] flex-col items-center justify-center rounded-2xl bg-white`}
        >
          <div
            className={`flex flex-row gap-4 h-full w-full justify-between px-4`}
          >
            <div className="flex flex-row gap-4 h-full w-full">
              <div
                className={`h-[45px] w-[45px] p-1 self-center rounded-xl flex justify-center items-center ${active ? "bg-green-500/20" : "bg-amber-600/20"
                  } `}
              >
                <img
                  className="w-[30px] h-[30px]"
                  alt=""
                  src={`${active ? tick : info}`}
                ></img>
              </div>
              <div className="w-auto h-[70px] self-center flex flex-col text-start justify-center items-start">
                <h2
                  className={`  w-auto text-start items-start text-2xl  font-bold text-black`}
                >
                  {active ? (isLogin ? "Login successfully" : "Register successfully") : "Please check your information again."}
                </h2>

              </div>
            </div>
            <button
              onClick={() => handleClose()}
              className="w-[40px] h-[40px] flex self-center rounded-full justify-center items-center p-3 hover:bg-gray-200/30"
            >
              <img
                alt=""
                className="w-full h-full object-cover"
                src={close}
              ></img>
            </button>
          </div>
        </div>
      </Modal>
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
              {/* <button className="text-[var(--text-normal)] text-sm text-end mb-6">
                Forgot password?
              </button> */}
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
                required
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="px-7 py-2 border rounded-2xl"
                type="password"
                required
                placeholder="Password"

                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="px-7 py-2 border rounded-2xl"
                type="key"
                required
                placeholder="Key"

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
        <h2 className=" text-[var(--text-normal)] text-center text-sm mt-2">
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
