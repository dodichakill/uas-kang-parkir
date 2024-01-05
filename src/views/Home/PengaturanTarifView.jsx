import {
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { MdAttachMoney } from "react-icons/md";
import { FaSave, FaTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { useEffect } from "react";
import axiosConfig from "../../api/axiosConfig";
import AlertSuccess from "../../components/AlertSuccess";

const waktuNormal = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24,
];

function PengaturanTarifView() {
  const [typeActive, setTypeActive] = React.useState("");
  const [vehicle, setVehicle] = React.useState({});
  const [listVehicles, setListVehicles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isSuccess, setIsSuccess] = React.useState({
    edit: false,
    add: false,
    delete: false,
  });

  useEffect(() => {
    if (typeActive) {
      const getData = async () => {
        await axiosConfig
          .get(`/tarif/info.php?id=${typeActive}`)
          .then((res) => {
            setVehicle(res.data);
          })
          .catch((err) => console.log(err));
      };
      getData();
    }
  }, [typeActive]);

  useEffect(() => {
    setInterval(() => {
      try {
        const getData = async () => {
          await axiosConfig
            .get("/tarif/daftar.php")
            .then((res) => {
              setListVehicles(res.data);
            })
            .catch((err) => console.log(err));
        };
        getData();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, 2500);
  }, []);

  const handleAddData = async () => {
    await axiosConfig
      .post("/tarif/tambah.php", {
        jenis: vehicle.jenis,
        waktu: vehicle.waktu_normal,
        biaya_normal: vehicle.biaya_normal,
        biaya_perjam: vehicle.biaya_perjam,
      })
      .then((res) => {
        setVehicle({});
        setTypeActive("");
        setIsSuccess({ ...isSuccess, add: true });
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteData = async () => {
    await axiosConfig
      .delete("/tarif/hapus.php?id=" + typeActive)
      .then((res) => {
        setTypeActive("");
        setVehicle({});
        setIsSuccess({ ...isSuccess, delete: true });
      })
      .catch((err) => console.log(err));
  };

  const handleEditData = async () => {
    await axiosConfig
      .patch("/tarif/edit.php?id=" + typeActive, {
        jenis: vehicle.jenis,
        waktu: vehicle.waktu_normal,
        biaya_normal: vehicle.biaya_normal,
        biaya_perjam: vehicle.biaya_perjam,
      })
      .then((res) => {
        setVehicle({});
        setTypeActive("");
        setIsSuccess({ ...isSuccess, edit: true });
      })
      .catch((err) => console.log(err));
  };

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
          <div className="type w-[18rem] flex flex-col items-start gap-2 p-5 border-2 justify-center ">
            {loading ? (
              <CircularProgress className="mx-auto" />
            ) : (
              listVehicles.map((data) => (
                <button
                  key={data.id}
                  className={`border-b-2 w-full py-3 ${
                    typeActive === data.id && "bg-blue-200"
                  }`}
                  onClick={() => {
                    setTypeActive(data.id);
                  }}
                >
                  {data.jenis}
                </button>
              ))
            )}
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
              value={vehicle.jenis || ""}
              onChange={(e) =>
                setVehicle({ ...vehicle, jenis: e.target.value })
              }
            />
          </div>
          <div className="flex w-[30rem] mb-3 items-center justify-between">
            <p className="text-xl">Waktu Normal</p>
            <div className="w-72">
              <FormControl fullWidth>
                <Select
                  id="demo-simple-select"
                  value={vehicle.waktu_normal || ""}
                  onChange={(e) =>
                    setVehicle({ ...vehicle, waktu_normal: e.target.value })
                  }
                >
                  {waktuNormal.map((data) => (
                    <MenuItem key={data} value={data}>
                      {data} Jam
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="flex w-[30rem] mb-3 items-center justify-between">
            <p className="text-xl">Tarif Normal</p>
            <TextField
              className="w-72"
              value={vehicle.biaya_normal || ""}
              onChange={(e) =>
                setVehicle({ ...vehicle, biaya_normal: e.target.value })
              }
            />
          </div>
          <div className="flex w-[30rem] mb-3 items-center justify-between">
            <p className="text-xl">Tarif Perjam</p>
            <TextField
              className="w-72"
              value={vehicle.biaya_perjam || ""}
              onChange={(e) =>
                setVehicle({ ...vehicle, biaya_perjam: e.target.value })
              }
            />
          </div>
          <div className="flex mt-5 gap-4 justify-end">
            <button
              className="w-20 h-20 text-4xl flex items-center justify-center rounded-full shadow-lg shadow-green-300 bg-green-400 text-white "
              title="Tambah Data Baru"
              onClick={handleAddData}
            >
              <FaSave />
            </button>
            <button
              className="w-20 h-20 text-4xl flex items-center justify-center rounded-full shadow-lg shadow-blue-300 bg-blue-400 text-white "
              title="Perbarui Data"
              onClick={handleEditData}
            >
              <FaRegEdit />
            </button>
            <button
              className="w-20 h-20 text-4xl flex items-center justify-center rounded-full shadow-lg shadow-red-300 bg-red-400 text-white "
              title="Hapus Data"
              onClick={handleDeleteData}
            >
              <FaTrashAlt />
            </button>
          </div>
          {isSuccess.add && (
            <AlertSuccess
              open={isSuccess.add}
              width="30rem"
              setOpen={() => setIsSuccess({ ...isSuccess, add: false })}
              text="Berhasil menambahkan data baru !"
            />
          )}
          {isSuccess.edit && (
            <AlertSuccess
              open={isSuccess.edit}
              width="30rem"
              setOpen={() => setIsSuccess({ ...isSuccess, edit: false })}
              text="Berhasil memperbarui data !"
            />
          )}
          {isSuccess.delete && (
            <AlertSuccess
              open={isSuccess.delete}
              width="30rem"
              setOpen={() => setIsSuccess({ ...isSuccess, delete: false })}
              text="Berhasil menghapus data !"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PengaturanTarifView;
