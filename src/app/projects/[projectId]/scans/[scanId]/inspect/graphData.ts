type NodeType = {
    id: string;
    type: string;
    data: { label: string };
    position?: { x: number; y: number };
};

type EdgeType = {
    id: number;
    source: string;
    target: string;
    label: string;
};

type GraphData = {
    nodes: NodeType[];
    edges: EdgeType[];
};

export function positionNodes(data: GraphData) {
    const nodeSpacingX = 200; // Horizontal spacing between nodes
    const nodeSpacingY = 100; // Vertical spacing between nodes
    const levels: { [key: string]: number } = {};
    const subLevels: { [key: string]: number } = {};

    // Assign levels to nodes
    data.edges.forEach(edge => {
        levels[edge.target] = (levels[edge.source] || 0) + 1;
        subLevels[edge.source] = (subLevels[edge.source] || 0) + 1;
    });

    // Calculate positions
    const positionedNodes = data.nodes.map(node => {
        const level = levels[node.id] || 0;
        const subLevel = subLevels[node.id] || 0;
        return {
            ...node,
            type: "custom",
            position: {
                x: level * nodeSpacingX,
                y: subLevel * nodeSpacingY,
            },
        };
    });

    // Sort nodes by level and sublevel to minimize edge crossing
    positionedNodes.sort((a, b) => {
        const levelA = levels[a.id] || 0;
        const levelB = levels[b.id] || 0;
        const subLevelA = subLevels[a.id] || 0;
        const subLevelB = subLevels[b.id] || 0;
        return levelA - levelB || subLevelA - subLevelB;
    });

    return {
        nodes: positionedNodes,
        edges: data.edges,
    };
}