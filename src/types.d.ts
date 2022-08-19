interface CollectionItem{
    id: string,
    title: string,
    coverImage: string
}

interface MyCollection{
    id:string
    title:string
    coverImage: string
    items: CollectionItem[]
}

interface MyCollections extends Array<MyCollection>{}

interface SelectedItem extends Array<CollectionItem>{}