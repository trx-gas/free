import { useAllProfiles } from '@/hooks/useProfile';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { useState } from 'react';
import { Search, Users } from 'lucide-react';

const AdminUsers = () => {
  const { data: profiles, isLoading } = useAllProfiles();
  const [search, setSearch] = useState('');

  const filteredProfiles = profiles?.filter((profile) =>
    profile.email?.toLowerCase().includes(search.toLowerCase()) ||
    profile.display_name?.toLowerCase().includes(search.toLowerCase()) ||
    profile.wallet_address?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">用户管理</h1>
            <p className="text-muted-foreground mt-1">管理平台用户</p>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-muted-foreground" />
            <span className="text-muted-foreground">
              共 {profiles?.length || 0} 位用户
            </span>
          </div>
        </div>

        <Card className="glass border-border/50">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>用户列表</CardTitle>
                <CardDescription>查看和管理所有注册用户</CardDescription>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="搜索用户..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
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
            ) : filteredProfiles && filteredProfiles.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>邮箱</TableHead>
                      <TableHead>显示名称</TableHead>
                      <TableHead>手机号</TableHead>
                      <TableHead>钱包地址</TableHead>
                      <TableHead>注册时间</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProfiles.map((profile) => (
                      <TableRow key={profile.id}>
                        <TableCell>{profile.email || '-'}</TableCell>
                        <TableCell>
                          {profile.display_name || (
                            <span className="text-muted-foreground">未设置</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {profile.phone || (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {profile.wallet_address ? (
                            <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                              {profile.wallet_address.slice(0, 8)}...{profile.wallet_address.slice(-6)}
                            </code>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {format(new Date(profile.created_at), 'yyyy-MM-dd HH:mm')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                {search ? '未找到匹配的用户' : '暂无用户'}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;
