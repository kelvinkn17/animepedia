
import { Container, useTheme } from "@mui/material";
import Page from "../components/elements/Page";

const MyCollectionsPage = () => {
    const theme = useTheme();

    return(
        <Page>
            <Container>
                <p style={{ color: theme.palette.primary.main }}>
                    MyCollectionsPage
                </p>
            </Container>
        </Page>
    )
}

export default MyCollectionsPage;