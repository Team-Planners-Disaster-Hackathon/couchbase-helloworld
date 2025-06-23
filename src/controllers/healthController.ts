import { Request, Response } from 'express';
import { ApiResponse } from '../types';
// import { testCouchbase } from '../couchbase/test';

// Health check endpoint
export const checkHealth = async (req: Request, res: Response) => {

 // const testCluster = await testCouchbase();

  try {
    const response: ApiResponse<{message: string, timestamp: string}> = {
      success: true,
      data: {
        message: 'API is running',
        timestamp: new Date().toISOString()
      }
    };
    
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
