import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  AlertTriangle, 
  Shield, 
  Clock, 
  Bell, 
  CheckCircle, 
  XCircle, 
  Phone,
  Mail,
  MessageSquare,
  Settings
} from 'lucide-react';

interface AlertItem {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: string;
  zone: string;
  acknowledged: boolean;
}

const AlertCard: React.FC<{ alert: AlertItem }> = ({ alert }) => {
  const getAlertIcon = () => {
    switch (alert.type) {
      case 'critical': return <XCircle className="w-5 h-5 text-destructive" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-accent" />;
      case 'info': return <CheckCircle className="w-5 h-5 text-success" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getAlertBadgeClass = () => {
    switch (alert.type) {
      case 'critical': return 'status-critical';
      case 'warning': return 'status-warning';
      case 'info': return 'status-safe';
      default: return '';
    }
  };

  return (
    <Card className={`data-card ${alert.acknowledged ? 'opacity-60' : ''}`}>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              {getAlertIcon()}
              <div className="space-y-1">
                <div className="font-medium text-sm">{alert.title}</div>
                <div className="text-xs text-muted-foreground">{alert.description}</div>
              </div>
            </div>
            <Badge className={getAlertBadgeClass()}>
              {alert.type.toUpperCase()}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{alert.zone}</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{alert.timestamp}</span>
            </div>
          </div>

          {!alert.acknowledged && (
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="flex-1 text-xs">
                Acknowledge
              </Button>
              <Button size="sm" variant="outline" className="flex-1 text-xs">
                Investigate
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const AlertsPanel = () => {
  const alerts: AlertItem[] = [
    {
      id: 'A001',
      type: 'critical',
      title: 'High Displacement Rate Detected',
      description: 'Ground movement exceeds 5mm/day threshold in monitored area',
      timestamp: '2 minutes ago',
      zone: 'North Wall - Level 3',
      acknowledged: false
    },
    {
      id: 'A002',
      type: 'warning',
      title: 'Sensor Communication Lost',
      description: 'Strain gauge SG-127 has lost connection',
      timestamp: '8 minutes ago',
      zone: 'East Bench - Level 2',
      acknowledged: false
    },
    {
      id: 'A003',
      type: 'critical',
      title: 'Precipitation Alert',
      description: 'Heavy rainfall predicted - increased rockfall risk',
      timestamp: '15 minutes ago',
      zone: 'All Zones',
      acknowledged: false
    },
    {
      id: 'A004',
      type: 'warning',
      title: 'Vibration Anomaly',
      description: 'Unusual seismic activity detected near excavation zone',
      timestamp: '22 minutes ago',
      zone: 'South Ramp',
      acknowledged: false
    },
    {
      id: 'A005',
      type: 'info',
      title: 'Maintenance Complete',
      description: 'Sensor network calibration successfully completed',
      timestamp: '1 hour ago',
      zone: 'System Wide',
      acknowledged: true
    }
  ];

  const criticalCount = alerts.filter(a => a.type === 'critical' && !a.acknowledged).length;
  const warningCount = alerts.filter(a => a.type === 'warning' && !a.acknowledged).length;

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <Card className="data-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-primary" />
            <span>Alert Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-lg bg-destructive/10 border border-destructive/30">
              <div className="text-2xl font-bold text-destructive">{criticalCount}</div>
              <div className="text-sm text-muted-foreground">Critical</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-accent/10 border border-accent/30">
              <div className="text-2xl font-bold text-accent">{warningCount}</div>
              <div className="text-sm text-muted-foreground">Warning</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Notification Channels</div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Phone className="w-4 h-4 mr-2" />
                SMS
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <MessageSquare className="w-4 h-4 mr-2" />
                Teams
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      <Card className="data-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Active Alerts</span>
            </CardTitle>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {alerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Emergency Protocols */}
      <Card className="data-card">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Emergency Response</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full bg-gradient-risk-high hover:shadow-mining-glow transition-mining">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Activate Emergency Protocol
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm">
              Evacuate Zone
            </Button>
            <Button variant="outline" size="sm">
              Contact Safety
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};