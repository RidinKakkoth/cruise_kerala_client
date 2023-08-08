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


export default function CategoryTable({ categories }) {
  const [obj, setObj] = React.useState([]);
  const [editing, setEditing] = React.useState(false);
  const [editedName, setEditedName] = React.useState();

  React.useEffect(() => {
    setObj(categories);
  }, [categories]);

  const handleEdit = (id) => {
    setEditing(true);
  };

  

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} aria-label="simple table" className='rounded-xl shadow'>
        <TableHead className='shadow-sm rounded'>
          <TableRow>
            <TableCell className='px-5'  style={{fontWeight:"600"}}>Category Name</TableCell>
            <TableCell style={{fontWeight:"600"}} align="center">Status</TableCell>
            {/* <TableCell   style={{fontWeight:"600"}} align="center">Edit</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody className='rounded'>
          {obj?.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

               <TableCell className='px-5' component="th" scope="row">
                {row.name}
              </TableCell>

              <TableCell align="center">                  {row.isListed ? (
                    <ToggleOnIcon checked={row.isListed} style={{ color: 'green', fontSize: '2rem' }} />
                  ) : (
                    <ToggleOffIcon checked={row.isListed} style={{ fontSize: '2rem' }} />
                  )}</TableCell>
              {/* <TableCell align="center"><EditNoteIcon className='cursor-pointer' onClick={()=>handleEdit(row._id)} style={{color:"blue"}} /></TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
