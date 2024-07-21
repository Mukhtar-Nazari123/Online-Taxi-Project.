import React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    name: "Jan",
    pv: 2450,
  },
  {
    name: "Feb",
    pv: 3398,
  },
  {
    name: "Mar",
    pv: 6000,
  },
  {
    name: "Apr",
    pv: 3408,
  },
  {
    name: "May",
    pv: 4800,
  },
  {
    name: "Jun",
    pv: 3800,
  },
  {
    name: "Jul",
    pv: 4300,
  },
  {
    name: "Aug",
    pv: 4900,
  },
  {
    name: "Sep",
    pv: 3700,
  },
  {
    name: "Oct",
    pv: 2500,
  },
  {
    name: "Nov",
    pv: 2000,
  },
  {
    name: "Dec",
    pv: 4300,
  }
];

export default function App() {
  return (
    <div className="row">
      <div className="col-md-6" >
      <h4>Trip Volume Graph</h4>
      <ResponsiveContainer width="100%" height={300} className="bg-white rounded m-1">
      <ComposedChart
          width={500}
          height={200}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="pv" stroke="#ff7300" />
        </ComposedChart>
    </ResponsiveContainer>
      </div>
      <div className="col-md-6">
      <h4>Trip Volume Graph</h4>
      <ResponsiveContainer width="100%" height={300} className="bg-white rounded m-1">
            <AreaChart
              width={500}
              height={200}
              data={data}
              syncId="anyId"
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
      </div>
    </div>
  );
}
