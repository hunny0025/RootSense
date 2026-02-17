import { supabase } from "./supabase"

export async function getTrees() {
    const { data, error } = await supabase
        .from("trees")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching trees:", error)
        throw error
    }

    return data || []
}

export async function addTree(payload: {
    tree_id: string
    location: string
    species: string
    health: "Healthy" | "Moderate" | "Critical"
    green_coverage: number
    leaf_density: number
    water_needs: string
    recommendation: string
    image_url: string
    confidence: number
}) {
    const { data, error } = await supabase
        .from("trees")
        .insert([payload])
        .select()

    if (error) {
        console.error("Error adding tree:", error)
        throw error
    }

    return data
}
