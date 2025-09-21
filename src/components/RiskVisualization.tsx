import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Layers, 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  Eye,
  Maximize2,
  Calendar
} from 'lucide-react';
import { DataChart } from './DataChart';

interface RiskZone {
  id: string;
  name: string;
  risk: 'low' | 'medium' | 'high';
  probability: number;
  lastUpdate: string;
}

const HeatMapGrid = () => {
  const generateRiskLevel = () => {
    const rand = Math.random();
    if (rand < 0.6) return 'low';
    if (rand < 0.85) return 'medium';
    return 'high';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-gradient-risk-high';
      case 'medium': return 'bg-gradient-risk-medium';
      case 'low': return 'bg-gradient-risk-low';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="grid grid-cols-12 grid-rows-8 gap-1 h-64">
      {Array.from({ length: 96 }, (_, i) => {
        const risk = generateRiskLevel();
        return (
          <div
            key={i}
            className={`${getRiskColor(risk)} rounded-sm transition-mining hover:scale-110 cursor-pointer shadow-sm`}
            title={`Zone ${i + 1}: ${risk} risk`}
          />
        );
      })}
    </div>
  );
};

const RiskZonesList = () => {
  const riskZones: RiskZone[] = [
    { id: 'Z-001', name: 'North Wall - Level 3', risk: 'high', probability: 87, lastUpdate: '2 min ago' },
    { id: 'Z-007', name: 'East Bench - Level 2', risk: 'medium', probability: 64, lastUpdate: '5 min ago' },
    { id: 'Z-012', name: 'South Ramp Access', risk: 'high', probability: 92, lastUpdate: '1 min ago' },
    { id: 'Z-018', name: 'West Wall - Level 4', risk: 'medium', probability: 58, lastUpdate: '8 min ago' },
    { id: 'Z-023', name: 'Central Pit Bottom', risk: 'low', probability: 23, lastUpdate: '12 min ago' },
  ];

  const getRiskBadgeClass = (risk: string) => {
    switch (risk) {
      case 'high': return 'status-critical';
      case 'medium': return 'status-warning';
      case 'low': return 'status-safe';
      default: return '';
    }
  };

  return (
    <div className="space-y-3">
      {riskZones.map((zone) => (
        <Card key={zone.id} className="data-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium">{zone.name}</div>
                <div className="text-sm text-muted-foreground">{zone.id}</div>
              </div>
            </div>
            <div className="text-right space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{zone.probability}%</span>
                <Badge className={getRiskBadgeClass(zone.risk)}>
                  {zone.risk.toUpperCase()}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">{zone.lastUpdate}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export const RiskVisualization = () => {
  const [viewMode, setViewMode] = useState('heatmap');

  return (
    <Card className="data-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-primary" />
            <span>Risk Assessment Visualization</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Maximize2 className="w-4 h-4 mr-2" />
              Full Screen
            </Button>
            <Badge variant="outline" className="bg-success/10 text-success border-success/30">
              Real-Time
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={viewMode} onValueChange={setViewMode} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="heatmap" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Heat Map</span>
            </TabsTrigger>
            <TabsTrigger value="zones" className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Risk Zones</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Trends</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="heatmap" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Mine Site Risk Heat Map</h3>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded bg-gradient-risk-low" />
                    <span>Low Risk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded bg-gradient-risk-medium" />
                    <span>Medium Risk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded bg-gradient-risk-high" />
                    <span>High Risk</span>
                  </div>
                </div>
              </div>
              <HeatMapGrid />
              <div className="text-sm text-muted-foreground text-center">
                Hover over zones for detailed risk assessment data
              </div>
            </div>
          </TabsContent>

          <TabsContent value="zones" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">High-Priority Risk Zones</h3>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View All Zones
                </Button>
              </div>
              <RiskZonesList />
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Risk Trend Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card className="p-4 border border-border">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">7-Day Trend</span>
                      <AlertTriangle className="w-4 h-4 text-accent" />
                    </div>
                    <div className="text-2xl font-bold">+12%</div>
                    <div className="text-sm text-muted-foreground">
                      Risk levels have increased in 3 monitored zones
                    </div>
                  </div>
                </Card>
                <Card className="p-4 border border-border">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Peak Risk Hours</span>
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-2xl font-bold">2-6 PM</div>
                    <div className="text-sm text-muted-foreground">
                      Highest probability during afternoon shifts
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DataChart
                  title="Risk Level Trends (24hr)"
                  dataKey="risk"
                  color="hsl(25 100% 55%)"
                  type="area"
                />
                <DataChart
                  title="Ground Displacement (mm/day)"
                  dataKey="displacement"
                  color="hsl(0 85% 60%)"
                  type="line"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};