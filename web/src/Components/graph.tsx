import React, { FC, memo, useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { GraphData, CitizenNamePerAge } from '../types';
import { Color } from '../API/Enums/EnumColors';

interface StackedGraphProps {
    graphData: GraphData[];
    isStacked: boolean;
    emriValues: string[];
}
type Item = {
    emri: string;
    viti: number;
    totali: string;
    id: number;
    [key: string]: string | number;
};

interface TooltipProps {
    active?: boolean;
    payload?: { value: string; }[];
    label?: string;
    emriValues: string[];
}

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#00C49F", "#FFBB28", "#FF8042"]; // Add more colors if needed


const StackedGraph: FC<StackedGraphProps> = ({ graphData, isStacked , emriValues}) => {
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

    const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label, emriValues }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`Year : ${label}`}</p>
                    {payload.map((item, index) => (
                        <p key={index} className="desc">
                            {`Emri ${emriValues[index]}: ${item.value}`}
                        </p>
                    ))}
                </div>
            );
        }

        return null;
    };

    return (
        <AreaChart
            width={1400}
            height={900}
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
            <Tooltip content={<CustomTooltip emriValues={emriValues} />} />
            {graphData.map((item, index) => (
                <Area
                    key={index}
                    type="monotone"
                    stackId={isStacked ? '1' : `${index}stack`}
                    dataKey={`dataKey-${index}`}
                    stroke={Color[`Number${index + 1}` as keyof typeof Color]}
                    fill={Color[`Number${index + 1}` as keyof typeof Color]}
                />
            ))}
        </AreaChart>
    );
};

export default memo(StackedGraph);