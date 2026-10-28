import { apiFetch, mediaUrl, unwrapList } from "@/lib/api";

export interface ProductSize { id?: string | number; label: string; price: number; is_active?: boolean }
export interface Product { id: string; name: string; description: string; image: string; is_active?: boolean; is_weekly?: boolean; is_best_seller?: boolean; weekly_order_count?: number; sizes: ProductSize[] }

export async function getProducts(): Promise<Product[]> {
  const data = await apiFetch("/products/products/");
  return unwrapList<any>(data).map((product) => ({
    ...product,
    id: String(product.id),
    image: mediaUrl(product.image),
    sizes: (product.sizes || []).filter((size: any) => size.is_active !== false).map((size: any) => ({ ...size, id: String(size.id), price: Number(size.price) })),
  }));
}

export interface ProductPayload {
  name: string; description: string; image?: string; imageFile?: File | null; is_active?: boolean; is_weekly?: boolean;
  sizes: { id?: string | number; label: string; price: number; is_active?: boolean }[];
}

export async function createProduct(product: ProductPayload) {
  const formData = new FormData();
  formData.append("name", product.name); formData.append("description", product.description);
  formData.append("is_active", String(product.is_active ?? true));
  formData.append("is_weekly", String(product.is_weekly ?? false));
  if (product.imageFile) formData.append("image", product.imageFile);
  formData.append("sizes", JSON.stringify(product.sizes.map(({ label, price, is_active }) => ({ label, price, is_active: is_active ?? true }))));
  return apiFetch("/products/products/", { method: "POST", body: formData }, true);
}

export async function updateProduct(id: string, product: ProductPayload) {
  const formData = new FormData();
  formData.append("name", product.name); formData.append("description", product.description);
  formData.append("is_active", String(product.is_active ?? true));
  formData.append("is_weekly", String(product.is_weekly ?? false));
  if (product.imageFile) formData.append("image", product.imageFile);
  formData.append("sizes", JSON.stringify(product.sizes.map(({ id, label, price, is_active }) => ({ ...(id ? { id } : {}), label, price, is_active: is_active ?? true }))));
  return apiFetch(`/products/products/${id}/`, { method: "PATCH", body: formData }, true);
}

export async function deleteProduct(id: string) { return apiFetch(`/products/products/${id}/`, { method: "DELETE" }, true); }
