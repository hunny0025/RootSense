export const config = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  geminiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || ""
}
