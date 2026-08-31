import { GoogleGenerativeAI } from "@google/generative-ai";

const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const geminiModel = genai.getGenerativeModel({
    model:"gemini-2.5-flash"
})

export function buildprompt (repoURL, options){
 return `
 You are a professional technical writer.
 Generate a complete professional and well structured Readme.md
 for this Github repository : ${repoURL}
 Tone :${options.tone}
 ProjectType :${options.projectType}
 Make it professional, clear and useful.
Use proper markdown formatting with badges, 
code blocks, and emojis.
Only return the README content — nothing else.
`
}