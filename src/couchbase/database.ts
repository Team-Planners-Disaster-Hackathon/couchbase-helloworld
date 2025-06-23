
import { Ottoman } from 'ottoman'

// Create and export the Ottoman instance
export const ottoman = new Ottoman();

// Initialize Ottoman connection
export const initOttoman = async () => {
  try {
    // Configure Ottoman with explicit settings
    ottoman.config = {
      collectionName: '_default',
      scopeName: '_default',
      modelKey: 'type'
    };
    
    // Connect to Couchbase with more detailed options
    await ottoman.connect({
      connectionString: process.env.CB_HOST ?? "couchbase://localhost",  // Using IP instead of hostname
      bucketName: process.env.CB_BUCKET ?? "hello-sample",
      username: process.env.CB_USER ?? "",
      password: process.env.CB_PASSWORD ?? "",
      // Remove options causing TypeScript errors
    });
    
    // Start Ottoman
    await ottoman.start();
    console.log('Ottoman connected to Couchbase successfully');
  } catch (error) {
    console.error('Ottoman connection error details:', error);
    throw error;
  }
}