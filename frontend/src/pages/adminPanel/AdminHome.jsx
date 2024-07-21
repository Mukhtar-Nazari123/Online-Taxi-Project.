import React from 'react'
import LineChartGraph from '../allGraphs/LineChartGraph';
import GraphBarChart from '../allGraphs/GraphBarChart';

function AdminHome() {
  return (
    <div>
      <GraphBarChart/>
      <LineChartGraph/>
    </div>
  )
}

export default AdminHome