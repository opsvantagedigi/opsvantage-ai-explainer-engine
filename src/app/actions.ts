'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs, orderBy } from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

// --- DIAGNOSTIC TEST: HARDCODED KEY ---
// We are doing this to rule out environment variable issues once and for all.
const apiKey = "AIzaSyAO42A_dRc52rp4nzj9-atrJXtR4z60lOA"; 

const genAI = new GoogleGenerativeAI(apiKey);

export async function generateScript(videoIdea: string, niche: string) {
  console.log(`Generating script for: "${videoIdea}" in niche: "${niche}"`);

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
    Write a short, 3-sentence YouTube video intro about: ${videoIdea} for the ${niche} niche.
    `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    console.log("Successfully generated script from Gemini API.");
    return text;
  } catch (error: any) {
    console.error("Error generating script from Gemini API:", error);
    // Return the ACTUAL error message to the UI so we can see it
    return `Error: Gemini API failed. Details: ${error.message || error.toString()}`;
  }
}

export async function saveProject(projectData: any, userId: string) {
  if (!userId) {
    throw new Error("User is not authenticated.");
  }

  try {
    const docRef = await addDoc(collection(db, "projects"), {
      ...projectData,
      userId: userId,
      createdAt: serverTimestamp(),
    });
    console.log("Project saved with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving project to Firestore: ", error);
    return { success: false, error: "Failed to save project." };
  }
}

export async function getProjects(userId: string) {
    if (!userId) {
        throw new Error("User is not authenticated.");
    }

    try {
        const q = query(
            collection(db, "projects"), 
            where("userId", "==", userId),
            orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const projects = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return { success: true, projects: projects };
    } catch (error) {
        console.error("Error fetching projects from Firestore: ", error);
        return { success: false, error: "Failed to fetch projects." };
    }
}
