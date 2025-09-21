import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Gauge, 
  Activity, 
  Zap, 
  TrendingUp, 
  TrendingDown,
  Thermometer,
  Droplets,
  Wind,
  Mountain
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  status: 'safe' | 'warning' | 'critical';
  icon: React.ReactNode;
  description: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title, value, change, trend, status, icon, description
}) => {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4" />;
    return <Activity className="w-4 h-4" />;
  };

  const getStatusClass = () => {
    switch (status) {
      case 'safe': return 'status-safe';
      case 'warning': return 'status-warning';
      case 'critical': return 'status-critical';
      default: return '';
    }
  };

  return (
    <Card className="data-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="p-2 rounded-lg bg-primary/10">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-2xl font-bold">{value}</div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              {getTrendIcon()}
              <span>{change}</span>
            </div>
            <Badge className={getStatusClass()}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export const MonitoringCards = () => {
  const metrics = [
    {
      title: "Overall Risk Level",
      value: "Medium",
      change: "+5% from yesterday",
      trend: 'up' as const,
      status: 'warning' as const,
      icon: <Shield className="w-4 h-4 text-primary" />,
      description: "Composite risk assessment across all monitored zones"
    },
    {
      title: "Active Sensors",
      value: "127/130",
      change: "98% operational",
      trend: 'stable' as const,
      status: 'safe' as const,
      icon: <Activity className="w-4 h-4 text-primary" />,
      description: "Real-time geotechnical monitoring network status"
    },
    {
      title: "Slope Stability",
      value: "87%",
      change: "-2% this week",
      trend: 'down' as const,
      status: 'warning' as const,
      icon: <Mountain className="w-4 h-4 text-primary" />,
      description: "Calculated stability factor for primary excavation slopes"
    },
    {
      title: "Displacement Rate",
      value: "2.3mm/day",
      change: "+0.4mm increase",
      trend: 'up' as const,
      status: 'critical' as const,
      icon: <Gauge className="w-4 h-4 text-primary" />,
      description: "Average daily ground movement in high-risk zones"
    },
    {
      title: "Weather Impact",
      value: "Low",
      change: "Clear conditions",
      trend: 'stable' as const,
      status: 'safe' as const,
      icon: <Thermometer className="w-4 h-4 text-primary" />,
      description: "Environmental factors affecting slope stability"
    },
    {
      title: "AI Confidence",
      value: "94.2%",
      change: "+1.2% improved",
      trend: 'up' as const,
      status: 'safe' as const,
      icon: <Zap className="w-4 h-4 text-primary" />,
      description: "Machine learning model prediction accuracy"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Real-Time Monitoring</h2>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
          Live Data Stream
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* System Performance Bar */}
      <Card className="data-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-primary" />
            <span>System Performance Indicators</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Data Processing</span>
                <span className="text-success">98%</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Network Latency</span>
                <span className="text-primary">12ms</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Model Accuracy</span>
                <span className="text-success">94.2%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};