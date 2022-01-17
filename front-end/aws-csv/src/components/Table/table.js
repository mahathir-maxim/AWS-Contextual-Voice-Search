import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// const rows = [
//     {
//       "accn": "0000004904-19-000009",
//       "end": "2016-12-31",
//       "filed": "2019-02-21",
//       "form": "10-K",
//       "fp": "FY",
//       "frame": "CY2016Q4I",
//       "fy": 2018,
//       "val": 63467700000
//     },
//     {
//       "accn": "0000004904-19-000009",
//       "end": "2017-12-31",
//       "filed": "2019-02-21",
//       "form": "10-K",
//       "fp": "FY",
//       "fy": 2018,
//       "val": 64729100000
//     },
//     {
//       "accn": "0000004904-19-000009",
//       "end": "2018-12-31",
//       "filed": "2019-02-21",
//       "form": "10-K",
//       "fp": "FY",
//       "fy": 2018,
//       "val": 68802800000
//     },
//     {
//       "accn": "0000004904-19-000020",
//       "end": "2018-12-31",
//       "filed": "2019-04-26",
//       "form": "10-Q",
//       "fp": "Q1",
//       "fy": 2019,
//       "val": 68802800000
//     },
//     {
//       "accn": "0000004904-19-000040",
//       "end": "2018-12-31",
//       "filed": "2019-07-25",
//       "form": "10-Q",
//       "fp": "Q2",
//       "fy": 2019,
//       "val": 68802800000
//     },
//     {
//       "accn": "0000004904-19-000050",
//       "end": "2018-12-31",
//       "filed": "2019-10-24",
//       "form": "10-Q",
//       "fp": "Q3",
//       "fy": 2019,
//       "val": 68802800000
//     },
//     {
//       "accn": "0000004904-19-000020",
//       "end": "2019-03-31",
//       "filed": "2019-04-26",
//       "form": "10-Q",
//       "fp": "Q1",
//       "frame": "CY2019Q1I",
//       "fy": 2019,
//       "val": 70722000000
//     },
//     {
//       "accn": "0000004904-19-000040",
//       "end": "2019-06-30",
//       "filed": "2019-07-25",
//       "form": "10-Q",
//       "fp": "Q2",
//       "frame": "CY2019Q2I",
//       "fy": 2019,
//       "val": 72550000000
//     },
//     {
//       "accn": "0000004904-19-000050",
//       "end": "2019-09-30",
//       "filed": "2019-10-24",
//       "form": "10-Q",
//       "fp": "Q3",
//       "frame": "CY2019Q3I",
//       "fy": 2019,
//       "val": 73900700000
//     }
//   ];

export default function OutputTable(props) {
  console.log(JSON.stringify(props.data));
  const rows = props.data;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ACCN</TableCell>
            <TableCell align="right">END</TableCell>
            <TableCell align="right">FILED</TableCell>
            <TableCell align="right">FORM</TableCell>
            <TableCell align="right">FY</TableCell>
            <TableCell align="right">VALUE&nbsp;($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.accn}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell component="th" scope="row">
                {row.accn}
              </TableCell>
              <TableCell align="right">
                {row.end}
              </TableCell>
              <TableCell align="right">{row.filed}</TableCell>
              <TableCell align="right">{row.form}</TableCell>
              <TableCell align="right">{row.fy}</TableCell>
              <TableCell align="right">{row.val}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}