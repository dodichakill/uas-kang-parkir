import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import { useEffect } from "react";
import { useState } from "react";
import axiosConfig from "../../api/axiosConfig";

const columns = [
  {
    width: 200,
    label: "Tanggal",
    dataKey: "tanggal",
  },
  {
    width: 150,
    label: "Waktu",
    dataKey: "waktu",
  },
  {
    width: 150,
    label: "No Karcis",
    dataKey: "no",
  },
  {
    width: 150,
    label: "Plat Nomor",
    dataKey: "nopol",
  },
  {
    width: 150,
    label: "Jenis Kendaraan",
    dataKey: "jenis",
  },
  {
    width: 150,
    label: "Status",
    dataKey: "status",
  },
  {
    width: 150,
    label: "Total Biaya",
    dataKey: "total_biaya",
  },
  {
    width: 150,
    label: "Pegawai",
    dataKey: "pegawai",
  },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? "right" : "left"}
          style={{ width: column.width }}
          sx={{
            backgroundColor: "background.paper",
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? "right" : "left"}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function TableHistoryParkirKeluar() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setInterval(() => {
      const getData = async () => {
        await axiosConfig
          .get("/kendaraan-keluar/riwayat.php")
          .then((res) => {
            setRows(res.data);
          })
          .catch((err) => console.log(err));
      };
      getData();
    }, 2000);
  }, []);
  return (
    <Paper style={{ height: 500, width: "100%" }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
