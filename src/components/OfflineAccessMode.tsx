
import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { 
  Download, 
  Wifi, 
  WifiOff, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Trash
} from 'lucide-react';

const OfflineAccessMode = () => {
  const [offlineEnabled, setOfflineEnabled] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'failed'>('synced');
  const [syncProgress, setSyncProgress] = useState(100);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadActive, setDownloadActive] = useState(false);
  const [storageSummary, setStorageSummary] = useState({
    jobs: 120,
    saved: 8,
    storage: '24MB',
    lastSync: 'Today at 10:32 AM'
  });
  
  const toggleOfflineMode = () => {
    if (!offlineEnabled) {
      // Enable offline mode
      setOfflineEnabled(true);
      setDownloadActive(true);
      simulateDownload();
    } else {
      // Disable offline mode
      setOfflineEnabled(false);
      
      toast({
        title: "Offline mode disabled",
        description: "You'll need an internet connection to browse jobs"
      });
    }
  };
  
  const simulateDownload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setDownloadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setDownloadActive(false);
        
        toast({
          title: "Offline mode enabled",
          description: "Job listings are now available offline"
        });
      }
    }, 150);
  };
  
  const simulateSync = () => {
    setSyncStatus('syncing');
    setSyncProgress(0);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setSyncProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setSyncStatus('synced');
        setStorageSummary({
          ...storageSummary,
          lastSync: 'Just now'
        });
        
        toast({
          title: "Sync completed",
          description: "Your data is up to date"
        });
      }
    }, 200);
  };
  
  return (
    <div className="space-y-6">
      <Card className="border-2 border-muted">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <WifiOff className="h-5 w-5 text-primary" />
                Offline Access Mode
              </CardTitle>
              <CardDescription>Access job listings even without internet</CardDescription>
            </div>
            <Switch 
              checked={offlineEnabled} 
              onCheckedChange={toggleOfflineMode} 
            />
          </div>
        </CardHeader>
        
        <CardContent>
          {downloadActive ? (
            <div className="space-y-4">
              <div className="text-center">
                <Download className={`h-12 w-12 mx-auto text-primary mb-4 ${downloadProgress < 100 ? 'animate-bounce' : ''}`} />
                <h3 className="text-lg font-medium">Downloading job data</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This may take a few minutes depending on your connection
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{downloadProgress}% complete</span>
                  <span>{Math.round(downloadProgress / 5)} MB / 24 MB</span>
                </div>
                <Progress value={downloadProgress} className="h-2" />
              </div>
              
              <div className="bg-muted/30 p-3 rounded-md">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Keep the app open</p>
                    <p className="text-xs text-muted-foreground">Download will pause if you close the app</p>
                  </div>
                </div>
              </div>
            </div>
          ) : offlineEnabled ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-muted/20 p-4 rounded-lg">
                <div className="flex items-center">
                  {syncStatus === 'syncing' ? (
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Wifi className="h-5 w-5 text-blue-600 animate-pulse" />
                    </div>
                  ) : syncStatus === 'synced' ? (
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-amber-600" />
                    </div>
                  )}
                  
                  <div className="ml-4">
                    <h4 className="font-medium">
                      {syncStatus === 'syncing' 
                        ? 'Syncing data...' 
                        : syncStatus === 'synced'
                          ? 'Data is up to date'
                          : 'Sync required'}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Last synced: {storageSummary.lastSync}
                    </p>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={syncStatus === 'syncing'}
                  onClick={simulateSync}
                >
                  {syncStatus === 'syncing' ? 'Syncing...' : 'Sync now'}
                </Button>
              </div>
              
              {syncStatus === 'syncing' && (
                <Progress value={syncProgress} className="h-1" />
              )}
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-muted/20 rounded-lg">
                  <p className="text-2xl font-bold">{storageSummary.jobs}</p>
                  <p className="text-sm text-muted-foreground">Jobs available</p>
                </div>
                <div className="p-3 bg-muted/20 rounded-lg">
                  <p className="text-2xl font-bold">{storageSummary.saved}</p>
                  <p className="text-sm text-muted-foreground">Saved jobs</p>
                </div>
                <div className="p-3 bg-muted/20 rounded-lg">
                  <p className="text-2xl font-bold">{storageSummary.storage}</p>
                  <p className="text-sm text-muted-foreground">Storage used</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Advanced Options</h4>
                
                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <Label className="ml-3">Auto-sync frequency</Label>
                  </div>
                  <select className="bg-transparent border rounded-md px-2 py-1 text-sm">
                    <option>Every 6 hours</option>
                    <option>Every 12 hours</option>
                    <option>Daily</option>
                    <option>Manual only</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center">
                    <WifiOff className="h-5 w-5 text-muted-foreground" />
                    <Label className="ml-3">Auto-download on WiFi only</Label>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center">
                    <Trash className="h-5 w-5 text-red-500" />
                    <Label className="ml-3">Clear offline data</Label>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-500 border-red-200 hover:bg-red-50"
                    onClick={() => {
                      toast({
                        title: "Offline data cleared",
                        description: "All cached job data has been removed"
                      });
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-4 text-center">
              <WifiOff className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Offline access is disabled</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Enable offline access to browse job listings even when you don't have internet connection.
                Perfect for areas with poor connectivity.
              </p>
              <Button 
                onClick={toggleOfflineMode}
                className="mx-auto"
              >
                <Download className="h-4 w-4 mr-2" />
                Enable Offline Mode
              </Button>
            </div>
          )}
        </CardContent>
        
        {offlineEnabled && !downloadActive && (
          <CardFooter className="border-t bg-muted/10">
            <div className="flex items-center w-full justify-between">
              <p className="text-sm text-muted-foreground">
                <Badge variant="outline" className="bg-green-100 border-green-200 text-green-800 mr-2">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Active
                </Badge>
                You can now browse jobs offline
              </p>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toggleOfflineMode()}
                className="text-red-500 hover:text-red-700"
              >
                Disable
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default OfflineAccessMode;
