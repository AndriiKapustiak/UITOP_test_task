/**
 * Environment configuration for different test environments
 */

export interface Environment {
  name: string;
  baseURL: string;
  apiURL?: string;
  timeout?: number;
}

export const environments: Record<string, Environment> = {
  staging: {
    name: 'Staging',
    baseURL: 'https://staging-stack.alynea.io',
    timeout: 30000,
  },
  production: {
    name: 'Production',
    baseURL: 'https://alynea.io',
    timeout: 30000,
  },
  local: {
    name: 'Local',
    baseURL: 'http://localhost:3000',
    timeout: 15000,
  },
};

/**
 * Get environment configuration based on NODE_ENV or default to staging
 */
export function getEnvironment(): Environment {
  const env = process.env.TEST_ENV || 'staging';
  return environments[env] || environments.staging;
}

/**
 * API endpoints for external API testing
 */
export const API_ENDPOINTS = {
  automationExercise: 'https://automationexercise.com/api',
};

