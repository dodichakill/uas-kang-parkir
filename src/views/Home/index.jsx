import React from "react";
import NavigationBar from "../../components/NavigationBar";
import KendaraanMasukView from "./KendaraanMasukView";
import { useSelector } from "react-redux";
import KendaraanKeluarView from "./KendaraanKeluarView";
import PengaturanTarifView from "./PengaturanTarifView";
import AkunPegawaiView from "./AkunPegawaiView";
function Home() {
  const menuActive = useSelector((state) => state.menu.menuActive);
  return (
    <div className="w-full h-screen flex">
      <NavigationBar />
      <div className="w-full h-full overflow-y-auto p-10">
        {menuActive === "kendaraanMasuk" && <KendaraanMasukView />}
        {menuActive === "kendaraanKeluar" && <KendaraanKeluarView />}
        {menuActive === "tarif" && <PengaturanTarifView />}
        {menuActive === "dataPegawai" && <AkunPegawaiView />}
      </div>
    </div>
  );
}

export default Home;
