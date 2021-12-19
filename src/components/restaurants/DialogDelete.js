import axios from '../../config/index'
import { useNavigate } from 'react-router-dom'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


const DialogDelete = props => {

    //setting up navigate
    let navigate = useNavigate()

    let token = localStorage.getItem('token')

    //axios delete to delete the restaurant and then navigate back to restaurants index
    const onDelete = (id) => {
        axios.delete(`/restaurants/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data)
                navigate("/restaurants")
            })
            .catch(err => {
                console.log(`Error: ${err}`)
            })
    }

    //handles closing the dialog
    const handleClose = () => {
        props.setOpen(false);
    };


        return (
            <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Delete Restaurant"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       Are you sure you want to delete this Restaurant 
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="success" autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button color="error" onClick={() => onDelete(props.id) } autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

        )
    }


export default DialogDelete