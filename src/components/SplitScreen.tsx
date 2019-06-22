import React, { ReactChild } from 'react';

const SplitScreen = ({children, splitFirst} : 
    {children: ReactChild[], splitFirst: number}) => (
    <div className="content-container split-between">
        <div className={`split-between-${splitFirst}`}>
            { children[0] }
        </div>
        <div className={`split-between-${100-splitFirst}`}>
            { children[1] }
        </div>
    </div>
);

export default SplitScreen;