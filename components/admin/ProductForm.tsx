"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createProduct, updateProduct, getProducts, Product } from "@/lib/services/products";

interface ProductFormProps {
  product?: Product;
  isEdit?: boolean;
}

export function ProductForm({ product, isEdit = false }: ProductFormProps) {
  const router = useRouter();
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [image, setImage] = useState(product?.image || "");
  const [sizes, setSizes] = useState(product?.sizes || [{ label: "", price: 0 }]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        name,
        description,
        image,
        sizes: sizes.filter(s => s.label && s.price > 0),
      };

      if (isEdit && product) {
        await updateProduct(product.id, productData);
      } else {
        await createProduct(productData);
      }

      router.push("/admin/produtos");
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro ao salvar produto");
    } finally {
      setLoading(false);
    }
  };

  const addSize = () => {
    setSizes([...sizes, { label: "", price: 0 }]);
  };

  const updateSize = (index: number, field: 'label' | 'price', value: string | number) => {
    const newSizes = [...sizes];
    newSizes[index] = { ...newSizes[index], [field]: value };
    setSizes(newSizes);
  };

  const removeSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="image">URL da Imagem</Label>
        <Input
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </div>

      <div>
        <Label>Tamanhos e Preços</Label>
        {sizes.map((size, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <Input
              placeholder="Tamanho (ex: Individual)"
              value={size.label}
              onChange={(e) => updateSize(index, 'label', e.target.value)}
              required
            />
            <Input
              type="number"
              placeholder="Preço"
              value={size.price}
              onChange={(e) => updateSize(index, 'price', parseFloat(e.target.value) || 0)}
              required
            />
            <Button type="button" variant="outline" onClick={() => removeSize(index)}>
              Remover
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addSize}>
          Adicionar Tamanho
        </Button>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Salvando..." : isEdit ? "Atualizar Produto" : "Criar Produto"}
      </Button>
    </form>
  );
}