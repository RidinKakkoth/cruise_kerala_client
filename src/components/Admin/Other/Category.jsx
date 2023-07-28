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
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addCategory } from '../../../config/AdminEndpoints';

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
  const navigate=useNavigate()

 const handleCancel=()=>setOpen(false);
 const catData={categoryName:category}
  const handleSave=async ()=>{
       const data= await addCategory(catData)
       if(data.status==='failed'){
        toast.error(data.message,{position: "top-center"})
       }
       else
         {setOpen(false);
         navigate(0)
         toast.success("success",{position: "top-center"})}
  }


  return (
    <div>
            <ToastContainer autoClose={3000} />
      <button onClick={handleOpen}  className='rounded flex gap-2 bg-blue-300 text-white px-2 items-center h-9' style={{marginBottom:"20px"}} >
      <PlaylistAddCircleIcon />
      Add Category
</button >
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