import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { IoEnter } from "react-icons/io5";
import { GrHistory } from "react-icons/gr";
import TableHistoryParkirKeluar from "./TableHistoryParkirKeluar";

function KendaraanKeluarView() {
  const [jenisKendaraan, setJenisKendaraan] = React.useState("");
  return (
    <div>
      <h1 className="text-3xl flex gap-3 items-center font-bold text-slate-600 border-b-2 border-b-slate-400 pb-5">
        <IoEnter /> Catat Kendaraan Keluar
      </h1>
      <div className="form mt-10 mb-20 flex gap-5">
        <TextField placeholder="Plat Nomor" />
        <div className="w-72">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Jenis Kendaraan
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={jenisKendaraan}
              label="Jenis Kendaraan"
              onChange={(e) => setJenisKendaraan(e.target.value)}
            >
              <MenuItem value={"Motor"}>Motor</MenuItem>
              <MenuItem value={"Mobil"}>Mobil</MenuItem>
              <MenuItem value={"Truck"}>Truck</MenuItem>
            </Select>
          </FormControl>
        </div>

        <button className="px-5 py-3 bg-blue-400 text-white rounded-lg">
          Submit
        </button>
      </div>

      <div className="riwayat">
        <h2 className="text-3xl flex text-slate-600 items-center gap-3 font-semibold mb-5">
          <GrHistory />
          Riwayat Kendaraan Keluar
        </h2>

        <TableHistoryParkirKeluar />
      </div>
    </div>
  );
}

export default KendaraanKeluarView;
