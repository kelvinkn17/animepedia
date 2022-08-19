import {Zoom} from "@mui/material";
import {useEffect, useState} from "react";
import useCollections from "../../hooks/useCollections";

const AddButton = ({ id, title, coverImage }:CollectionItem) => {
    const collections = useCollections();
    const [isSelected, setIsSelected] = useState(false);

    const handleClickSelect = (e:any) => {
        e.stopPropagation();
        const data:CollectionItem = {id: id, title: title, coverImage: coverImage};

        if(!isSelected){
            collections.handleAddSelection(data);
            setIsSelected(true);
        }else if(isSelected){
            collections.handleRemoveSelection(data);
            setIsSelected(false);
        }
    }

    // check if selected
    useEffect(() => {
        let selectedFlag = false;
        for(let i=0; i<collections.selectedItem.length; i++){
            if(collections.selectedItem[i].id === id){
                selectedFlag = true;
            }
        }

        setIsSelected(selectedFlag);
    }, [collections.selectedItem])

    return(
        <Zoom in key={isSelected.toString()}>
            <button onClick={handleClickSelect}  className={`anime-card-add-button shrink-click ${isSelected && "selected"}`}>
                {isSelected ?
                    <span>-</span>
                    :
                    <span>+</span>
                }
            </button>
        </Zoom>
    )
}

export default AddButton;