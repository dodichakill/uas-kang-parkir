import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

function CatatComponent({ onSubmit }) {
  const [jenisKendaraan, setJenisKendaraan] = React.useState("");

  return (
    <div className="form mt-10 flex gap-5">
      <TextField placeholder="Plat Nomor" />
      <div className="w-72">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Jenis Kendaraan</InputLabel>
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

      <button
        className="px-5 py-3 bg-blue-400 shadow shadow-blue-300 active:bg-blue-500 text-white rounded-lg"
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  );
}

export default CatatComponent;
