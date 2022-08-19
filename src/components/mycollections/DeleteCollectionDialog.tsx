import CustomDialog from "../elements/CustomDialog";
import {Button} from "@mui/material";

const DeleteCollectionDialog = ({ title, open, onClose, handleDelete }:{title:string, open:boolean, onClose:() => void, handleDelete:() => void}) => {
    return(
        <CustomDialog onClose={onClose} open={open} title="Delete collection">
            <div>
                Are you sure to delete the <strong>{title}</strong> collection?
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', marginTop: '2rem' }}>
                <Button onClick={onClose} variant="outlined" color="error" style={{ marginRight: '1rem'}}>
                    No
                </Button>
                <Button onClick={handleDelete} variant="contained" color="error">
                    Yes
                </Button>
            </div>
        </CustomDialog>
    )
}

export default DeleteCollectionDialog;
