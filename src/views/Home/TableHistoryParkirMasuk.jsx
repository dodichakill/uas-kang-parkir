import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";

const columns = [
  {
    width: 200,
    label: "Tanggal",
    dataKey: "date",
  },
  {
    width: 150,
    label: "Waktu",
    dataKey: "time",
  },
  {
    width: 150,
    label: "No Karcis",
    dataKey: "ticket",
    numeric: true,
  },
  {
    width: 150,
    label: "Plat Nomor",
    dataKey: "plat",
    numeric: true,
  },
  {
    width: 150,
    label: "Jenis Kendaraan",
    dataKey: "type",
  },
  {
    width: 150,
    label: "Pegawai",
    dataKey: "employee",
  },
];

// disini data yang akan ditampilkan di table
const rows = [
  {
    id: 1,
    date: "2022-01-01",
    time: "10:00:00",
    ticket: "123456789",
    plat: "B 1234 AB",
    type: "Motor",
    employee: "Johny",
  },
  {
    id: 2,
    date: "2022-02-01",
    time: "10:00:00",
    ticket: "123456789",
    plat: "C 1234 AB",
    type: "Motor",
    employee: "Jane Doe",
  },
  {
    id: 3,
    date: "2022-11-01",
    time: "10:00:00",
    ticket: "123456789",
    plat: "B 1234 AB",
    type: "Mobil",
    employee: "John Doe",
  },
  {
    id: 4,
    date: "2022-01-01",
    time: "10:00:00",
    ticket: "123456789",
    plat: "B 1234 AB",
    type: "Truck",
    employee: "John Wick",
  },
  {
    id: 5,
    date: "2022-03-05",
    time: "14:30:00",
    ticket: "987654321",
    plat: "D 4567 EF",
    type: "Mobil",
    employee: "Alice Smith",
  },
  {
    id: 6,
    date: "2022-12-20",
    time: "08:15:00",
    ticket: "555555555",
    plat: "A 9876 CD",
    type: "Motor",
    employee: "Bob Johnson",
  },
  {
    id: 7,
    date: "2023-01-12",
    time: "16:45:00",
    ticket: "111111111",
    plat: "E 3210 GH",
    type: "Motor",
    employee: "Susan Miller",
  },
  {
    id: 8,
    date: "2023-02-25",
    time: "11:00:00",
    ticket: "222222222",
    plat: "F 6543 IJ",
    type: "Truck",
    employee: "David Lee",
  },
  {
    id: 9,
    date: "2023-03-18",
    time: "09:30:00",
    ticket: "333333333",
    plat: "G 7890 KL",
    type: "Mobil",
    employee: "Emily Garcia",
  },
  {
    id: 10,
    date: "2023-04-10",
    time: "13:15:00",
    ticket: "444444444",
    plat: "H 0123 MN",
    type: "Motor",
    employee: "Michael Brown",
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

export default function TableHistoryParkirMasuk() {
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
