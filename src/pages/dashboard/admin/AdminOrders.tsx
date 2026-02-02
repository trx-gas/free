import { useAllOrders, useUpdateOrderStatus, type Order } from '@/hooks/useOrders';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { useState } from 'react';
import { Search, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type OrderStatus = Database['public']['Enums']['order_status'];

const statusMap: Record<OrderStatus, { label: string; variant: 'secondary' | 'default' | 'destructive' | 'outline' }> = {
  pending: { label: '待处理', variant: 'secondary' },
  processing: { label: '处理中', variant: 'default' },
  completed: { label: '已完成', variant: 'default' },
  failed: { label: '失败', variant: 'destructive' },
  cancelled: { label: '已取消', variant: 'outline' },
};

const typeMap: Record<string, string> = {
  energy_rental: '能量租赁',
  gas_free_transfer: '免Gas转账',
};

const AdminOrders = () => {
  const { data: orders, isLoading } = useAllOrders();
  const updateStatus = useUpdateOrderStatus();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = orders?.filter((order) => {
    const matchesSearch = 
      order.order_number.toLowerCase().includes(search.toLowerCase()) ||
      order.from_address?.toLowerCase().includes(search.toLowerCase()) ||
      order.to_address?.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateStatus.mutateAsync({ orderId, status: newStatus });
      toast({
        title: '状态已更新',
        description: `订单状态已更改为${statusMap[newStatus].label}`,
      });
    } catch (error) {
      toast({
        title: '更新失败',
        description: '请稍后重试',
        variant: 'destructive',
      });
    }
  };

  const totalAmount = filteredOrders?.reduce((sum, o) => sum + Number(o.amount), 0) || 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">订单管理</h1>
            <p className="text-muted-foreground mt-1">管理所有用户订单</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground">
                共 {filteredOrders?.length || 0} 笔订单
              </span>
            </div>
            <Badge variant="outline" className="text-primary border-primary">
              总额: {totalAmount.toFixed(2)} USDT
            </Badge>
          </div>
        </div>

        <Card className="glass border-border/50">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <CardTitle>订单列表</CardTitle>
                <CardDescription>查看和管理所有订单</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative w-full sm:w-48">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索订单..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="pending">待处理</SelectItem>
                    <SelectItem value="processing">处理中</SelectItem>
                    <SelectItem value="completed">已完成</SelectItem>
                    <SelectItem value="failed">失败</SelectItem>
                    <SelectItem value="cancelled">已取消</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : filteredOrders && filteredOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>订单号</TableHead>
                      <TableHead>类型</TableHead>
                      <TableHead>金额</TableHead>
                      <TableHead>能量</TableHead>
                      <TableHead>发送地址</TableHead>
                      <TableHead>接收地址</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>时间</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-sm">
                          {order.order_number}
                        </TableCell>
                        <TableCell>
                          {typeMap[order.order_type] || order.order_type}
                        </TableCell>
                        <TableCell>
                          {Number(order.amount).toFixed(2)} {order.currency}
                        </TableCell>
                        <TableCell>
                          {order.energy_amount?.toLocaleString() || '-'}
                        </TableCell>
                        <TableCell>
                          {order.from_address ? (
                            <code className="text-xs bg-muted px-1 py-0.5 rounded">
                              {order.from_address.slice(0, 6)}...
                            </code>
                          ) : '-'}
                        </TableCell>
                        <TableCell>
                          {order.to_address ? (
                            <code className="text-xs bg-muted px-1 py-0.5 rounded">
                              {order.to_address.slice(0, 6)}...
                            </code>
                          ) : '-'}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={order.status}
                            onValueChange={(value: OrderStatus) => handleStatusChange(order.id, value)}
                          >
                            <SelectTrigger className="w-28 h-8">
                              <Badge variant={statusMap[order.status]?.variant || 'secondary'}>
                                {statusMap[order.status]?.label || order.status}
                              </Badge>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">待处理</SelectItem>
                              <SelectItem value="processing">处理中</SelectItem>
                              <SelectItem value="completed">已完成</SelectItem>
                              <SelectItem value="failed">失败</SelectItem>
                              <SelectItem value="cancelled">已取消</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {format(new Date(order.created_at), 'MM-dd HH:mm')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                {search || statusFilter !== 'all' ? '未找到匹配的订单' : '暂无订单'}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminOrders;
