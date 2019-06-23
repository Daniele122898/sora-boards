import React from 'react';

const Banner = ({ children, red }: {children: React.ReactChild, red: boolean}) => (
    <div className={(red ? "red-banner" : "orange-banner")}>
        <div className="banner-outer-div">
            {children}
        </div>
    </div>
);


export default Banner;