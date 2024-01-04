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

function CatatKeluarComponent() {
  const [noTicket, setNoTicket] = React.useState("");
  const [noPol, setNoPol] = React.useState("");
  const [totalBiaya, setTotalBiaya] = React.useState("");
  const [totalBiayaDenda, setTotalBiayaDenda] = React.useState("");

  const handleSubmit = async () => {
    await axiosConfig
      .get("/kendaraan-keluar/biaya.php?no_karcis=" + noTicket)
      .then((res) => {
        setTotalBiaya(res.data?.total_biaya);
      });
  };

  const handleSubmitTiketHilang = async () => {
    await axiosConfig
      .get("/kendaraan-keluar/biayaDenda.php?nopol=" + noPol)
      .then((res) => {
        setTotalBiayaDenda(res.data?.total_biaya);
      });
  };

  const handleSendNormal = async () => {
    await axiosConfig
      .patch("/kendaraan-keluar/normal.php", {
        no_karcis: noTicket,
        total_biaya: totalBiaya,
      })
      .then((res) => {
        alert("berhasil menambahkan data");
        window.location.reload();
      });
  };

  const handleSendDenda = async () => {
    await axiosConfig
      .patch("/kendaraan-keluar/denda.php", {
        nopol: noPol,
        total_biaya: totalBiayaDenda,
      })
      .then((res) => {
        alert("berhasil menambahkan data");
        window.location.reload();
      });
  };

  return (
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
            className="px-5 py-3 bg-blue-400 block shadow shadow-blue-300 active:bg-blue-500 text-white rounded-lg"
            onClick={handleSendNormal}
          >
            Submit
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
            className="px-5 py-3 bg-blue-400 block shadow shadow-blue-300 active:bg-blue-500 text-white rounded-lg"
            onClick={handleSendDenda}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default CatatKeluarComponent;
