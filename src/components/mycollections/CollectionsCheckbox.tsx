import React from "react";
import {Checkbox} from "@mui/material";

interface CollectionsCheckboxProps{
    id: string
    title:string
    checked: boolean
    onCheck: (id: string, event:any) => void
}

const CollectionsCheckbox = ({ id, title, checked, onCheck }:CollectionsCheckboxProps) => {
    return(
        <div style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0' }}>
            <Checkbox checked={checked} onChange={(event) => onCheck(id, event)} sx={{ '& .MuiSvgIcon-root': { fontSize: 24 }, padding: '0', marginRight: '0.4rem' }} />
            <div style={{ fontSize: '1.2rem'}}>
                {title}
            </div>
        </div>
    )
}

export default CollectionsCheckbox;