import useLocalStorage from "use-local-storage";
import React, {createContext, useState} from "react";
import BulkAddToCollection from "../components/mycollections/BulkAddToCollection";
import AddCollectionDialog from "../components/mycollections/AddCollectionDialog";
import DeleteCollectionDialog from "../components/mycollections/DeleteCollectionDialog";

interface CollectionContextEnum {
    collectionsData: MyCollections;
    selectedItem: SelectedItem,
    handleOpenAddCollectionDialog: () => void;
    handleCloseAddCollectionDialog: () => void;
    addCollection: (data:MyCollection) => void;
    handleAddSelection: (data:CollectionItem) => void;
    handleBulkAdd: (data:CollectionItem[], id: string[]) => void,
    handleRemoveSelection: (data:CollectionItem) => void;
    handleOpenDeleteCollectionDialog: (id:string, title:string) => void;
    handleCloseDeleteCollectionDialog: () => void;
    editCollection: (id:string, newTitle:string) => void;
    deleteCollection: (id:string) => void;
}

const initialState: CollectionContextEnum = {
    collectionsData: [],
    selectedItem: [],
    handleCloseAddCollectionDialog: () => {},
    handleOpenAddCollectionDialog: () => {},
    addCollection: () => {},
    handleAddSelection: () => {},
    handleRemoveSelection: () => {},
    handleBulkAdd: () => {},
    editCollection: () => {},
    handleOpenDeleteCollectionDialog: () => {},
    handleCloseDeleteCollectionDialog: () => {},
    deleteCollection: () => {}
};

const MY_COLLECTIONS = [
    {
        id: "1",
        title: "Collection 1",
        coverImage: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/bx143056-Z3TwOoUsXHEY.jpg",
        items: [
            {
                id: "1",
                title: "Anime 1",
                coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx101348-msJS8z91mG0P.jpg"
            },
            {
                id: "2",
                title: "Anime 2",
                coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx101348-msJS8z91mG0P.jpg"
            },
            {
                id: "3",
                title: "Anime 3",
                coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx101348-msJS8z91mG0P.jpg"
            },
        ]
    },
    {
        id: "1",
        title: "Collection 1",
        coverImage: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/bx143056-Z3TwOoUsXHEY.jpg",
        items: [
            {
                id: "1",
                title: "Anime 1",
                coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx101348-msJS8z91mG0P.jpg"
            },
            {
                id: "2",
                title: "Anime 2",
                coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx101348-msJS8z91mG0P.jpg"
            },
            {
                id: "3",
                title: "Anime 3",
                coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx101348-msJS8z91mG0P.jpg"
            },
        ]
    },
]

const CollectionsContext = createContext<CollectionContextEnum>(initialState);

const CollectionsProvider = ({ children }:{ children:React.ReactNode }) => {
    const [collectionsData, setCollectionsData] = useLocalStorage<MyCollections>('animepedia-mycollections', MY_COLLECTIONS);

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
            return item.id !== item.id
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

    // ADD COLLECTION
    const [isOpenAddCollectionDialog, setIsOpenAddCollectionDialog] = useState(false);
    const handleOpenAddCollectionDialog = () => {
        setIsOpenAddCollectionDialog(true);
    }

    const handleCloseAddCollectionDialog = () => {
        setIsOpenAddCollectionDialog(false);
    }

    const addCollection = (data:MyCollection) => {
        console.log(`add: ${JSON.stringify(data)}`);
        setCollectionsData([...collectionsData, data]);
    }

    const editCollection = (id:string, newTitle:string) => {
        console.log(`EDIT ${id} to ${newTitle}`);
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
                editCollection,

                handleOpenDeleteCollectionDialog,
                handleCloseDeleteCollectionDialog,
                deleteCollection
            }}
        >
            {children}

            <BulkAddToCollection selectedItem={selectedItem} collectionsData={collectionsData} />
            <AddCollectionDialog open={isOpenAddCollectionDialog} onClose={handleCloseAddCollectionDialog} />
            <DeleteCollectionDialog title={selectedDelete.title} open={isOpenDeleteCollectionDialog} onClose={handleCloseDeleteCollectionDialog} handleDelete={handleDeleteCollection} />
        </CollectionsContext.Provider>
    )
}

export { CollectionsContext, CollectionsProvider }