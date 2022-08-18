import styled from "@emotion/styled";
import React from "react";

interface MaxLineProps{
    line: number,
    children: React.ReactNode
}

const MaxLine = ({ line, children }:MaxLineProps) => {
    const MaxLineItem = styled.div(
        {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: line,
            WebkitBoxOrient: 'vertical',
        }
    )

    return(
        <MaxLineItem>
            {children}
        </MaxLineItem>
    )
}

export default MaxLine;