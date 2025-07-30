//использование в коде
import api from "./apiClient.ts";
import type { Product } from "../types/product.ts";

/**
 * Функция для получения списка всех продуктов с сервера
 * @returns {Promise<Product[]>} Промис, который разрешается в массив продуктов
 */
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/products');
    // return response.data;
    return response.data as Product[];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}
// получить один товар по ID
export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data as Product;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
}