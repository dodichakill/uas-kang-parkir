import React from "react";
import { IoEnter, IoExit, IoPower } from "react-icons/io5";
import BtnMenuNavbar from "./BtnMenuNavbar";
import { MdAttachMoney, MdAccountCircle } from "react-icons/md";
import { GiTicket } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { setMenuActive } from "../redux/menuSlice";

function NavigationBar({}) {
  const dispatch = useDispatch();
  const menuActive = useSelector((state) => state.menu.menuActive);
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

          <BtnMenuNavbar
            isLogout={true}
            icon={<IoPower />}
            text="Log out"
            onClick={() => window.location.replace("/login")}
          />
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
