import React from 'react';
import PageHeader from '../PageHeader';
import { SORA_IMG } from '../../constants';

const NotFoundPage = () => (
  <div>
    <PageHeader
        upperTitle="Home of"
        lowerTitle="Sora"
        imageUrl={SORA_IMG}
    />
    <div className="content-container">
      <div style={{
        textAlign: "center",
        width: "100%"
      }}>
        <h1>404</h1>
        <h3>Page not Found</h3>
      </div>
    </div>
  </div>
);

export default NotFoundPage;