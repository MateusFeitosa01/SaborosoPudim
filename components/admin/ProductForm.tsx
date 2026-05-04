"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createProduct, Product, updateProduct } from "@/lib/services/products";
import { uploadProductImage } from "@/lib/services/storage";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductFormProps {
  product?: Product;
  isEdit?: boolean;
}

export function ProductForm({ product, isEdit = false }: ProductFormProps) {
  const router = useRouter();

  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [image, setImage] = useState(product?.image || "");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [sizes, setSizes] = useState(
    product?.sizes || [{ label: "", price: 0 }],
  );

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = image;

      if (imageFile) {
        imageUrl = await uploadProductImage(imageFile);
      }

      const productData = {
        name,
        description,
        image: imageUrl,
        sizes: sizes.filter((s) => s.label.trim() && s.price > 0),
      };

      if (isEdit && product) {
        await updateProduct(product.id, productData);
      } else {
        await createProduct(productData);
      }

      router.push("/admin/produtos");
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro ao salvar produto.");
    } finally {
      setLoading(false);
    }
  }

  function addSize() {
    setSizes([...sizes, { label: "", price: 0 }]);
  }

  function updateSize(
    index: number,
    field: "label" | "price",
    value: string | number,
  ) {
    const newSizes = [...sizes];
    newSizes[index] = {
      ...newSizes[index],
      [field]: value,
    };

    setSizes(newSizes);
  }

  function removeSize(index: number) {
    setSizes(sizes.filter((_, i) => i !== index));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-md mx-auto md:mx-0"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="text-base"
          placeholder="Ex: Pudim de Chocolate"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="text-base min-h-24"
          placeholder="Descreva seu produto..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Imagem do Produto</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          required={!isEdit}
          className="text-base"
        />
      </div>

      {image && !imageFile && (
        <div className="flex justify-center">
          <img
            src={image}
            alt="Preview"
            className="w-24 sm:w-32 h-24 sm:h-32 object-cover rounded-lg border border-gray-200"
          />
        </div>
      )}

      <div className="space-y-3 p-3 border rounded-lg bg-gray-50">
        <Label className="text-base font-semibold">Tamanhos e Preços</Label>

        <div className="space-y-3">
          {sizes.map((size, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-2 items-end"
            >
              <div className="flex-1 min-w-0">
                <Label
                  htmlFor={`size-${index}`}
                  className="text-xs text-gray-600"
                >
                  Tamanho
                </Label>
                <Input
                  id={`size-${index}`}
                  placeholder="Ex: P, M, G"
                  value={size.label}
                  onChange={(e) => updateSize(index, "label", e.target.value)}
                  required
                  className="text-base"
                />
              </div>

              <div className="flex-1 min-w-0">
                <Label
                  htmlFor={`price-${index}`}
                  className="text-xs text-gray-600"
                >
                  Preço (R$)
                </Label>
                <Input
                  id={`price-${index}`}
                  type="number"
                  placeholder="0.00"
                  value={size.price}
                  onChange={(e) =>
                    updateSize(index, "price", parseFloat(e.target.value) || 0)
                  }
                  step="0.01"
                  required
                  className="text-base"
                />
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeSize(index)}
                className="w-full sm:w-auto"
              >
                Remover
              </Button>
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={addSize}
          className="w-full"
        >
          + Adicionar Tamanho
        </Button>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full text-base py-2"
      >
        {loading
          ? "Salvando..."
          : isEdit
            ? "Atualizar Produto"
            : "Criar Produto"}
      </Button>
    </form>
  );
}
