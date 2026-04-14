-- Script SQL para inicializar o banco de dados Supabase
-- Execute este script no SQL Editor do Supabase

-- Criar tabela de produtos
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de tamanhos
CREATE TABLE IF NOT EXISTS sizes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de pedidos
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_whatsapp TEXT NOT NULL,
  delivery_date DATE NOT NULL,
  delivery_method TEXT NOT NULL CHECK (delivery_method IN ('entrega', 'retirada')),
  address TEXT,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de itens do pedido
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  size TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_sizes_product_id ON sizes(product_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

-- Habilitar RLS (Row Level Security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para produtos (todos podem ler, apenas admin pode modificar)
CREATE POLICY "Produtos são públicos para leitura" ON products FOR SELECT USING (true);
CREATE POLICY "Apenas admin pode inserir produtos" ON products FOR INSERT WITH CHECK (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Apenas admin pode atualizar produtos" ON products FOR UPDATE USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Apenas admin pode deletar produtos" ON products FOR DELETE USING (auth.jwt() ->> 'role' = 'admin');

-- Políticas RLS para tamanhos
CREATE POLICY "Tamanhos são públicos para leitura" ON sizes FOR SELECT USING (true);
CREATE POLICY "Apenas admin pode modificar tamanhos" ON sizes FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Políticas RLS para pedidos
CREATE POLICY "Clientes podem ver seus próprios pedidos" ON orders FOR SELECT USING (auth.uid()::text = customer_email);
CREATE POLICY "Apenas admin pode ver todos os pedidos" ON orders FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Qualquer um pode criar pedidos" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Apenas admin pode atualizar pedidos" ON orders FOR UPDATE USING (auth.jwt() ->> 'role' = 'admin');

-- Políticas RLS para itens do pedido
CREATE POLICY "Clientes podem ver itens de seus pedidos" ON order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.customer_email = auth.uid()::text
  )
);
CREATE POLICY "Apenas admin pode ver todos os itens" ON order_items FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Qualquer um pode criar itens do pedido" ON order_items FOR INSERT WITH CHECK (true);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();