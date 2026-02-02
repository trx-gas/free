import { useAuth } from '@/contexts/AuthContext';
import { useMyOrders } from '@/hooks/useOrders';
import { useProfile } from '@/hooks/useProfile';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, Wallet, Zap, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: orders, isLoading: ordersLoading } = useMyOrders();

  const totalOrders = orders?.length || 0;
  const completedOrders = orders?.filter(o => o.status === 'completed').length || 0;
  const totalSpent = orders?.reduce((sum, o) => sum + Number(o.amount), 0) || 0;
  const totalEnergy = orders?.reduce((sum, o) => sum + (o.energy_amount || 0), 0) || 0;

  const stats = [
    {
      title: '总订单数',
      value: totalOrders,
      icon: FileText,
      description: `已完成 ${completedOrders} 笔`,
    },
    {
      title: '总消费',
      value: `${totalSpent.toFixed(2)} USDT`,
      icon: Wallet,
      description: '累计充值金额',
    },
    {
      title: '获得能量',
      value: totalEnergy.toLocaleString(),
      icon: Zap,
      description: '累计获得能量',
    },
    {
      title: '节省费用',
      value: `${(totalEnergy * 0.00005).toFixed(2)} TRX`,
      icon: TrendingUp,
      description: '相比传统方式',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-bold">
            欢迎回来
            {profileLoading ? (
              <Skeleton className="inline-block w-32 h-6 ml-2" />
            ) : (
              <span className="text-primary ml-2">
                {profile?.display_name || user?.email?.split('@')[0]}
              </span>
            )}
          </h1>
          <p className="text-muted-foreground mt-1">
            这是您的 GasFree 账户概览
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="glass border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <Skeleton className="h-8 w-24" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.description}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Orders */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle>最近订单</CardTitle>
            <CardDescription>您最近的交易记录</CardDescription>
          </CardHeader>
          <CardContent>
            {ordersLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : orders && orders.length > 0 ? (
              <div className="space-y-3">
                {orders.slice(0, 5).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div>
                      <p className="font-medium">{order.order_number}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.order_type === 'energy_rental' ? '能量租赁' : '免Gas转账'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{Number(order.amount).toFixed(2)} {order.currency}</p>
                      <p className={`text-sm ${
                        order.status === 'completed' ? 'text-green-500' :
                        order.status === 'pending' ? 'text-yellow-500' :
                        order.status === 'failed' ? 'text-red-500' : 'text-muted-foreground'
                      }`}>
                        {order.status === 'completed' ? '已完成' :
                         order.status === 'pending' ? '处理中' :
                         order.status === 'processing' ? '进行中' :
                         order.status === 'failed' ? '失败' : '已取消'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                暂无订单记录
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
