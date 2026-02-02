import { useState, useEffect } from 'react';
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save } from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const { toast } = useToast();

  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || '');
      setPhone(profile.phone || '');
      setWalletAddress(profile.wallet_address || '');
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updateProfile.mutateAsync({
        display_name: displayName,
        phone,
        wallet_address: walletAddress,
      });
      
      toast({
        title: '保存成功',
        description: '您的资料已更新',
      });
    } catch (error) {
      toast({
        title: '保存失败',
        description: '请稍后重试',
        variant: 'destructive',
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl font-bold">账户设置</h1>
          <p className="text-muted-foreground mt-1">管理您的个人资料</p>
        </div>

        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle>个人资料</CardTitle>
            <CardDescription>更新您的账户信息</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">邮箱</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">邮箱地址不可更改</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="displayName">显示名称</Label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="您的昵称"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">手机号码</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+86 138 0000 0000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="walletAddress">TRON 钱包地址</Label>
                  <Input
                    id="walletAddress"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="T..."
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    用于接收能量和免Gas转账
                  </p>
                </div>

                <Button type="submit" disabled={updateProfile.isPending}>
                  {updateProfile.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  保存更改
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
