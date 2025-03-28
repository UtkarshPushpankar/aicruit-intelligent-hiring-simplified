import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer
} from "recharts";
import styled from "styled-components";

const SparklineChart = ({ data, color = "#8884d8" }) => {
  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height={50}>
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

const ChartWrapper = styled.div`
  width: 80px; /* Adjust to fit your card design */
  height: 50px;
`;

export default SparklineChart;
