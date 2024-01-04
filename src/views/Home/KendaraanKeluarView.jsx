import React from "react";
import { IoEnter } from "react-icons/io5";
import { GrHistory } from "react-icons/gr";
import TableHistoryParkirKeluar from "./TableHistoryParkirKeluar";
import CatatComponent from "../../components/CatatComponent";
import AlertSuccess from "../../components/AlertSuccess";

function KendaraanKeluarView() {
  const [submit, setSubmit] = React.useState(false);
  return (
    <div>
      <h1 className="text-3xl flex gap-3 items-center font-bold text-slate-600 border-b-2 border-b-slate-400 pb-5">
        <IoEnter /> Catat Kendaraan Keluar
      </h1>
      <CatatComponent onSubmit={() => setSubmit(true)} />
      <AlertSuccess open={submit} setOpen={() => setSubmit(false)} />

      <div className="riwayat mt-20">
        <h2 className="text-2xl flex text-slate-600 items-center gap-3 font-semibold mb-5">
          <GrHistory />
          Riwayat Kendaraan Keluar
        </h2>

        <TableHistoryParkirKeluar />
      </div>
    </div>
  );
}

export default KendaraanKeluarView;
