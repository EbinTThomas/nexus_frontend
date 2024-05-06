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
              "label": "IAM User"
            },
            "type": "custom"
          },
          {
            "id": "3",
            "data": {
              "label": "Administrator"
            },
            "type": "custom"
          },
          {
            "id": "4",
            "data": {
              "label": "All Services"
            },
            "type": "custom"
          },
          {
            "id": "7",
            "data": {
              "label": "S3 Bucket"
            },
            "type": "custom"
          },
          {
            "id": "8",
            "data": {
              "label": "Database"
            },
            "type": "custom"
          },
          {
            "id": "9",
            "data": {
              "label": "Network Infrastructure"
            },
            "type": "custom"
          }
        ],
        "edges": [
          {
            "id": "2",
            "source": "1",
            "target": "2"
          },
          {
            "id": "3",
            "source": "3",
            "target": "4",
            "label": "Gain Full Control"
          },
          {
            "id": "8",
            "source": "2",
            "target": "7",
            "label": "Access Cloud Storage"
          },
          {
            "id": "9",
            "source": "2",
            "target": "8",
            "label": "Access Database"
          },
          {
            "id": "10",
            "source": "2",
            "target": "9",
            "label": "Infiltrate Network"
          },
          {
            "id": "11",
            "source": "7",
            "target": "4",
            "label": "Exfiltrate Sensitive Data"
          },
          {
            "id": "12",
            "source": "8",
            "target": "4",
            "label": "Extract Database Information"
          },
          {
            "id": "13",
            "source": "9",
            "target": "3",
            "label": "Escalate to Admin via Network"
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
  );
}