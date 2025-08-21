import { test, expect, request } from '@playwright/test';

const API_URL = 'http://localhost:3000';

test.describe('Security and Access Control', () => {
  test('Prevent unauthorized order creation', async ({ request }) => {
    const res = await request.post(`${API_URL}/orders`, {
      data: { branchId: 'BR001', items: [] },
      headers: { Authorization: '' }
    });
    expect(res.status()).toBe(401);
  });

  test('Allow authorized user to create an order', async ({ request }) => {
    // Simula autenticación (ajusta según tu API)
    const token = 'test-branch-manager-token';
    const res = await request.post(`${API_URL}/orders`, {
      data: { branchId: 'BR001', items: [] },
      headers: { Authorization: `Bearer ${token}` }
    });
    expect(res.ok()).toBeTruthy();
  });
});
