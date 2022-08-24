import useLocalStorage from "use-local-storage";
import React, {createContext, useState} from "react";
import BulkAddToCollection from "../components/mycollections/BulkAddToCollection";
import AddCollectionDialog from "../components/mycollections/AddCollectionDialog";
import DeleteCollectionDialog from "../components/mycollections/DeleteCollectionDialog";
import EditCollectionDialog from "../components/mycollections/EditCollectionDialog";
import DeleteCollectionItemDialog from "../components/mycollections/DeleteCollectionItemDialog";

interface CollectionContextEnum {
    collectionsData: MyCollections;
    getCollectionDetail: (id:string) => void;
    collectionDetail: any;

    selectedItem: SelectedItem;
    handleOpenAddCollectionDialog: () => void;
    handleCloseAddCollectionDialog: () => void;
    addCollection: (data:MyCollection) => void;

    handleAddSelection: (data:CollectionItem) => void;
    handleRemoveSelection: (data:CollectionItem) => void;
    handleBulkAdd: (data:CollectionItem[], id: string[]) => void,

    handleSingleAdd: (data:CollectionItem, id: string[]) => void,

    handleOpenEditCollectionDialog: (id:string, title:string) => void;
    handleCloseEditCollectionDialog: () => void;
    editCollection: (newTitle:string) => void;

    handleOpenDeleteCollectionDialog: (id:string, title:string) => void;
    handleCloseDeleteCollectionDialog: () => void;
    deleteCollection: (id:string) => void;

    handleOpenDeleteCollectionItemDialog: (id:string, title:string, collectionId: string) => void;
    handleCloseDeleteCollectionItemDialog: () => void;
}

const initialState: CollectionContextEnum = {
    collectionsData: [],
    collectionDetail: {},
    getCollectionDetail: () => {},

    selectedItem: [],
    handleCloseAddCollectionDialog: () => {},
    handleOpenAddCollectionDialog: () => {},
    addCollection: () => {},

    handleAddSelection: () => {},
    handleRemoveSelection: () => {},
    handleBulkAdd: () => {},

    handleSingleAdd: () => {},

    editCollection: () => {},
    handleOpenEditCollectionDialog: () => {},
    handleCloseEditCollectionDialog: () => {},

    handleOpenDeleteCollectionDialog: () => {},
    handleCloseDeleteCollectionDialog: () => {},
    deleteCollection: () => {},

    handleOpenDeleteCollectionItemDialog: () => {},
    handleCloseDeleteCollectionItemDialog: () => {}
};

const CollectionsContext = createContext<CollectionContextEnum>(initialState);

