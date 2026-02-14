
import { GoogleGenAI } from "@google/genai";

/**
 * Service to handle Image and Video generation using Gemini models.
 * Note: In a production app, these calls should be made from a secure backend.
 */
export const geminiService = {
  /**
   * Generates an image using Gemini Nano Banana (gemini-2.5-flash-image)
   */
  async generateImage(prompt: string): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    // Add null safety checks
    if (!response || !response.candidates || response.candidates.length === 0) {
      throw new Error("No image generated. The API returned an empty response.");
    }

    const candidate = response.candidates[0];
    if (!candidate || !candidate.content || !candidate.content.parts) {
      throw new Error("Invalid response structure from Gemini API.");
    }

    for (const part of candidate.content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data returned from Gemini. The response did not contain inline image data.");
  },

  /**
   * Generates a video using Gemini Veo 3 (veo-3.1-fast-generate-preview)
   * @param resolution Supported values: '720p', '1080p'
   */
  async generateVideo(prompt: string, resolution: '720p' | '1080p', onProgress: (msg: string) => void): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    onProgress(`Initiating ${resolution} video generation (this takes 1-3 minutes)...`);

    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: resolution,
        aspectRatio: '16:9'
      }
    });

    // Add safety check for operation failures
    if (!operation) {
      throw new Error("Video generation failed to start. Please try again.");
    }

    while (!operation.done) {
      onProgress("Gemini is still dreaming... Processing video frames.");
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });

      // Check if operation failed during processing
      if (!operation) {
        throw new Error("Video generation operation failed. Please try again.");
      }
    }

    // Add null safety checks for the response
    if (!operation.response) {
      throw new Error("Video generation completed but no response was returned.");
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) {
      throw new Error("Video generation failed: No download URI returned. This may be due to content policy restrictions or a service error.");
    }

    onProgress("Fetching video stream...");
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);

    if (!response.ok) {
      throw new Error(`Failed to download video: ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }
};
