
import { Container, useTheme } from "@mui/material";
import Page from "../components/elements/Page";

const EmptyPage = () => {
    const theme = useTheme();

    return(
        <Page>
            <Container>
                <p style={{ color: theme.palette.primary.main }}>
                    EmptyPage
                </p>
            </Container>
        </Page>
    )
}

export default EmptyPage;