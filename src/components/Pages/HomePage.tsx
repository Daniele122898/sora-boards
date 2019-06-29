import React from 'react';
import PageHeader from '../PageHeader';
import { SORA_IMG } from '../../constants/index';

const HomePage = () => (
    <div>
        <PageHeader
            upperTitle="Home of"
            lowerTitle="Sora"
            imageUrl={SORA_IMG}
        />
        <div className="content-container">
            Stuff coming here soon...
        </div>
    </div>
)

export default HomePage;