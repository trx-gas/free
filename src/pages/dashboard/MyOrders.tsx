import { useMyOrders } from '@/hooks/useOrders';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

const statusMap = {
  pending: { label: '待处理', variant: 'secondary' as const },
  processing: { label: '处理中', variant: 'default' as const },
  completed: { label: '已完成', variant: 'default' as const },
  failed: { label: '失败', variant: 'destructive' as const },
  cancelled: { label: '已取消', variant: 'outline' as const },
};

const typeMap = {
  energy_rental: '能量租赁',
  gas_free_transfer: '免Gas转账',
};

const MyOrders = () => {
  const { data: orders, isLoading } = useMyOrders();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">我的订单</h1>
          <p className="text-muted-foreground mt-1">查看您的所有交易记录</p>
        </div>

        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle>订单列表</CardTitle>
            <CardDescription>共 {orders?.length || 0} 条记录</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : orders && orders.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>订单号</TableHead>
                      <TableHead>类型</TableHead>
                      <TableHead>金额</TableHead>
                      <TableHead>能量</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>时间</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-sm">
                          {order.order_number}
                        </TableCell>
                        <TableCell>
                          {typeMap[order.order_type as keyof typeof typeMap] || order.order_type}
                        </TableCell>
                        <TableCell>
                          {Number(order.amount).toFixed(2)} {order.currency}
                        </TableCell>
                        <TableCell>
                          {order.energy_amount?.toLocaleString() || '-'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusMap[order.status]?.variant || 'secondary'}>
                            {statusMap[order.status]?.label || order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {format(new Date(order.created_at), 'yyyy-MM-dd HH:mm')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                暂无订单记录
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MyOrders;
