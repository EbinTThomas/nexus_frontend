"use client";

import React, { useEffect, useState } from 'react';
import axios from '@/api/axios';
import ReactFlow, {
  Controls,
  ReactFlowProvider,
  MarkerType,
} from 'react-flow-renderer';
import Dagre from '@dagrejs/dagre';
import CustomNode from '@/components/CustomNode';

// Initialize the graph
const g = new Dagre.graphlib.Graph().setGraph({}).setDefaultEdgeLabel(() => ({}));

// Function to layout the elements using Dagre
const getLayoutedElements = (nodes, edges, direction = 'LR') => {
  g.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    g.setNode(node.id, { ...node.data, width: 172, height: 36 });
  });

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const nodeWithPosition = g.node(node.id);
      return {
        ...node,
        position: { x: nodeWithPosition.x, y: nodeWithPosition.y },
      };
    }),
    edges: edges.map((edge) => ({
      ...edge,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    })),
  };
};

// React component for the flow
export default function BasicFlow() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // Fetch graph data and set nodes and edges
  const fetchGraphData = async () => {
    try {
      const { data } = await axios.get('/graph');
      const layoutedElements = getLayoutedElements(data.nodes, data.edges);
      setNodes(layoutedElements.nodes);
      setEdges(layoutedElements.edges);
    } catch (error) {
      console.error('Failed to fetch graph data:', error);
    }
  };

  // Effect hook to fetch data on mount
  useEffect(() => {
    fetchGraphData();
  }, []);

  // Define custom node types
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
}