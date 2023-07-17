import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import EditNoteIcon from '@mui/icons-material/EditNote';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }


export default function CategoryTable({ categories }) {
  const [obj, setObj] = React.useState([]);

  React.useEffect(() => {
    setObj(categories);
  }, [categories]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:"600"}}>Category Name</TableCell>
            <TableCell style={{fontWeight:"600"}} align="center">Blocked</TableCell>
            <TableCell style={{fontWeight:"600"}} align="center">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {obj.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">                  {obj.isBlocked ? (
                    <ToggleOnIcon checked={row.isListed} style={{ color: 'red', fontSize: '2rem' }} />
                  ) : (
                    <ToggleOffIcon checked={row.isListed} style={{ fontSize: '2rem' }} />
                  )}</TableCell>
              <TableCell align="center"><EditNoteIcon style={{color:"blue"}} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
