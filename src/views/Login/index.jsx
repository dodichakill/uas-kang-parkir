import React from "react";
import imgLogin from "../../assets/images/login.jpeg";
import { Button, Icon, Input, TextField } from "@mui/material";

function Login() {
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
        <div className="w-80 p-5 shadow rounded-xl text-center bg-white black">
          <div className="input-form gap-2 flex flex-col">
            <TextField placeholder="Username" className="w-full" />
            <div className="mb-5">
              <TextField
                placeholder="Password"
                className="mt-5 w-full"
                type="password"
              />
            </div>
          </div>
          <Button variant="contained">Login</Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
