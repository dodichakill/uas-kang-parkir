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

function CatatComponent() {
  const [jenisKendaraan, setJenisKendaraan] = React.useState([]);
  const [noPol, setNoPol] = React.useState("");
  const [vehicle, setVehicle] = React.useState("");

  useEffect(() => {
    axiosConfig.get("/tarif/daftar.php").then((res) => {
      setJenisKendaraan(res.data);
    });
  }, [jenisKendaraan]);

  const handleSubmit = async () => {
    await axiosConfig
      .post("/kendaraan-masuk/parkir.php", {
        nopol: noPol,
        jenis: vehicle,
      })
      .then((res) => {
        alert("berhasil menambahkan data");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="form mt-10 flex gap-5">
      <TextField
        placeholder="Plat Nomor"
        onChange={(e) => setNoPol(e.target.value)}
        value={noPol}
      />
      <div className="w-72">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Jenis Kendaraan</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={vehicle}
            label="Jenis Kendaraan"
            onChange={(e) => setVehicle(e.target.value)}
          >
            {jenisKendaraan.map((data) => (
              <MenuItem value={data.jenis}>{data.jenis}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <button
        className="px-5 py-3 bg-blue-400 shadow shadow-blue-300 active:bg-blue-500 text-white rounded-lg"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}

export default CatatComponent;