const CollectionsProvider = ({ children }:{ children:React.ReactNode }) => {
    const [collectionsData, setCollectionsData] = useLocalStorage<MyCollections>('animepedia-mycollections', []);

    // reset
    // useEffect(() => {
    //     setCollectionsData([]);
    // }, [])

    // BULK ADD
    const [selectedItem, setSelectedItem] = useState<SelectedItem>([]);

    const handleAddSelection = (data:CollectionItem) => {
        setSelectedItem([...selectedItem, data]);
    }
    const handleRemoveSelection = (data:CollectionItem) => {
        setSelectedItem(selectedItem.filter(function(item:CollectionItem){
            // eslint-disable-next-line no-self-compare
            return item.id !== data.id
        }));
    }

    const handleBulkAdd = (data:CollectionItem[], collectionsId:string[]) => {
        const collections = [...collectionsData];

        for(let i=0; i<collections.length; i++){
            for(let j=0; j<collectionsId.length; j++){
                if(collections[i].id === collectionsId[j]){
                    const collectionItemsId = collections[i].items.flatMap(
                        item => item.id
                    )

                    for(let k=0; k<data.length; k++){
                        // validate if already exists, if anime id don't exist then add
                        if(!(collectionItemsId.includes(data[k].id))){
                            collections[i].items.push(data[k]);
                        }
                    }
                }
            }
        }
        setCollectionsData(collections);
        setSelectedItem([]);
    }

    // SINGLE ADD
    const handleSingleAdd = (data:CollectionItem, id:string[]) => {
        console.log(`ADD ${JSON.stringify(data)} to ${id}`);

        const collections = [...collectionsData];

        // CHECK IF ADDED
        let alreadyAdded:string[] = [];
        for(let i=0; i<collections.length; i++){
            for(let j=0; j<collections[i].items.length; j++){
                if(collections[i].items[j].id === data.id){
                    alreadyAdded.push(collections[i].id);
                }
            }
        }

        // DELETE IF UNCHECKED
        for(let i=0; i<collections.length; i++){
            for(let j=0; j<alreadyAdded.length; j++){
                if(collections[i].id === alreadyAdded[j]){
                    if(!(id.includes(collections[i].id))){
                        collections[i].items = collections[i].items.filter((item) => {
                            return item.id !== data.id;
                        });
                    }
                }
            }
        }

        // ADD and prevent double add
        for(let i=0; i<collections.length; i++){
            for(let j=0; j<id.length; j++){
                if(collections[i].id === id[j] && !alreadyAdded.includes(id[j])){
                    collections[i].items.push(data);
                }
            }
        }

        setCollectionsData(collections);
    }

    // ADD COLLECTION
    const [isOpenAddCollectionDialog, setIsOpenAddCollectionDialog] = useState(false);
    const handleOpenAddCollectionDialog = () => {
        setIsOpenAddCollectionDialog(true);
    }

    const handleCloseAddCollectionDialog = () => {
        setIsOpenAddCollectionDialog(false);
    }

    const addCollection = (data:MyCollection) => {
        setCollectionsData([...collectionsData, data]);
    }

    // EDIT COLLECTION
    const [isOpenEditCollectionDialog, setIsOpenEditCollectionDialog] = useState(false);
    const [selectedEdit, setSelectedEdit] = useState({id: "", title: ""});

    const handleOpenEditCollectionDialog = (id:string, title:string) => {
        setSelectedEdit({ id: id, title: title});
        setIsOpenEditCollectionDialog(true);
    }

    const handleCloseEditCollectionDialog = () => {
        setIsOpenEditCollectionDialog(false);
    }

    const editCollection = (newTitle:string) => {
        const collections = [...collectionsData];
        for(let i=0; i<collections.length; i++){
            if(collections[i].id === selectedEdit.id){
                collections[i].title = newTitle;
            }
        }
        setCollectionsData(collections);
    }

    // REMOVE COLLECTION
    const [isOpenDeleteCollectionDialog, setIsOpenDeleteCollectionDialog] = useState(false);
    const [selectedDelete, setSelectedDelete] = useState({id: "", title: ""});
    
    const handleOpenDeleteCollectionDialog = (id:string, title:string) => {
        setSelectedDelete({ id: id, title: title});
        setIsOpenDeleteCollectionDialog(true);
    }

    const handleCloseDeleteCollectionDialog = () => {
        setIsOpenDeleteCollectionDialog(false);
    }

    const handleDeleteCollection = () => {
        deleteCollection(selectedDelete.id);
    }
    
    const deleteCollection = (id:string) => {
        const collections = [...collectionsData];
        const deleted = collections.filter((item) => {
            return item.id !== id
        });

        setCollectionsData(deleted);
        handleCloseDeleteCollectionDialog();
    }

    // COLLECTION DETAIL
    const [collectionDetail, setCollectionDetail] = useState<any>([]);
    const getCollectionDetail = (id:string) => {
        const detail = collectionsData.find(x => x.id === id);
        setCollectionDetail(detail);
    }

    // DELETE COLLECTION ITEM
    const [isOpenDeleteCollectionItemDialog, setIsOpenDeleteCollectionItemDialog] = useState(false);
    const [selectedDeleteItem, setSelectedDeleteItem] = useState({ id: "", title: "", collectionId: ""});
    const handleOpenDeleteCollectionItemDialog = (id:string, title:string, collectionId: string) => {
        console.log(id);
        setSelectedDeleteItem({ id: id, title: title, collectionId: collectionId});
        setIsOpenDeleteCollectionItemDialog(true);
    }

    const handleCloseDeleteCollectionItemDialog = () => {
        setIsOpenDeleteCollectionItemDialog(false);
    }

    const handleDeleteCollectionItem = () => {
        const collections = [...collectionsData];
        for(let i=0; collections.length; i++){
            if(collections[i].id === selectedDeleteItem.collectionId){
                collections[i].items = collections[i].items.filter((item) => {
                    return item.id !== selectedDeleteItem.id
                });

                setCollectionsData(collections);
                break;
            }
        }

        handleCloseDeleteCollectionItemDialog();
    }

    return(
        <CollectionsContext.Provider
            value={{
                collectionsData,

                selectedItem,
                handleOpenAddCollectionDialog,
                handleCloseAddCollectionDialog,
                handleBulkAdd,

                addCollection,
                handleAddSelection,
                handleRemoveSelection,

                handleSingleAdd,

                handleOpenEditCollectionDialog,
                handleCloseEditCollectionDialog,
                editCollection,

                handleOpenDeleteCollectionDialog,
                handleCloseDeleteCollectionDialog,
                deleteCollection,

                getCollectionDetail,
                collectionDetail,

                handleOpenDeleteCollectionItemDialog,
                handleCloseDeleteCollectionItemDialog
            }}
        >
            {children}

            <BulkAddToCollection selectedItem={selectedItem} collectionsData={collectionsData} />
            <AddCollectionDialog open={isOpenAddCollectionDialog} onClose={handleCloseAddCollectionDialog} />

            <DeleteCollectionDialog title={selectedDelete.title} open={isOpenDeleteCollectionDialog} onClose={handleCloseDeleteCollectionDialog} handleDelete={handleDeleteCollection} />

            <EditCollectionDialog open={isOpenEditCollectionDialog} onClose={handleCloseEditCollectionDialog} title={selectedEdit.title} />

            <DeleteCollectionItemDialog title={selectedDeleteItem.title} open={isOpenDeleteCollectionItemDialog} onClose={handleCloseDeleteCollectionItemDialog} handleDelete={handleDeleteCollectionItem} />
        </CollectionsContext.Provider>
    )
}

export { CollectionsContext, CollectionsProvider }