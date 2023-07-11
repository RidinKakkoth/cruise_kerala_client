import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import { Input } from '@mobiscroll/react';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import { adminApi } from '../../../store/Api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Category() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


 const handleCancel=()=>setOpen(false);
 const data={categoryName:category}
  const handleSave=()=>{
    axios.post(`${adminApi}add-category`,data,{withCredentials:true}).then((res)=>{
      setOpen(false);
    }).catch((error)=>{
      console.log(error);
    })
  }

  return (
    <div>
      
      <Button onClick={handleOpen} variant="outlined" style={{marginBottom:"20px"}} startIcon={<PlaylistAddCircleIcon />}>
      Add Category
</Button >
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" style={{marginBottom:"10px"}} component="h2">
              Category
            </Typography>
            <Input inputStyle="underline" onChange={(e)=>{setCategory(e.target.value)}} labelStyle="stacked"  placeholder="enter category name" label="Name"></Input>

            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            <Button onClick={handleSave} variant="outlined" sx={{ mr: 5,mt:2,fontSize:10 }} startIcon={<DoneIcon style={{color:"green"}} />}>
              Save
            </Button>
            <Button onClick={handleCancel}  variant="outlined" sx={{ mt:2,fontSize:10 }} startIcon={<ClearIcon style={{color:"red"}} />}>
               Cancel
              </Button>

            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}