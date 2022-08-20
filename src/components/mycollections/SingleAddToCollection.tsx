import {Button, Divider, Typography} from "@mui/material";
import React, {useState} from "react";

import useCollections from "../../hooks/useCollections";

import MaxLine from "../elements/MaxLine";
import CustomDialog from "../elements/CustomDialog";
import CollectionsCheckbox from "./CollectionsCheckbox";
import AddCollectionButton from "./AddCollectionButton";

const SingleAddToCollection = ({ id, coverImage, title }:CollectionItem) => {
    const collections = useCollections();

    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const handleOpenDialog = () => {
        initialize();
        setIsOpenDialog(true);
    }
    const handleCloseDialog = () => {
        setIsOpenDialog(false);
    }

    const [selectedCollections, setSelectedCollection] = useState<string[]>([]);

    const checkAlreadyAdded = () => {
        const collection = collections.collectionsData;
        let alreadyAdded = [];
        for(let i=0; i<collection.length; i++){
            for(let j=0; j<collection[i].items.length; j++){
                if(collection[i].items[j].id === id){
                    alreadyAdded.push(collection[i].id);
                }
            }
        }

        return alreadyAdded;
    }


    const onCheckCollection = (id:string, event:any) => {
        const checked = event.target.checked;

        if(checked){
            setSelectedCollection([...selectedCollections, id]);
        }else if(!checked){
            setSelectedCollection(selectedCollections.filter(item => item !== id));
        }
    }

    const initialize = () => {
        const added = checkAlreadyAdded();
        setSelectedCollection(added);
    }

    const handleSingleAdd = () => {
        const data:CollectionItem = {id: id, title: title, coverImage: coverImage};
        collections.handleSingleAdd(data, selectedCollections);

        handleCloseDialog();
        initialize();
    }
    return(
        <>
            <Button onClick={handleOpenDialog} variant="contained" color="primary">
                Add
            </Button>

            <CustomDialog open={isOpenDialog} onClose={handleCloseDialog} fullWidth maxWidth="xs" title="Add to Collection">
                <div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
                        <div style={{ fontSize: '1rem', width: '100%', maxWidth: '12rem' }}>
                            <img src={coverImage} alt="" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: '0.6rem'}} />
                            <MaxLine line={2}>
                                {title}
                            </MaxLine>
                        </div>
                    </div>

                    <Divider />

                    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body1" style={{ marginRight: '1rem'}}>
                            Add to
                        </Typography>

                        {(collections.collectionsData.length > 0) ?
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {collections.collectionsData.map((item:MyCollection, index:number) => {
                                    return(
                                        <CollectionsCheckbox key={index} checked={(selectedCollections.indexOf(item.id) > -1)}
                                            onCheck={onCheckCollection} id={item.id} title={item.title} onClose={handleCloseDialog}
                                        />
                                    )
                                })}

                                <AddCollectionButton variant="outlined" sx={{ marginTop: '1rem', marginInline: 'auto' }} />
                            </div>
                            :
                            <div style={{ textAlign: 'center', padding: '2rem 0'}}>
                                <div>
                                    You don't have any collection yet.
                                </div>

                                <AddCollectionButton variant="outlined" sx={{ marginTop: '1rem', marginInline: 'auto' }} />
                            </div>
                        }

                        {(collections.collectionsData.length > 0) &&
                            <Button onClick={handleSingleAdd} variant="contained" color="primary" style={{ marginLeft: 'auto', marginTop: '1rem'}}>
                                Done
                            </Button>
                        }
                    </div>
                </div>
            </CustomDialog>
        </>
    )
}

export default SingleAddToCollection;