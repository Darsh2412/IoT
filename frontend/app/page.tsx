import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [latest, setLatest] = useState({});

  useEffect(() => {
    axios.get(`${API_BASE}/api/data`).then((res) => {
      setData(res.data);

      const latestMap: any = {};
      res.data.forEach((item: any) => {
        latestMap[item.topic] = item;
      });
      setLatest(latestMap);
    });
  }, []);

  const topics = Object.keys(latest);

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">📊 IoT Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {topics.map((topic) => (
          <div key={topic} className="bg-white rounded-2xl shadow p-4 border border-gray-200">
            <h2 className="text-sm font-semibold text-gray-500 truncate">{topic}</h2>
            <p className="text-2xl font-bold text-blue-700">{latest[topic]?.value ?? "--"}</p>
            <p className="text-xs text-gray-400">
              {new Date(latest[topic]?.timestamp).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
      {topics.map((topic) => (
        <div key={topic} className="bg-white rounded-2xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">{topic} History</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.filter((d: any) => d.topic === topic)} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <Line type="monotone" dataKey="value" stroke="#3b82f6" dot={false} />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="timestamp" tickFormatter={(t) => new Date(t).toLocaleTimeString()} />
              <YAxis />
              <Tooltip labelFormatter={(t) => new Date(t).toLocaleString()} formatter={(v: any) => [v, topic]} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
}
