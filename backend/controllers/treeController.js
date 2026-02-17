// Simulated campus tree data with clustering
// Campus center: assuming a typical college campus coordinates
const CAMPUS_CENTER = { lat: 28.5355, lng: 77.3910 }; // Example coordinates

// Generate simulated tree locations with density clustering
const generateTreeData = () => {
    const trees = [];

    // High density area (North Campus - near academic buildings)
    for (let i = 0; i < 40; i++) {
        trees.push({
            latitude: CAMPUS_CENTER.lat + (Math.random() - 0.5) * 0.003,
            longitude: CAMPUS_CENTER.lng + (Math.random() - 0.5) * 0.003,
            density_weight: 0.8 + Math.random() * 0.2
        });
    }

    // Medium density area (East Campus - sports grounds)
    for (let i = 0; i < 25; i++) {
        trees.push({
            latitude: CAMPUS_CENTER.lat + 0.002 + (Math.random() - 0.5) * 0.004,
            longitude: CAMPUS_CENTER.lng + 0.003 + (Math.random() - 0.5) * 0.004,
            density_weight: 0.4 + Math.random() * 0.3
        });
    }

    // Low density area (South Campus - parking)
    for (let i = 0; i < 15; i++) {
        trees.push({
            latitude: CAMPUS_CENTER.lat - 0.003 + (Math.random() - 0.5) * 0.004,
            longitude: CAMPUS_CENTER.lng - 0.002 + (Math.random() - 0.5) * 0.004,
            density_weight: 0.2 + Math.random() * 0.2
        });
    }

    return trees;
};

const getHeatmapData = (req, res) => {
    const treeData = generateTreeData();

    res.json({
        success: true,
        data: {
            trees: treeData,
            center: CAMPUS_CENTER,
            simulation_mode: true
        }
    });
};

module.exports = { getHeatmapData };
