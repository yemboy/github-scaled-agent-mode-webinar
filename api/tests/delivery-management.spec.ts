import { test, expect, request } from '@playwright/test';

const API_URL = 'http://localhost:3000';

test.describe('Delivery Management', () => {
  test('Register a delivery from a supplier', async ({ request }) => {
    await request.post(`${API_URL}/suppliers`, { data: { id: 'S001', name: 'Proveedor 1' } });
    await request.post(`${API_URL}/products`, { data: { id: 'P001', name: 'Widget A' } });
    const deliveryRes = await request.post(`${API_URL}/deliveries`, {
      data: {
        supplierId: 'S001',
        products: [
          { productId: 'P001', quantity: 100 }
        ]
      }
    });
    expect(deliveryRes.ok()).toBeTruthy();
  });

  test('Link a delivery to an order detail', async ({ request }) => {
    // Suponiendo que existen los recursos
    await request.post(`${API_URL}/orderDetails`, { data: { id: 'OD001', orderId: 'O001', productId: 'P001', quantity: 1 } });
    await request.post(`${API_URL}/deliveries`, { data: { id: 'D001', supplierId: 'S001', date: '2025-08-21' } });
    const res = await request.post(`${API_URL}/orderDetailDeliveries`, {
      data: { orderDetailId: 'OD001', deliveryId: 'D001' }
    });
    expect(res.ok()).toBeTruthy();
  });
});
