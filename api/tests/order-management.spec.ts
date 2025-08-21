import { test, expect, request } from '@playwright/test';

const API_URL = 'http://localhost:3000';

test.describe('Order Management', () => {
  test('Create a new order for a branch', async ({ request }) => {
    // Suponiendo que existen endpoints para crear branch y productos
    await request.post(`${API_URL}/branches`, { data: { id: 'BR001', name: 'Sucursal 1' } });
    await request.post(`${API_URL}/products`, { data: { id: 'P001', name: 'Widget A', price: 10.00 } });
    await request.post(`${API_URL}/products`, { data: { id: 'P002', name: 'Widget B', price: 20.00 } });

    const orderRes = await request.post(`${API_URL}/orders`, {
      data: {
        branchId: 'BR001',
        items: [
          { productId: 'P001', quantity: 2 },
          { productId: 'P002', quantity: 1 }
        ]
      }
    });
    expect(orderRes.ok()).toBeTruthy();
    const order = await orderRes.json();
    expect(order.details).toHaveLength(2);
  });

  test('Retrieve orders for a branch', async ({ request }) => {
    const res = await request.get(`${API_URL}/orders?branchId=BR001`);
    expect(res.ok()).toBeTruthy();
    const orders = await res.json();
    expect(Array.isArray(orders)).toBeTruthy();
  });
});
