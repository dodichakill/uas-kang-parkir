import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import { MdAttachMoney } from "react-icons/md";
import { FaSave, FaTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

const dummyData = [
  {
    id: 1,
    name: "Mobil",
    waktuNormal: "1 jam",
    tarifNormal: "10000",
    tarifPerjam: "4000",
  },
  {
    id: 2,
    name: "Motor",
    WaktuNormal: "1 jam",
    tarifNormal: "10000",
    tarifPerjam: "2000",
  },
  {
    id: 3,
    name: "Truck",
    WaktuNormal: "1 jam",
    tarifNormal: "20000",
    tarifPerjam: "6000",
  },
];

function PengaturanTarifView() {
  const [waktuNormal, setWaktuNormal] = React.useState("");
  const [typeActive, setTypeActive] = React.useState("");
  const [vehicle, setVehicle] = React.useState({});
  const ref = React.useRef();
  return (
    <div>
      <h1 className="text-3xl flex gap-3 items-center font-bold text-slate-600 border-b-2 border-b-slate-400 pb-5">
        <MdAttachMoney /> Pengaturan Tarif
      </h1>
      <div className="flex gap-28">
        <div className="type">
          <h2 className="text-2xl mt-10 text-slate-600 flex items-center gap-3 font-semibold mb-5">
            Daftar Jenis Kendaraan
          </h2>
          <div className="type w-[18rem] flex flex-col items-start gap-2 p-5 border-2 ">
            {dummyData.map((data) => (
              <button
                key={data.id}
                ref={ref}
                className={`border-b-2 w-full py-3 ${
                  typeActive === data.id && "bg-blue-200"
                }`}
                onClick={() => {
                  setTypeActive(data.id);
                  setVehicle(data);
                }}
              >
                {data.name}
              </button>
            ))}
          </div>
        </div>
        <div className="info">
          <h2 className="text-2xl mt-10 text-slate-600 flex items-center gap-3 font-semibold mb-5">
            Informasi Lengkap
          </h2>
          <div className="flex w-[30rem] mb-3 items-center justify-between">
            <p className="text-xl">Jenis</p>
            <TextField
              className="w-72"
              value={vehicle.name || ""}
              onChange={(e) => setVehicle({ ...vehicle, name: e.target.value })}
            />
          </div>
          <div className="flex w-[30rem] mb-3 items-center justify-between">
            <p className="text-xl">Waktu Normal</p>
            <div className="w-72">
              <FormControl fullWidth>
                <Select
                  id="demo-simple-select"
                  value={vehicle.WaktuNormal || "1 jam"}
                  onChange={(e) =>
                    setVehicle({ ...vehicle, WaktuNormal: e.target.value })
                  }
                >
                  <MenuItem value={"1 jam"}>1 Jam</MenuItem>
                  <MenuItem value={"2 jam"}>2 Jam</MenuItem>
                  <MenuItem value={"3 jam"}>3 Jam</MenuItem>
                  <MenuItem value={"4 jam"}>4 Jam</MenuItem>
                  <MenuItem value={"5 jam"}>5 Jam</MenuItem>
                  <MenuItem value={"6 jam"}>6 Jam</MenuItem>
                  <MenuItem value={"7 jam"}>7 Jam</MenuItem>
                  <MenuItem value={"8 jam"}>8 Jam</MenuItem>
                  <MenuItem value={"9 jam"}>9 Jam</MenuItem>
                  <MenuItem value={"10 jam"}>10 Jam</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="flex w-[30rem] mb-3 items-center justify-between">
            <p className="text-xl">Tarif Normal</p>
            <TextField
              className="w-72"
              value={vehicle.tarifNormal || ""}
              onChange={(e) =>
                setVehicle({ ...vehicle, tarifNormal: e.target.value })
              }
            />
          </div>
          <div className="flex w-[30rem] mb-3 items-center justify-between">
            <p className="text-xl">Tarif Perjam</p>
            <TextField
              className="w-72"
              value={vehicle.tarifPerjam || ""}
              onChange={(e) =>
                setVehicle({ ...vehicle, tarifPerjam: e.target.value })
              }
            />
          </div>
          <div className="flex mt-5 gap-4 justify-end">
            <button
              className="w-20 h-20 text-4xl flex items-center justify-center rounded-full shadow-lg shadow-green-300 bg-green-400 text-white "
              title="Tambah Data Baru"
              onClick={() => {
                dummyData.push(vehicle);
                console.log(dummyData);
              }}
            >
              <FaSave />
            </button>
            <button
              className="w-20 h-20 text-4xl flex items-center justify-center rounded-full shadow-lg shadow-blue-300 bg-blue-400 text-white "
              title="Perbarui Data"
            >
              <FaRegEdit />
            </button>
            <button
              className="w-20 h-20 text-4xl flex items-center justify-center rounded-full shadow-lg shadow-red-300 bg-red-400 text-white "
              title="Hapus Data"
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PengaturanTarifView;
