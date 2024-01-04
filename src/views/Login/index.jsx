import React from "react";
import imgLogin from "../../assets/images/login.jpeg";
import { TextField } from "@mui/material";
import { FaIdCardClip } from "react-icons/fa6";
import axios from "../../api/axiosConfig";

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
            window.location.replace("/");
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
          className="w-full h-full bg-cover"
        />
      </div>
      <div className="w-1/2 bg-slate-200 flex justify-center items-center">
        <div className="w-80 p-5 shadow rounded-xl text-center bg-white black items-center flex flex-col">
          <div className="p-5 bg-slate-200 w-20 h-20 flex justify-center items-center rounded-full mb-5">
            <FaIdCardClip className="text-center text-5xl" />
          </div>

          <div className="input-form gap-2 flex flex-col">
            <TextField
              placeholder="Username"
              className="w-full"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <div className="mb-3 mt-3">
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
            className="px-5 py-3 bg-blue-400 text-white rounded-lg mt-5 hover:bg-blue-500"
            disabled={loading}
          >
            {loading ? "Sedang Login..." : "Login Sekarang"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
