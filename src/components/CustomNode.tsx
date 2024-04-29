// CustomNode.jsx
import React from 'react';
import { Handle } from 'react-flow-renderer';

const iconMapping = {
    "IAM User": "https://icon.icepanel.io/AWS/svg/Security-Identity-Compliance/IAM-Identity-Center.svg",
    "Role A": "https://image.pngaaa.com/719/5019719-middle.png",
    "Role B": "https://image.pngaaa.com/719/5019719-middle.png",
    "Role C": "https://image.pngaaa.com/719/5019719-middle.png",
    "Lambda Function": "https://icon.icepanel.io/AWS/svg/Compute/Lambda.svg",
    "EC2 Instance": "https://icon.icepanel.io/AWS/svg/Compute/EC2.svg",
    "S3 Bucket": "https://icon.icepanel.io/AWS/svg/Storage/Simple-Storage-Service.svg",
    "Database": "https://icon.icepanel.io/AWS/svg/Database/RDS.svg",
    "API Gateway": "https://icon.icepanel.io/AWS/svg/App-Integration/API-Gateway.svg",
    "Web Server": "https://icon.icepanel.io/AWS/svg/Migration-Transfer/Server-Migration-Service.svg",
    "Load Balancer": "https://icon.icepanel.io/AWS/svg/Networking-Content-Delivery/Elastic-Load-Balancing.svg",
    "Authentication Service": "https://cdn-images-1.medium.com/max/473/1*LwpMVkh5FAWqMRxmrdkYzw.png"
}

const CustomNode = ({ data }) => {
    const iconUrl = iconMapping[data.label];

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <Handle type="target" position="left" style={{ borderRadius: 0, opacity: "0" }} />
            {iconUrl && <img src={iconUrl} style={{ width: '50px', borderRadius: "4px" }} />}
            <div style={{ fontSize: "12px" }}>{data.label}</div>
            <Handle type="source" position="right" style={{ borderRadius: 0, opacity: "0" }} />
        </div>
    );
};

export default CustomNode;
