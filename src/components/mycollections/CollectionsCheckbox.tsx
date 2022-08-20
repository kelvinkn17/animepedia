import React from "react";
import {Checkbox, Link} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface CollectionsCheckboxProps{
    id: string
    title:string
    checked: boolean
    onCheck: (id: string, event:any) => void,
    onClose: () => void,
}

const CollectionsCheckbox = ({ id, title, checked, onCheck, onClose }:CollectionsCheckboxProps) => {
    const navigate = useNavigate();

    const onClickCollectionTitle = () => {
        onClose();
        navigate(`/mycollections/${id}`);
    }
    return(
        <div style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0' }}>
            <Checkbox checked={checked} onChange={(event) => onCheck(id, event)} sx={{ '& .MuiSvgIcon-root': { fontSize: 24 }, padding: '0', marginRight: '0.4rem' }} />
            <Link color="inherit" onClick={onClickCollectionTitle} underline="hover" style={{ fontSize: '1rem', cursor: 'pointer' }}>
                {title}
            </Link>
        </div>
    )
}

export default CollectionsCheckbox;