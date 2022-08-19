import {Button, SxProps} from "@mui/material";
import React from "react";
import useCollections from "../../hooks/useCollections";

type AddCollectionButtonVariant = 'contained' | 'outlined';

const AddCollectionButton = ({ sx, variant }:{ sx?:SxProps, variant:AddCollectionButtonVariant }) => {
    const collections = useCollections();

    return(
        <Button onClick={collections.handleOpenAddCollectionDialog} variant={variant} style={{ width: 'fit-content' }} sx={sx}>
            Create collection +
        </Button>
    )
}

export default AddCollectionButton;