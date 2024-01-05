import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import axiosConfig from "../api/axiosConfig";
import AlertSuccess from "./AlertSuccess";

function CatatKeluarComponent() {
  const [noTicket, setNoTicket] = React.useState("");
  const [noPol, setNoPol] = React.useState("");
  const [totalBiaya, setTotalBiaya] = React.useState("");
  const [totalBiayaDenda, setTotalBiayaDenda] = React.useState("");
  const [loadingBiaya, setLoadingBiaya] = React.useState(false);
  const [loadingBiayaDenda, setLoadingBiayaDenda] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = async () => {
    try {
      await axiosConfig
        .get("/kendaraan-keluar/biaya.php?no_karcis=" + noTicket)
        .then((res) => {
          setTotalBiaya(res.data?.total_biaya);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitTiketHilang = async () => {
    await axiosConfig
      .get("/kendaraan-keluar/biayaDenda.php?nopol=" + noPol)
      .then((res) => {
        setTotalBiayaDenda(res.data?.total_biaya);
      })
      .catch((err) => console.log(err));
  };

  const handleSendNormal = async () => {
    try {
      setLoadingBiaya(true);
      await axiosConfig
        .patch("/kendaraan-keluar/normal.php", {
          no_karcis: noTicket,
          total_biaya: totalBiaya,
        })
        .then((res) => {
          setNoTicket("");
          setTotalBiaya("");
          setIsSuccess(true);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingBiaya(false);
    }
  };

  const handleSendDenda = async () => {
    try {
      setLoadingBiayaDenda(true);
      await axiosConfig
        .patch("/kendaraan-keluar/denda.php", {
          nopol: noPol,
          total_biaya: totalBiayaDenda,
        })
        .then((res) => {
          setNoPol("");
          setTotalBiayaDenda("");
          setIsSuccess(true);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingBiayaDenda(false);
    }
  };

  return (
    <>
      <div className="form mt-10 flex gap-5">
        <div className="flex gap-28">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold text-slate-700">
              Catat Keluar
            </h2>
            <TextField
              placeholder="No Tiket"
              onChange={(e) => setNoTicket(e.target.value)}
              value={noTicket}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />

            <TextField
              placeholder="Biaya"
              onChange={(e) => setTotalBiaya(e.target.value)}
              value={totalBiaya}
              disabled={true}
            />
            <button
              className="px-5 py-3 bg-gradient-to-br from-blue-400 to-purple-500  block shadow shadow-blue-300 active:bg-blue-500 text-white rounded-lg"
              onClick={handleSendNormal}
              disabled={loadingBiaya || noTicket === ""}
            >
              {loadingBiaya ? "Loading..." : "Submit"}
            </button>
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold text-slate-700">
              Catat Keluar Tiket Hilang
            </h2>

            <TextField
              placeholder="Plat Nomor"
              onChange={(e) => setNoPol(e.target.value)}
              value={noPol}
              onKeyDown={(e) => e.key === "Enter" && handleSubmitTiketHilang()}
            />

            <TextField
              placeholder="Biaya"
              onChange={(e) => setTotalBiayaDenda(e.target.value)}
              value={totalBiayaDenda}
              disabled={true}
            />
            <button
              className="px-5 py-3 bg-gradient-to-br from-blue-400 to-purple-500  block shadow shadow-blue-300 active:bg-blue-500 text-white rounded-lg"
              disabled={loadingBiayaDenda || noPol === ""}
              onClick={handleSendDenda}
            >
              {loadingBiayaDenda ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
      {isSuccess && (
        <AlertSuccess
          open={isSuccess}
          setOpen={() => setIsSuccess(false)}
          text="Berhasil menambahkan data baru !"
        />
      )}
    </>
  );
}

export default CatatKeluarComponent;
