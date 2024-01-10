import React from "react";
import imgHero from "../../assets/images/hero.png";
import { IoEnter, IoExit } from "react-icons/io5";
import ItemFeature from "../../components/ItemFeature";
import { MdAccountCircle, MdAttachMoney } from "react-icons/md";
import { VscTools } from "react-icons/vsc";
import { ImGithub } from "react-icons/im";

function Beranda() {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-1/2 mr-10">
          <h1 className="text-5xl font-bold text-slate-700">
            Sistem Pengelolaan Parkir Kendaraan yang Mudah
          </h1>
          <p className="text-lg mt-5 text-slate-500">
            Web Tiket Parkir ini dapat membantu petugas parkir dan admin
            mengelola data parkir kendaraan dengan lebih efisien dan mudah
          </p>
          <div className="flex gap-5">
            <a
              className="px-5 py-3 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-lg mt-5 font-semibold shadow shadow-blue-400 flex items-center"
              href="#fitur"
            >
              <span className="mr-3">
                <VscTools />
              </span>
              Fitur Unggulan
            </a>
            <a
              className="px-5 py-3 bg-white border-2 border-blue-500 text-blue-500 rounded-lg mt-5 font-semibold shadow shadow-blue-400 flex items-center"
              target="_blank"
              href="https://github.com/dodichakill/uas-kang-parkir"
            >
              <span className="mr-3">
                <ImGithub />
              </span>
              Source Code
            </a>
          </div>
        </div>
        <img
          src={imgHero}
          className="w-[28rem]"
          title="hero-img"
          alt="hero-img"
        />
      </div>
      <div className="w-full mt-10">
        <h2
          id="fitur"
          className="text-3xl text-slate-700 font-semibold text-center"
        >
          Daftar Fitur Unggulan
        </h2>
        <div className="w-full max-w-7xl mt-10 mx-auto flex gap-10 pb-20">
          <ItemFeature
            icon={<IoEnter />}
            title={"Kendaraan Masuk"}
            description={
              "Petugas Dapat mencatat kendaraan masuk dan dapat melihat riwayat kendaraan yang masuk"
            }
          />
          <ItemFeature
            icon={<IoExit />}
            title={"Kendaraan Masuk"}
            description={
              "Petugas Dapat mencatat kendaraan Keluar dan dapat melihat riwayat kendaraan yang masuk"
            }
          />
          <ItemFeature
            icon={<MdAttachMoney />}
            title={"Pengaturan Tarif"}
            description={
              "Admin Dapat mengelola tarif dari tiap jenis kendaraan dan mengelola data kendaraan"
            }
          />
          <ItemFeature
            icon={<MdAccountCircle />}
            title={"Akun"}
            description={
              "Admin Dapat mengelola akun pegawai yang akan melakukan tugasnya di web ini"
            }
          />
        </div>
      </div>
    </>
  );
}

export default Beranda;