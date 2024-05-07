"use client";

import React, { useEffect, useState } from 'react';
import axios from '@/api/axios';
import ReactFlow, {
  Controls,
  ReactFlowProvider,
  MarkerType,
} from 'react-flow-renderer';
import Dagre from '@dagrejs/dagre';
import CustomNode from '@/components/custom-node';
import Header from '@/components/common/header';

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
      // const { data } = await axios.get('/graph');
      const data = {
        "nodes": [
          {
            "id": "1",
            "data": {
              "label": "Internet"
            },
            "type": "custom"
          },
          {
            "id": "2",
            "data": {
              "label": "User"
            },
            "type": "custom"
          },
          {
            "id": "3",
            "data": {
              "label": "IAM Service"
            },
            "type": "custom"
          },
          {
            "id": "4",
            "data": {
              "label": "Administrator"
            },
            "type": "custom"
          },
          {
            "id": "5",
            "data": {
              "label": "S3 Bucket Service"
            },
            "type": "custom"
          },
          {
            "id": "6",
            "data": {
              "label": "RDS Service"
            },
            "type": "custom"
          },
          {
            "id": "7",
            "data": {
              "label": "EC2 Service"
            },
            "type": "custom"
          }
        ],
        "edges": [
          {
            "id": "1",
            "source": "1",
            "target": "2"
          },
          {
            "id": "2",
            "source": "2",
            "target": "3",
            "label": "IAM Access"
          },
          {
            "id": "3",
            "source": "3",
            "target": "4",
            "label": "Escalate to Administrator"
          },
          {
            "id": "4",
            "source": "4",
            "target": "5"
          },
          {
            "id": "5",
            "source": "4",
            "target": "6"
          },
          {
            "id": "6",
            "source": "4",
            "target": "7"
          }
        ]
      }

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
    <>
      <Header title="Assessment Visualization" description="A Visualization of the exploited path with the assigned keys" />
      <div className="h-[calc(100vh-150px)] w-[100%]">
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
    </>
  );
}