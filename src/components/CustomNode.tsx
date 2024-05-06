// CustomNode.jsx
import React from 'react';
import { Handle } from 'react-flow-renderer';

const iconMapping = {
    "Internet": "https://uxwing.com/wp-content/themes/uxwing/download/location-travel-map/earth-icon.png",
    "Administrator": "https://aui.atlassian.com/aui/latest/docs/images/avatar-person.svg",
    "All Services": "https://www.unimedia.tech/wp-content/uploads/2023/10/1200px-AmazonWebservices_Logo.svg_.png",
    "IAM User": "https://icon.icepanel.io/AWS/svg/Security-Identity-Compliance/IAM-Identity-Center.svg",
    "Malware": "https://cdn-icons-png.freepik.com/512/10098/10098868.png",
    "Phishing Attack": "https://cdn.iconscout.com/icon/free/png-256/free-phishing-attack-1591605-1354005.png",
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
    "Authentication Service": "https://cdn-images-1.medium.com/max/473/1*LwpMVkh5FAWqMRxmrdkYzw.png",
    "Database": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnItTtilRQ6-uLYI0hoKQoP_FJ8Ckl5XNIJno6E55olQ&s",
    "Network Infrastructure": "https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/modules/aws-application-deployment-and-monitoring/distribute-traffic-with-elastic-load-balancing/images/3978da67b6e6f628d882ce11182c0130_e-9-e-4-e-306-75-e-1-4-f-96-b-77-c-0778612-b-37-f-6.png"
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
