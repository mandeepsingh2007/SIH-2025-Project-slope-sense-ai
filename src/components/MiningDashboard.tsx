import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Upload, 
  FileImage, 
  FileSpreadsheet, 
  AlertTriangle, 
  Shield, 
  Activity,
  Zap,
  TrendingUp,
  MapPin,
  Clock,
  Gauge,
  Cpu
} from 'lucide-react';
import { FileUpload } from './FileUpload';
import { MonitoringCards } from './MonitoringCards';
import { RiskVisualization } from './RiskVisualization';
import { AlertsPanel } from './AlertsPanel';
import miningHero from '@/assets/mining-hero.jpg';

const MiningDashboard = () => {
  const [droneImage, setDroneImage] = useState<File | null>(null);
  const [sensorData, setSensorData] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleDroneUpload = useCallback((file: File) => {
    setDroneImage(file);
  }, []);

  const handleSensorUpload = useCallback((file: File) => {
    setSensorData(file);
  }, []);

  const runAnalysis = async () => {
    if (!droneImage || !sensorData) return;
    
    setIsAnalyzing(true);
    // Simulate AI analysis processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsAnalyzing(false);
    setAnalysisComplete(true);
  };

  return (
    <div className="min-h-screen bg-gradient-mining-dark">
      {/* Hero Header */}
      <div 
        className="relative h-64 bg-cover bg-center border-b border-border"
        style={{ backgroundImage: `url(${miningHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50" />
        <div className="relative z-10 h-full flex items-center px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-4 text-foreground">
              AI Rockfall Prediction System
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Advanced machine learning analytics for proactive mine safety management. 
              Real-time risk assessment and predictive monitoring for open-pit operations.
            </p>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* System Status Bar */}
        <Card className="bg-gradient-mining-steel border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full status-safe animate-pulse" />
                  <span className="text-sm font-medium">System Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-primary" />
                  <span className="text-sm">AI Engine: Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-success" />
                  <span className="text-sm">Monitoring: 24/7</span>
                </div>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                Last Update: {new Date().toLocaleTimeString()}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Upload Section */}
        {!analysisComplete && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FileUpload
              title="Drone Imagery Analysis"
              description="Upload high-resolution drone images for geological analysis"
              icon={<FileImage className="w-8 h-8 text-primary" />}
              acceptedTypes=".jpg,.jpeg,.png,.tiff"
              onFileUpload={handleDroneUpload}
              file={droneImage}
              gradient="bg-gradient-mining-primary"
            />
            
            <FileUpload
              title="Sensor Data Processing"
              description="Upload CSV files containing geotechnical sensor readings"
              icon={<FileSpreadsheet className="w-8 h-8 text-accent" />}
              acceptedTypes=".csv,.xlsx"
              onFileUpload={handleSensorUpload}
              file={sensorData}
              gradient="bg-gradient-risk-medium"
            />
          </div>
        )}

        {/* Analysis Trigger */}
        {droneImage && sensorData && !analysisComplete && (
          <Card className="data-card text-center">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-primary/10">
                    <Zap className="w-12 h-12 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Ready for AI Analysis</h3>
                  <p className="text-muted-foreground mb-6">
                    Both drone imagery and sensor data uploaded successfully. 
                    Initiate predictive analysis to assess rockfall risk patterns.
                  </p>
                  <Button
                    size="lg"
                    onClick={runAnalysis}
                    disabled={isAnalyzing}
                    className="bg-gradient-mining-primary hover:shadow-mining-glow transition-mining text-lg px-8"
                  >
                    {isAnalyzing ? (
                      <>
                        <Activity className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing Data...
                      </>
                    ) : (
                      <>
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Start AI Analysis
                      </>
                    )}
                  </Button>
                </div>
                
                {isAnalyzing && (
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground">Processing geological patterns...</div>
                    <Progress value={65} className="h-2" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dashboard Content */}
        {analysisComplete && (
          <div className="space-y-8">
            <MonitoringCards />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <RiskVisualization />
              </div>
              <div>
                <AlertsPanel />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiningDashboard;