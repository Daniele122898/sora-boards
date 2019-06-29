import React, { FunctionComponent } from 'react';

interface Props {
    style?: React.CSSProperties;
}

const InfoCard: FunctionComponent<Props> = ({ children, style }) => (
    <div className="card" style={style}>
        <div className="info-body">
            {children}
        </div>
    </div>
);

export default InfoCard;