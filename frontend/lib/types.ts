export interface Tree {
  id: string
  latitude: number
  longitude: number
  health: "healthy" | "moderate" | "critical"
}

export interface Issue {
  id: string
  title: string
  status: "open" | "assigned" | "resolved"
  location: string
}
