import React, { FunctionComponent } from 'react';

const InfoCard: FunctionComponent<{}> = ({ children }) => (
    <div className="card">
        <div className="info-body">
            {children}
        </div>
    </div>
);

export default InfoCard;