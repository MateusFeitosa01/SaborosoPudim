import { supabase } from "@/lib/supabase";

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  sizes: {
    label: string;
    price: number;
  }[];
}

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      description,
      image,
      sizes(
        label,
        price
      )
    `);

  if (error) throw error;

  return data as Product[];
}

export async function createProduct(product: Omit<Product, 'id'>) {
  const { data: productData, error: productError } = await supabase
    .from("products")
    .insert({
      name: product.name,
      description: product.description,
      image: product.image,
    })
    .select()
    .single();

  if (productError) throw productError;

  const sizesPayload = product.sizes.map(size => ({
    product_id: productData.id,
    label: size.label,
    price: size.price,
  }));

  const { error: sizesError } = await supabase
    .from("sizes")
    .insert(sizesPayload);

  if (sizesError) throw sizesError;

  return productData;
}

export async function updateProduct(id: string, product: Omit<Product, 'id'>) {
  const { error: productError } = await supabase
    .from("products")
    .update({
      name: product.name,
      description: product.description,
      image: product.image,
    })
    .eq('id', id);

  if (productError) throw productError;

  // Delete existing sizes
  await supabase.from("sizes").delete().eq('product_id', id);

  // Insert new sizes
  const sizesPayload = product.sizes.map(size => ({
    product_id: id,
    label: size.label,
    price: size.price,
  }));

  const { error: sizesError } = await supabase
    .from("sizes")
    .insert(sizesPayload);

  if (sizesError) throw sizesError;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq('id', id);

  if (error) throw error;
}