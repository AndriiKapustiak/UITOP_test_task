import { test, expect } from '@playwright/test';

const API_BASE_URL = 'https://automationexercise.com/api';

test.describe('API Tests', () => {
  test('TC-API-001: GET All Products List', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/productsList`);
    expect(response.status()).toBe(200);
    const responseBody = await response.text();
    expect(responseBody).toContain('products');
  });

  test('TC-API-002: POST Search Product', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/searchProduct`, {
      form: { search_product: 'top' }
    });
    expect(response.status()).toBe(200);
    const jsonResponse = JSON.parse(await response.text());
    expect(jsonResponse.responseCode).toBe(200);
  });

  test('TC-API-003: POST without parameter returns 400', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/searchProduct`, {
      form: {}
    });
    const jsonResponse = JSON.parse(await response.text());
    expect(jsonResponse.responseCode).toBe(400);
  });

  test('TC-API-004: Invalid method returns 405', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/productsList`);
    const jsonResponse = JSON.parse(await response.text());
    expect(jsonResponse.responseCode).toBe(405);
  });
});

