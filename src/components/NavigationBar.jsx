import React from "react";
import { IoEnter, IoExit, IoPower } from "react-icons/io5";
import BtnMenuNavbar from "./BtnMenuNavbar";
import { MdAttachMoney, MdAccountCircle } from "react-icons/md";
import { GiTicket } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { setMenuActive } from "../redux/menuSlice";
import { useEffect } from "react";
import axios from "../api/axiosConfig";

function NavigationBar({}) {
  const [level, setLevel] = React.useState("");
  const dispatch = useDispatch();
  const menuActive = useSelector((state) => state.menu.menuActive);
  useEffect(() => {
    const getData = async () => {
      await axios
        .get("/auth/cek.php")
        .then((res) => {
          setLevel(res.data.level);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            window.location.replace("/login");
          }
          console.log(err);
        });
    };
    getData();
  });

  const handleLogout = () => {
    axios
      .post("/auth/keluar.php")
      .then((res) => {
        if (res.status === 200) {
          window.location.replace("/login");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-96 p-5 bg-blue-400 h-screen flex justify-center items-center">
      <div className="">
        <div className="flex items-center gap-4 pb-3 border-b-2 border-white mb-2">
          <GiTicket className="text-white text-4xl" />
          <h1 className="text-3xl text-white font-bold">Tiket Parkir</h1>
        </div>
        <div className="mt-10 flex flex-col gap-5">
          <BtnMenuNavbar
            icon={<IoEnter />}
            text="Kendaraan Masuk"
            isActive={menuActive === "kendaraanMasuk"}
            onClick={() => dispatch(setMenuActive("kendaraanMasuk"))}
          />

          <BtnMenuNavbar
            icon={<IoExit />}
            text="Kendaraan Keluar"
            isActive={menuActive === "kendaraanKeluar"}
            onClick={() => dispatch(setMenuActive("kendaraanKeluar"))}
          />

          {level === "Admin" && (
            <>
              <BtnMenuNavbar
                icon={<MdAttachMoney />}
                text="Pengaturan Tarif"
                isActive={menuActive === "tarif"}
                onClick={() => dispatch(setMenuActive("tarif"))}
              />

              <BtnMenuNavbar
                icon={<MdAccountCircle />}
                text="Data Pegawai"
                isActive={menuActive === "dataPegawai"}
                onClick={() => dispatch(setMenuActive("dataPegawai"))}
              />
            </>
          )}

          <BtnMenuNavbar
            isLogout={true}
            icon={<IoPower />}
            text="Log out"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
