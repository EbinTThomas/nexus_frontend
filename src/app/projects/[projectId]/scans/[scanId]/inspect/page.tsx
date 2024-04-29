"use client";

import axios from '@/api/axios';
import ReactFlow, {
    Controls,
    ReactFlowProvider,
    MarkerType
} from 'react-flow-renderer';
import { positionNodes } from './graphData';
import { useEffect, useState } from 'react';
import CustomNode from '@/components/CustomNode';

export default function BasicFlow() {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    const fetchGraphData = async () => {
        try {
            const response = await axios.get("/graph");
            const positionedData = positionNodes(response.data);
            setNodes(positionedData.nodes);
            const edgesWithArrows = positionedData.edges.map(edge => ({
                ...edge,
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                  },
            }));
            setEdges(edgesWithArrows);
        } catch (error) {
            console.error('Failed to fetch graph data:', error);
        }
    };

    useEffect(() => {
        fetchGraphData();
    }, [])

    const nodeTypes = {
        custom: CustomNode,
    };

    return (
        <div className="h-[100vh] w-[100%]">
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    fitView
                >
                    <Controls />
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    );
};
