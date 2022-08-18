import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';

interface PageProps {
    children: React.ReactNode;
    title?: string;
    meta?: React.ReactNode;
}

// ----------------------------------------------------------------------

const Page = (({
    children,
    title = '',
    meta,
    ...other
}: PageProps) => (
    <>
        <Helmet>
            <title>{`${title} - Animepedia`}</title>
            {meta}
        </Helmet>

        <div {...other} style={{ zIndex: 2, marginTop: '2.8rem', marginBottom: '8rem', flexGrow: '1' }}>
            {children}
        </div>
    </>
));

export default Page;
