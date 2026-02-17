import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!

let model: any = null

if (apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey)
  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
} else {
  console.warn("Gemini API key missing")
}

export { model }

/**
 * Analyzes a tree image using Gemini AI to determine health metrics
 * Falls back to mock data if API is unavailable or rate limited
 */
export async function analyzeTreeImage(file: File) {
  // Convert file to base64
  const base64 = await fileToBase64(file)

  if (!model || !apiKey) {
    console.warn("Gemini API not configured, using mock data")
    return generateMockAnalysis()
  }

  try {
    const prompt = `Analyze this tree image and provide the following information in JSON format:
{
  "detectedSpecies": "string - Scientific or common name of the tree species",
  "healthStatus": "string - either 'Healthy', 'Moderate', or 'Critical'",
  "greenCoverage": number - percentage of green/healthy foliage (0-100),
  "leafDensity": number - density of leaves as a percentage (0-100),
  "waterNeeds": "string - either 'Low', 'Medium', or 'High'",
  "recommendation": "string - Brief recommendation for tree care",
  "confidence": number - AI confidence level (0-100)
}

Analyze the tree carefully and provide realistic values based on what you see in the image.`

    const imagePart = {
      inlineData: {
        data: base64.split(",")[1], // Remove data:image/xxx;base64, prefix
        mimeType: file.type,
      },
    }

    const result = await model.generateContent([prompt, imagePart])
    const response = await result.response
    const text = response.text()

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const analysis = JSON.parse(jsonMatch[0])
      return {
        ...analysis,
        isMock: false,
      }
    } else {
      throw new Error("Failed to parse AI response")
    }
  } catch (error: any) {
    console.error("Gemini API error:", error)

    // Check if it's a rate limit error
    if (error.message?.includes("quota") || error.message?.includes("rate limit")) {
      console.warn("Rate limit hit, using mock data")
      return generateMockAnalysis()
    }

    // For other errors, try mock data as fallback
    console.warn("API error, using mock data as fallback")
    return generateMockAnalysis()
  }
}

/**
 * Generate mock analysis data when AI is unavailable
 */
function generateMockAnalysis() {
  const healthOptions: Array<"Healthy" | "Moderate" | "Critical"> = ["Healthy", "Moderate", "Critical"]
  const waterOptions = ["Low", "Medium", "High"]
  const speciesOptions = [
    "Neem (Azadirachta indica)",
    "Peepal (Ficus religiosa)",
    "Banyan (Ficus benghalensis)",
    "Mango (Mangifera indica)",
    "Gulmohar (Delonix regia)",
    "Ashoka (Saraca asoca)",
  ]

  const health = healthOptions[Math.floor(Math.random() * healthOptions.length)]
  const greenCoverage = health === "Healthy" ? 80 + Math.random() * 20 : health === "Moderate" ? 55 + Math.random() * 25 : 30 + Math.random() * 25
  const leafDensity = greenCoverage * (0.8 + Math.random() * 0.2)

  return {
    detectedSpecies: speciesOptions[Math.floor(Math.random() * speciesOptions.length)],
    healthStatus: health,
    greenCoverage: Math.round(greenCoverage),
    leafDensity: Math.round(leafDensity),
    waterNeeds: waterOptions[Math.floor(Math.random() * waterOptions.length)],
    recommendation:
      health === "Healthy"
        ? "Tree is in excellent condition. Continue regular maintenance."
        : health === "Moderate"
          ? "Tree shows moderate stress. Increase watering and check for pests."
          : "Tree requires immediate attention. Consider consulting an arborist.",
    confidence: Math.round(75 + Math.random() * 20),
    isMock: true,
  }
}

/**
 * Convert File to base64 string
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

