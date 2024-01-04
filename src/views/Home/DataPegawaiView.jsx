import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { FaSave, FaTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { useEffect } from "react";

const dummyData = [
  {
    id: 1,
    name: "John Doe",
    jenisKelamin: "laki-laki",
    noTelephone: "081234567890",
    alamat: "Jl. AR hakim no. 10, tegal",
  },
  {
    id: 2,
    name: "Adam Malik",
    jenisKelamin: "laki-laki",
    noTelephone: "081234567890",
    alamat: "Jl. AR hakim no. 10, tegal",
  },
  {
    id: 3,
    name: "Jown Wick",
    jenisKelamin: "laki-laki",
    noTelephone: "081234567890",
    alamat: "Jl. AR hakim no. 10, tegal",
  },
  {
    id: 4,
    name: "John Thor",
    jenisKelamin: "laki-laki",
    noTelephone: "081234567890",
    alamat: "Jl. AR hakim no. 10, tegal",
  },
  {
    id: 5,
    name: "Jubaedah",
    jenisKelamin: "perempuan",
    noTelephone: "081234567890",
    alamat: "Jl. AR hakim no. 10, tegal",
  },
  {
    id: 6,
    name: "Putri",
    jenisKelamin: "perempuan",
    noTelephone: "081234567890",
    alamat: "Jl. AR hakim no. 10, tegal",
  },
];

function DataPegawaiView() {
  const [typeActive, setTypeActive] = React.useState("");
  const [jenisKelamin, setJenisKelamin] = React.useState("laki-laki");
  const [employee, setEmployee] = React.useState({});

  useEffect(() => {
    console.log(employee);
  }, [employee]);
  return (
    <div>
      <h1 className="text-3xl flex gap-3 items-center font-bold text-slate-600 border-b-2 border-b-slate-400 pb-5">
        <MdAccountCircle /> Data Pegawai Parkir
      </h1>
      <div className="flex gap-28">
        <div className="type">
          <h2 className="text-2xl mt-10 text-slate-600 flex items-center gap-3 font-semibold mb-5">
            Daftar Data Pegawai
          </h2>
          <div className="type w-[18rem] flex flex-col items-start gap-2 p-5 border-2 ">
            {dummyData.map((data) => (
              <button
                key={data.id}
                className={`border-b-2 w-full py-3 ${
                  typeActive === data.id && "bg-blue-200"
                }`}
                onClick={() => {
                  setTypeActive(data.id);
                  setEmployee(data);
                }}
              >
                {data.name}
              </button>
            ))}
          </div>
        </div>
        <div className="info">
          <h2 className="text-2xl mt-10 text-slate-600 flex items-center gap-3 font-semibold mb-5">
            Informasi
          </h2>
          <div className="flex w-[30rem] mb-3 items-center justify-between">
            <p className="text-xl">Nama</p>
            <TextField className="w-72" value={employee.name || ""} />
          </div>
          <div className="flex w-[30rem] mb-3 items-center justify-between">
            <p className="text-xl">Jenis Kelamin</p>
            <div className="w-72">
              <FormControl fullWidth>
                <Select
                  id="demo-simple-select"
                  value={employee.jenisKelamin || jenisKelamin}
                  onChange={(e) => setJenisKelamin(e.target.value)}
                >
                  <MenuItem value={"laki-laki"}>Laki-laki</MenuItem>
                  <MenuItem value={"perempuan"}>Perempuan</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="flex w-[30rem] mb-3 items-center justify-between">
            <p className="text-xl">No Telephone</p>
            <TextField className="w-72" value={employee.noTelephone || ""} />
          </div>
          <div className="flex w-[30rem] mb-3 items-center justify-between">
            <p className="text-xl">Alamat</p>
            <textarea
              rows={5}
              className="border-2 border-slate-200 w-72 py-2 px-3"
              value={employee.alamat || ""}
            />
          </div>
          <div className="flex mt-5 gap-4 justify-end">
            <button className="w-20 h-20 text-4xl flex items-center justify-center rounded-full shadow-lg shadow-green-300 bg-green-400 text-white ">
              <FaSave />
            </button>
            <button className="w-20 h-20 text-4xl flex items-center justify-center rounded-full shadow-lg shadow-blue-300 bg-blue-400 text-white ">
              <FaRegEdit />
            </button>
            <button className="w-20 h-20 text-4xl flex items-center justify-center rounded-full shadow-lg shadow-red-300 bg-red-400 text-white ">
              <FaTrashAlt />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataPegawaiView;
