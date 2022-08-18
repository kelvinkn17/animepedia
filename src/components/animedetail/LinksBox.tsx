import { Markup } from "interweave"
import { Typography, useTheme } from "@mui/material"
import Box from "../elements/Box";
import { useState } from "react";
import { string } from "prop-types";
import SvgIconStyle from "../elements/SvgIconStyle";
import MaxLine from "../elements/MaxLine";

interface LinksBoxProps{
    links: [{
        site: string,
        icon: string,
        url: string
    }]
}

const LinksBox = ({ links }:LinksBoxProps) => {
    const theme = useTheme();

    console.log(links);

    return(
        <>
        <Box style={{ marginTop: '1rem', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography variant="h6" component="h2" style={{ fontSize: '1rem', opacity: '0.6', marginRight: '1rem'}}>
                Links
            </Typography>

            {/* <div style={{ flexGrow: '1', marginRight: '1rem', textAlign: 'right', opacity: '0.4' }}>
                <MaxLine line={1}>
                    {links.map((item:any, index:number) => {
                        return(
                            <>
                                {item.site}.{" "}
                            </>
                        )
                    })}
                </MaxLine>
            </div> */}

            <div>
                {'>'}
            </div>
        </Box>

        <div>
            {links.map((item, index) => {
                return(
                    <div style={{ padding: '1.2rem 0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #00000010' }}>
                        <div>
                            {item.url}
                        </div>

                        <button>
                            <SvgIconStyle src="/assets/icons/icon_redirect.svg" sx={{ width: '1.2rem', height: '1.2rem'}} />
                        </button>
                    </div>
                )
            })}
        </div>
        </>
    )
}

export default LinksBox