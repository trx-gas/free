import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { Database } from '@/integrations/supabase/types';

type OrderStatus = Database['public']['Enums']['order_status'];

export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  order_type: string;
  amount: number;
  currency: string;
  energy_amount: number | null;
  from_address: string | null;
  to_address: string | null;
  tx_hash: string | null;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
}

export const useMyOrders = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['my-orders', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
    enabled: !!user?.id,
  });
};

export const useAllOrders = () => {
  return useQuery({
    queryKey: ['all-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: OrderStatus }) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-orders'] });
      queryClient.invalidateQueries({ queryKey: ['my-orders'] });
    },
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (order: Omit<Order, 'id' | 'user_id' | 'order_number' | 'created_at' | 'updated_at'>) => {
      if (!user?.id) throw new Error('Not authenticated');

      const orderNumber = 'GF' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + 
        Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

      const { data, error } = await supabase
        .from('orders')
        .insert({
          ...order,
          user_id: user.id,
          order_number: orderNumber,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-orders', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['all-orders'] });
    },
  });
};
