import React from "react";
import imgLogin from "../../assets/images/login.jpeg";
import { TextField } from "@mui/material";
import { FaIdCardClip } from "react-icons/fa6";
import axios from "../../api/axiosConfig";
import { FaCheckCircle } from "react-icons/fa";

function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username && !password) {
      alert("Username dan Password harus diisi");
    } else {
      try {
        setLoading(true);

        await axios
          .post("/auth/masuk.php", {
            username,
            password,
          })
          .then((res) => {
            localStorage.setItem("login", true);
            window.location.reload();
          });
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full flex h-screen">
      <div className="w-1/2 bg-sky-600 flex justify-center items-center">
        <img
          src={imgLogin}
          alt="ilustrasi"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2 bg-slate-200 flex flex-col justify-center items-center relative">
        <div className="w-80 p-2 shadow-lg shadow-blue-300 rounded-xl text-center bg-white black items-center flex flex-col">
          <div className="p-2 bg-slate-200 w-20 h-20 flex justify-center items-center rounded-full mb-3">
            <FaIdCardClip className="text-center text-5xl text-blue-400" />
          </div>

          <div className="input-form gap-1 flex flex-col">
            <TextField
              placeholder="Username"
              className="w-full"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <div className="mb-0 mt-2">
              <TextField
                placeholder="Password"
                className="mt-5 w-full"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </div>
          {error && (
            <p className="text-red-500 px-2 py-1 mt-2 italic bg-red-100">
              Username atau password salah!
            </p>
          )}
          <button
            onClick={handleSubmit}
            className="px-5 py-3 shadow mb-5 bg-gradient-to-br from-blue-400 to-purple-500  text-white rounded-lg mt-5 hover:bg-blue-500"
            disabled={loading}
          >
            {loading ? "Sedang Login..." : "Login Sekarang"}
          </button>
        </div>
        <div className="w-[28rem] rounded-lg shadow-lg shadow-purple-300 p-2 pb-10 bg-slate-50 mt-10">
          <h1 className="text-center font-semibold my-3 border-b-2 border-slate-300 pb-3 text-slate-600 text-lg">
            Daftar Anggota Kelompok :{" "}
          </h1>
          <div className="text-center flex flex-col gap-2 items-center mt-5 text-slate-500">
            <p className="flex items-center gap-2">
              <FaCheckCircle />
              Dodi (22090036)
            </p>
            <p className="flex items-center gap-2">
              <FaCheckCircle />M Ibrahim Hanif (22090118)
            </p>
            <p className="flex items-center gap-2">
              <FaCheckCircle />
              IKHWAN IRGI SAPUTRA (22090061)
            </p>
            <p className="flex items-center gap-2">
              <FaCheckCircle />
              M. YUGO CAHYO FURQONSYAH (22090167)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
