import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a mock client that throws helpful errors when Supabase is not configured
const createMockClient = () => {
    const handler = {
        get() {
            throw new Error(
                "Supabase not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file"
            )
        }
    }
    return new Proxy({}, handler) as any
}

if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
        "⚠️  Supabase credentials missing!\n" +
        "Please create a .env.local file with:\n" +
        "  NEXT_PUBLIC_SUPABASE_URL=your_project_url\n" +
        "  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key\n" +
        "See .env.local.example for template"
    )
}

export const supabase = (!supabaseUrl || !supabaseAnonKey)
    ? createMockClient()
    : createClient(supabaseUrl, supabaseAnonKey)
