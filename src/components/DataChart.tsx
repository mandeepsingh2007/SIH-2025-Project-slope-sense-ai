import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Activity } from 'lucide-react';

const riskData = [
  { time: '00:00', risk: 23, displacement: 1.2 },
  { time: '04:00', risk: 25, displacement: 1.4 },
  { time: '08:00', risk: 42, displacement: 2.1 },
  { time: '12:00', risk: 65, displacement: 2.8 },
  { time: '16:00', risk: 78, displacement: 3.2 },
  { time: '20:00', risk: 54, displacement: 2.5 },
  { time: '23:59', risk: 31, displacement: 1.8 }
];

interface DataChartProps {
  title: string;
  dataKey: string;
  color: string;
  type?: 'line' | 'area';
}

export const DataChart: React.FC<DataChartProps> = ({ 
  title, 
  dataKey, 
  color, 
  type = 'line' 
}) => {
  const renderChart = () => {
    if (type === 'area') {
      return (
        <AreaChart data={riskData}>
          <defs>
            <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--foreground))'
            }}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            fill={`url(#gradient-${dataKey})`}
            strokeWidth={2}
          />
        </AreaChart>
      );
    }

    return (
      <LineChart data={riskData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
        <XAxis 
          dataKey="time" 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            color: 'hsl(var(--foreground))'
          }}
        />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          dot={{ fill: color, r: 4 }}
          activeDot={{ r: 6, stroke: color, fill: 'hsl(var(--background))' }}
        />
      </LineChart>
    );
  };

  return (
    <Card className="data-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-base">
          {type === 'area' ? (
            <TrendingUp className="w-4 h-4 text-primary" />
          ) : (
            <Activity className="w-4 h-4 text-primary" />
          )}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};