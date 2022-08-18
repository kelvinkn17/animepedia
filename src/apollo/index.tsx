import React from "react";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

interface ApolloProviderProps {
    children: React.ReactNode;
}

const client = new ApolloClient({
    uri: "https://graphql.anilist.co",
    cache: new InMemoryCache()
})

function theApolloProvider({children}: ApolloProviderProps) {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}

export default theApolloProvider;
