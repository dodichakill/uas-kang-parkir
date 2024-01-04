import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { FaSave, FaTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { useEffect } from "react";
import axiosConfig from "../../api/axiosConfig";

function AkunPegawaiView() {
  const [typeActive, setTypeActive] = React.useState("");
  const [jenisKelamin, setJenisKelamin] = React.useState("Laki - Laki");
  const [employee, setEmployee] = React.useState({});
  const [daftarAkun, setDaftarAkun] = React.useState([]);

  useEffect(() => {
    if (typeActive) {
      const getData = async () => {
        await axiosConfig
          .get(`/pegawai/info.php?uuid=${typeActive}`)
          .then((res) => {
            console.log(res);
            setEmployee(res.data);
          })
          .catch((err) => console.log(err));
      };
      getData();
      console.log(employee);
    }
  }, [typeActive]);

  useEffect(() => {
    const getData = async () => {
      await axiosConfig
        .get("/pegawai/daftar.php")
        .then((res) => {
          setDaftarAkun(res.data);
        })
        .catch((err) => console.log(err));
    };
    getData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl flex gap-3 items-center font-bold text-slate-600 border-b-2 border-b-slate-400 pb-5">
        <MdAccountCircle /> Akun Pegawai Parkir
      </h1>
      <div className="flex gap-28">
        <div className="type">
          <h2 className="text-2xl mt-10 text-slate-600 flex items-center gap-3 font-semibold mb-5">
            Daftar Akun Pegawai
          </h2>
          <div className="type w-[18rem] flex flex-col items-start gap-2 p-5 border-2 ">
            {daftarAkun.map((data) => (
              <button
                key={data.uuid}
                className={`border-b-2 w-full py-3 ${
                  typeActive === data.uuid && "bg-blue-200"
                }`}
                onClick={() => {
                  setTypeActive(data.uuid);
                }}
              >
                {data.nama}
              </button>
            ))}
          </div>
        </div>
        <div className="info">
          <h2 className="text-2xl mt-10 text-slate-600 flex items-center gap-3 font-semibold mb-5">
            Informasi
          </h2>
          <div className="flex w-[32rem] mb-3 items-center justify-between">
            <p className="text-xl">ID</p>
            <TextField className="w-80" value={""} />
          </div>
          <div className="flex w-[32rem] mb-3 items-center justify-between">
            <p className="text-xl">Sandi</p>
            <TextField className="w-80" value={""} />
          </div>
          <div className="flex w-[32rem] mb-3 items-center justify-between">
            <p className="text-xl">Level</p>
            <div className="w-80">
              <FormControl fullWidth>
                <Select
                  id="demo-simple-select"
                  value={employee.level || "Standar"}
                  onChange={(e) => setJenisKelamin(e.target.value)}
                >
                  <MenuItem value={"Standar"}>Standar</MenuItem>
                  <MenuItem value={"Admin"}>Admin</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="flex w-[32rem] mb-3 items-center justify-between">
            <p className="text-xl">Nama</p>
            <TextField className="w-80" value={employee.nama || ""} />
          </div>
          <div className="flex w-[32rem] mb-3 items-center justify-between">
            <p className="text-xl">Jenis Kelamin</p>
            <div className="w-80">
              <FormControl fullWidth>
                <Select
                  id="demo-simple-select"
                  value={employee.gender || jenisKelamin}
                  onChange={(e) => setJenisKelamin(e.target.value)}
                >
                  <MenuItem value={"Laki - Laki"}>Laki - laki</MenuItem>
                  <MenuItem value={"Perempuan"}>Perempuan</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="flex w-[32rem] mb-3 items-center justify-between">
            <p className="text-xl">No Telephone</p>
            <TextField className="w-80" value={employee.telp || ""} />
          </div>
          <div className="flex w-[32rem] mb-3 items-center justify-between">
            <p className="text-xl">Alamat</p>
            <textarea
              rows={5}
              className="border-2 border-slate-200 w-80 py-2 px-3"
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

export default AkunPegawaiView;
