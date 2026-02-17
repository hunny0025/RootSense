import { config } from "./config"

export async function fetchTrees() {
  const res = await fetch(`${config.backendUrl}/trees`)
  if (!res.ok) throw new Error("Failed to fetch trees")
  return res.json()
}

export async function reportIssue(data: any) {
  const res = await fetch(`${config.backendUrl}/issues`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function getHeatmapData() {
  try {
    const res = await fetch(`${config.backendUrl}/heatmap`)
    if (!res.ok) throw new Error("Failed to fetch heatmap data")
    return await res.json()
  } catch (error) {
    console.error("Error fetching heatmap data:", error)
    return { success: false, data: null }
  }
}

export async function getIssues() {
  const res = await fetch(`${config.backendUrl}/issues`)
  if (!res.ok) throw new Error("Failed to fetch issues")
  return res.json()
}

export async function updateIssue(id: string, data: any) {
  const res = await fetch(`${config.backendUrl}/issues/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to update issue")
  return res.json()
}

export async function deleteIssue(id: string) {
  const res = await fetch(`${config.backendUrl}/issues/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Failed to delete issue")
  return res.json()
}

export async function getSystemStatus() {
  const res = await fetch(`${config.backendUrl}/admin/system-status`)
  if (!res.ok) throw new Error("Failed to fetch system status")
  return res.json()
}

export async function getIssueStats() {
  const res = await fetch(`${config.backendUrl}/admin/issue-stats`)
  if (!res.ok) throw new Error("Failed to fetch issue stats")
  return res.json()
}
