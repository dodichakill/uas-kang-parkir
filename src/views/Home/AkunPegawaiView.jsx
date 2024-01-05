import {
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { FaSave, FaTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { useEffect } from "react";
import axiosConfig from "../../api/axiosConfig";
import AlertSuccess from "../../components/AlertSuccess";

function AkunPegawaiView() {
  const [typeActive, setTypeActive] = React.useState("");
  const [employee, setEmployee] = React.useState({});
  const [daftarAkun, setDaftarAkun] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [loadingAction, setLoadingAction] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState({
    edit: false,
    add: false,
    delete: false,
  });

  useEffect(() => {
    if (typeActive) {
      const getData = async () => {
        await axiosConfig
          .get(`/pegawai/info.php?uuid=${typeActive}`)
          .then((res) => {
            setEmployee(res.data);
          })
          .catch((err) => console.log(err));
      };
      getData();
      console.log(employee);
    }
  }, [typeActive]);

  useEffect(() => {
    setInterval(() => {
      try {
        const getData = async () => {
          await axiosConfig.get("/pegawai/daftar.php").then((res) => {
            setDaftarAkun(res.data);
            setLoading(false);
          });
        };
        getData();
      } catch (error) {
        console.log(error);
      }
    }, 5000);
  }, []);

  const handleAddData = async () => {
    setLoadingAction(true);
    await axiosConfig
      .post("/pegawai/tambah.php", {
        username: employee.username,
        password: employee.password,
        nama: employee.nama,
        gender: employee.gender,
        no_telp: employee.telp,
        alamat: employee.alamat,
        level: employee.level,
      })
      .then((res) => {
        setIsSuccess({
          ...isSuccess,
          add: true,
        });
        setEmployee({});
        setTypeActive("");
        setLoadingAction(false);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteData = async () => {
    setLoadingAction(true);
    await axiosConfig
      .delete("/pegawai/hapus.php?uuid=" + typeActive)
      .then((res) => {
        setIsSuccess({
          ...isSuccess,
          delete: true,
        });
        setTypeActive("");
        setEmployee({});
        setLoadingAction(false);
      })
      .catch((err) => console.log(err));
  };

  const handleEditData = async () => {
    setLoadingAction(true);
    await axiosConfig
      .patch("/pegawai/edit.php?uuid=" + typeActive, {
        username: employee.username,
        password: employee.password,
        nama: employee.nama,
        gender: employee.gender,
        no_telp: employee.telp,
        alamat: employee.alamat,
        level: employee.level,
      })
      .then((res) => {
        setIsSuccess({
          ...isSuccess,
          edit: true,
        });
        setEmployee({});
        setTypeActive("");
        setLoadingAction(false);
      })
      .catch((err) => console.log(err));
  };

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
            {loading ? (
              <CircularProgress className="mx-auto" />
            ) : (
              daftarAkun.map((data) => (
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
              ))
            )}
          </div>
        </div>
        <div className="info">
          <h2 className="text-2xl mt-10 text-slate-600 flex items-center gap-3 font-semibold mb-5">
            Informasi
          </h2>
          <div className="flex w-[32rem] mb-3 items-center justify-between">
            <p className="text-xl">ID</p>
            <TextField
              className="w-80"
              value={employee.username || ""}
              onChange={(e) =>
                setEmployee({ ...employee, username: e.target.value })
              }
            />
          </div>
          <div className="flex w-[32rem] mb-3 items-center justify-between">
            <p className="text-xl">Sandi</p>
            <TextField
              className="w-80"
              value={employee.password || ""}
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
          </div>
          <div className="flex w-[32rem] mb-3 items-center justify-between">
            <p className="text-xl">Level</p>
            <div className="w-80">
              <FormControl fullWidth>
                <Select
                  id="demo-simple-select"
                  value={employee.level || ""}
                  onChange={(e) =>
                    setEmployee({ ...employee, level: e.target.value })
                  }
                >
                  <MenuItem value={"Standar"}>Standar</MenuItem>
                  <MenuItem value={"Admin"}>Admin</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="flex w-[32rem] mb-3 items-center justify-between">
            <p className="text-xl">Nama</p>
            <TextField
              className="w-80"
              value={employee.nama || ""}
              onChange={(e) =>
                setEmployee({ ...employee, nama: e.target.value })
              }
            />
          </div>
          <div className="flex w-[32rem] mb-3 items-center justify-between">
            <p className="text-xl">Jenis Kelamin</p>
            <div className="w-80">
              <FormControl fullWidth>
                <Select
                  id="demo-simple-select"
                  value={employee.gender || ""}
                  onChange={(e) =>
                    setEmployee({ ...employee, gender: e.target.value })
                  }
                >
                  <MenuItem value={"Laki - Laki"}>Laki - laki</MenuItem>
                  <MenuItem value={"Perempuan"}>Perempuan</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="flex w-[32rem] mb-3 items-center justify-between">
            <p className="text-xl">No Telephone</p>
            <TextField
              className="w-80"
              value={employee.telp || ""}
              onChange={(e) =>
                setEmployee({ ...employee, telp: e.target.value })
              }
            />
          </div>
          <div className="flex w-[32rem] mb-3 items-center justify-between">
            <p className="text-xl">Alamat</p>
            <textarea
              rows={5}
              className="border-2 border-slate-200 w-80 py-2 px-3"
              value={employee.alamat || ""}
              onChange={(e) =>
                setEmployee({ ...employee, alamat: e.target.value })
              }
            />
          </div>
          <div className="flex mt-5 gap-4 justify-end">
            <button
              className="w-20 h-20 text-4xl flex items-center justify-center rounded-full shadow-lg shadow-green-300 bg-green-400 hover:bg-green-500 text-white "
              onClick={handleAddData}
              title="Tambah Data Baru"
              disabled={loadingAction}
            >
              <FaSave />
            </button>
            <button
              className="w-20 h-20 text-4xl flex items-center justify-center rounded-full shadow-lg shadow-blue-300 bg-blue-400 hover:bg-blue-500 text-white "
              onClick={handleEditData}
              title="Perbarui Data"
              disabled={loadingAction}
            >
              <FaRegEdit />
            </button>
            <button
              className="w-20 h-20 text-4xl flex items-center justify-center rounded-full shadow-lg shadow-red-300 bg-red-400 hover:bg-red-500 text-white "
              onClick={handleDeleteData}
              title="Hapus Data"
              disabled={loadingAction}
            >
              <FaTrashAlt />
            </button>
          </div>

          {isSuccess.add && (
            <AlertSuccess
              open={isSuccess.add}
              width="32rem"
              setOpen={() => setIsSuccess({ ...isSuccess, add: false })}
              text="Berhasil menambahkan data baru !"
            />
          )}
          {isSuccess.edit && (
            <AlertSuccess
              open={isSuccess.edit}
              width="32rem"
              setOpen={() => setIsSuccess({ ...isSuccess, edit: false })}
              text="Berhasil memperbarui data !"
            />
          )}
          {isSuccess.delete && (
            <AlertSuccess
              open={isSuccess.delete}
              width="32rem"
              setOpen={() => setIsSuccess({ ...isSuccess, delete: false })}
              text="Berhasil menghapus data !"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AkunPegawaiView;
