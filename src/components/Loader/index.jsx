import React from 'react';

import ContentLoader from "react-content-loader"

const Loader = (props) => (
    <ContentLoader
        speed={2}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="135" y="9" rx="0" ry="0" width="245" height="138" />
        <rect x="198" y="74" rx="0" ry="0" width="3" height="26" />
    </ContentLoader>
)

export default Loader;