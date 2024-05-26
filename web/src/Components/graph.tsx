import React, { FC, memo, useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { GraphData, CitizenNamePerAge } from '../types';

interface StackedGraphProps {
    graphData: GraphData[];
}
type Item = {
    emri: string;
    viti: number;
    totali: string;
    id: number;
    [key: string]: string | number;
};

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#00C49F", "#FFBB28", "#FF8042"]; // Add more colors if needed


const StackedGraph: FC<StackedGraphProps> = ({ graphData }) => {
    const [allData, setAllData] = useState<any[]>([]);

    useEffect(() => {
        const dataKeys = graphData.map((_, index) => `dataKey-${index}`);
        const defaultData = Object.fromEntries(dataKeys.map(key => [key, 0]));

        const combinedData = graphData.flatMap((item, index) =>
            item.data.map(citizen => ({
                ...defaultData,
                ...citizen,
                [`dataKey-${index}`]: `${citizen.totali}`
            }))
        );

        let groupedData: Item[] = [];
        combinedData.forEach((item: Item) => {
            const existingItem = groupedData.find(i => i.viti === item.viti);
            if (existingItem) {
                dataKeys.forEach(key => {
                    existingItem[key] = Number(existingItem[key]) + Number(item[key]);
                });
            } else {
                groupedData.push({ ...item });
            }
        });

        const sortedData = groupedData.sort((a, b) => a.viti - b.viti);

        setAllData(sortedData);
        console.log(sortedData);

    }, [graphData]);

    return (
        <AreaChart
            width={1000}
            height={800}
            data={allData}
            margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="viti" />
            <YAxis />
            <Tooltip />
            {graphData.map((item, index) => (
                <Area
                    key={index}
                    type="monotone"
                    stackId={`${index}stack`}
                    dataKey={`dataKey-${index}`}
                    stroke={colors[index % colors.length]}
                    fill={colors[index % colors.length]}
                />
            ))}
        </AreaChart>
    );
};

export default memo(StackedGraph);