import {useEffect, useState} from "react";
import {nanoid} from "nanoid";
import {Button, TextField, useTheme} from "@mui/material";
import CustomDialog from "../elements/CustomDialog";

import useCollections from "../../hooks/useCollections";
import {validateCollectionTitle} from "../../utils/inputValidation";

const AddCollectionDialog = ({ open, onClose }:{ open: boolean, onClose: () => void }) => {
    const theme = useTheme();
    const collections = useCollections();

    // NAME INPUT
    const [titleInput, setTitleInput] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [invalidMessage, setInvalidMessage] = useState('');

    const initialize = () =>{
        setTitleInput("");
        setIsValid(false);
        setInvalidMessage("");
    }

    useEffect(() => {
        if(open){
            initialize();
        }
    }, [open])

    const onChangeTitleInput = (event:any) => {
        const value = event.target.value;
        setTitleInput(value);

        const { isValid, errorMessage } = validateCollectionTitle(value, collections.collectionsData);
        setIsValid(isValid);

        if(!isValid){
            setInvalidMessage(errorMessage);
        }
    }
    
    const handleCreate = () => {
        const data:MyCollection = {id: nanoid(5), title: titleInput, coverImage: "default", items: []};
        collections.addCollection(data);
        onClose();
    }

    return(
        <CustomDialog open={open} onClose={onClose} fullWidth maxWidth="xs" title="Create Collection">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '0.4rem'}}>
                    Collection title
                </div>
                <TextField type="text" value={titleInput} onChange={onChangeTitleInput} variant="outlined" placeholder="My Fav" sx={{ width: '100%'}} />

                {!isValid &&
                    <div style={{ color: theme.palette.error.main, marginTop: '0.4rem', fontSize: '0.8rem' }}>
                        {invalidMessage}
                    </div>
                }

                <Button onClick={handleCreate} disabled={!isValid} variant="contained" color="primary" style={{ marginTop: '2rem', marginLeft: 'auto' }}>
                    Create Collection
                </Button>
            </div>
        </CustomDialog>
    )
}

export default AddCollectionDialog;