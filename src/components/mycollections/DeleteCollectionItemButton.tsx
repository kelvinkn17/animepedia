import SvgIconStyle from "../elements/SvgIconStyle";
import {Button} from "@mui/material";
import useCollections from "../../hooks/useCollections";

const DeleteCollectionItemButton = ({ id, title, collectionId }: {id:string, title:string, collectionId: string}) => {
    const collections = useCollections();

    const handleClickDelete = (event:any) => {
        event.stopPropagation();
        // console.log(`Delete ${id} from ${collectionId}`;
        collections.handleOpenDeleteCollectionItemDialog(id, title, collectionId);
    }

    return(
        <Button onClick={handleClickDelete} variant="text" color="error" sx={{ width: '1.6rem', height: '1.6rem', padding: '0', minWidth: '1.6rem'  }}>
            <SvgIconStyle src="/assets/icons/icon_trash.svg" sx={{ width: '100%', height: '100%' }} />
        </Button>
    )
}

export default DeleteCollectionItemButton;