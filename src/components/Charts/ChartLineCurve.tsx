import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export function ChartLineCurve() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="5 5" strokeOpacity={0.4} />
        <XAxis dataKey="name" tick={{ fill: "#c3c3c3" }} />
        <YAxis tick={{ fill: "#c3c3c3" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#333",
            border: "1px solid #c3c3c3",
            borderRadius: "12px",
            padding: "10px",
            color: "#fff",
          }}
          labelStyle={{ color: "#fff" }}
        />

        <Area type="monotone" dataKey="uv" stroke="#0E9CFF" fill="#006ebc" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
