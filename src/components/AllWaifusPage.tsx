import React from 'react';
import PageHeader from './PageHeader';
import { SORA_IMG } from '../constants/index';

class AllWaifusPage extends React.Component<{}> {
  render() {
    return (
      <div>
        <PageHeader 
          upperTitle="All available" 
          lowerTitle="Waifus"
          imageUrl={SORA_IMG} 
        />
      </div>
    );
  }
}

export default AllWaifusPage;