// Common types used throughout the application


// API Response type
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
