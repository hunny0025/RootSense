// In-memory storage for issues
let issues = [
    {
        id: 1,
        title: "Broken Irrigation System - Block A",
        description: "Main water line damaged near admin building",
        location: "Block A, North Campus",
        status: "Open",
        assigned_to: null,
        priority: "Critical",
        created_at: new Date().toISOString()
    },
    {
        id: 2,
        title: "Dead Tree Removal Required",
        description: "Large oak tree showing signs of disease",
        location: "Block C, East Lawn",
        status: "In Progress",
        assigned_to: "Maintenance Team Alpha",
        priority: "Medium",
        created_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
        id: 3,
        title: "Waste Accumulation - Parking Lot",
        description: "Debris and waste accumulating in south parking area",
        location: "South Parking Lot",
        status: "Resolved",
        assigned_to: "Sanitation Crew",
        priority: "Low",
        created_at: new Date(Date.now() - 172800000).toISOString()
    }
];

let nextId = 4;

const getAllIssues = (req, res) => {
    const { status, priority } = req.query;

    let filteredIssues = issues;

    if (status) {
        filteredIssues = filteredIssues.filter(issue => issue.status === status);
    }

    if (priority) {
        filteredIssues = filteredIssues.filter(issue => issue.priority === priority);
    }

    res.json({ success: true, data: filteredIssues });
};

const createIssue = (req, res) => {
    const { title, description, location, priority } = req.body;

    if (!title || !location) {
        return res.status(400).json({ success: false, message: 'Title and location are required' });
    }

    const newIssue = {
        id: nextId++,
        title,
        description: description || '',
        location,
        status: 'Open',
        assigned_to: null,
        priority: priority || 'Medium',
        created_at: new Date().toISOString()
    };

    issues.push(newIssue);
    res.status(201).json({ success: true, data: newIssue });
};

const updateIssue = (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const issueIndex = issues.findIndex(issue => issue.id === parseInt(id));

    if (issueIndex === -1) {
        return res.status(404).json({ success: false, message: 'Issue not found' });
    }

    issues[issueIndex] = { ...issues[issueIndex], ...updates };
    res.json({ success: true, data: issues[issueIndex] });
};

const deleteIssue = (req, res) => {
    const { id } = req.params;

    const issueIndex = issues.findIndex(issue => issue.id === parseInt(id));

    if (issueIndex === -1) {
        return res.status(404).json({ success: false, message: 'Issue not found' });
    }

    issues.splice(issueIndex, 1);
    res.json({ success: true, message: 'Issue deleted successfully' });
};

const getIssueStats = (req, res) => {
    const stats = {
        total: issues.length,
        open: issues.filter(i => i.status === 'Open').length,
        in_progress: issues.filter(i => i.status === 'In Progress').length,
        resolved: issues.filter(i => i.status === 'Resolved').length,
        critical: issues.filter(i => i.priority === 'Critical').length
    };

    res.json({ success: true, data: stats });
};

module.exports = { getAllIssues, createIssue, updateIssue, deleteIssue, getIssueStats };
