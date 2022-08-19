import {Button, Divider, Fab, Grid, Typography, Zoom} from "@mui/material";
import React, {useState} from "react";

import useCollections from "../../hooks/useCollections";

import MaxLine from "../elements/MaxLine";
import CustomDialog from "../elements/CustomDialog";
import CollectionsCheckbox from "./CollectionsCheckbox";
import AddCollectionButton from "./AddCollectionButton";

const BulkAddToCollection = ({ selectedItem, collectionsData }:{ selectedItem:SelectedItem, collectionsData:MyCollections }) => {
    const collections = useCollections();

    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const handleOpenDialog = () => {
        setIsOpenDialog(true);
    }
    const handleCloseDialog = () => {
        setIsOpenDialog(false);
    }

    const [selectedCollections, setSelectedCollection] = useState<string[]>([]);

    const onCheckCollection = (id:string, event:any) => {
        const checked = event.target.checked;

        if(checked){
            setSelectedCollection([...selectedCollections, id]);
        }else if(!checked){
            setSelectedCollection(selectedCollections.filter(item => item !== id));
        }
    }

    const initialize = () => {
        setSelectedCollection([]);
    }

    const handleBulkAdd = () => {
        collections.handleBulkAdd(selectedItem, selectedCollections);

        handleCloseDialog();
        initialize();
    }
    return(
        <>
            <Zoom in={selectedItem.length>0} unmountOnExit>
                <Fab onClick={handleOpenDialog} size="medium" color="primary" aria-label="add" sx={{ position: 'fixed', right: '1rem', bottom :' 5rem', fontSize: '1rem'}}>
                    +{selectedItem.length}
                </Fab>
            </Zoom>

            <CustomDialog open={isOpenDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm" title="Bulk Add to Collection">
                <div>
                    <div style={{ maxHeight: '45vh', overflowY: 'auto', paddingBottom: '1rem' }}>
                        <Grid container spacing="1rem">
                            {selectedItem.map((item:CollectionItem, index:number) => {
                                return(
                                    <Grid key={index} item xxs={6} xs={4} sm={3}>
                                        <div style={{ fontSize: '0.8rem' }}>
                                            <img src={item.coverImage} alt="" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: '0.6rem'}} />
                                            <MaxLine line={2}>
                                                {item.title}
                                            </MaxLine>
                                        </div>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </div>

                    <Divider />

                    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body1" style={{ marginRight: '1rem'}}>
                            Add to
                        </Typography>

                        {(collectionsData.length > 0) ?
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {collectionsData.map((item:MyCollection, index:number) => {
                                    return(
                                        <CollectionsCheckbox key={index} checked={(selectedCollections.indexOf(item.id) > -1)} onCheck={onCheckCollection} id={item.id} title={item.title} />
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

                        {(collectionsData.length > 0) &&
                            <Button onClick={handleBulkAdd} variant="contained" color="primary" style={{ marginLeft: 'auto', marginTop: '1rem'}}>
                                Done
                            </Button>
                        }
                    </div>
                </div>
            </CustomDialog>
        </>
    )
}

export default BulkAddToCollection;