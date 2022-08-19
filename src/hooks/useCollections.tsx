import { useContext} from "react";
import {CollectionsContext} from "../context/CollectionsContext";

const useCollections = () => useContext(CollectionsContext);

export default useCollections;