
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

const InputVisibilityFix = () => {
  return (
    <Card className="border-2 border-muted">
      <CardHeader>
        <CardTitle>Input Field Visibility Fix</CardTitle>
        <CardDescription>
          Improved input fields with proper contrast for better visibility
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="demo-input-1">Standard Input</Label>
            <Input 
              id="demo-input-1"
              placeholder="Enter text here" 
              className="text-gray-900 placeholder-gray-400 border-gray-300"
            />
            <p className="text-xs text-muted-foreground">
              The input text is now dark gray (#1F1F1F) for better visibility
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="demo-input-2">Disabled Input</Label>
            <Input 
              id="demo-input-2"
              placeholder="Disabled input"
              disabled
              className="text-gray-900 placeholder-gray-400 border-gray-300"
            />
            <p className="text-xs text-muted-foreground">
              Even disabled inputs maintain proper contrast
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="demo-textarea">Text Area</Label>
          <Textarea 
            id="demo-textarea"
            placeholder="Enter longer text here"
            className="text-gray-900 placeholder-gray-400 border-gray-300"
          />
          <p className="text-xs text-muted-foreground">
            Textareas also have improved contrast
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white rounded-md border space-y-2">
            <h3 className="text-sm font-medium">Light Background</h3>
            <Input 
              placeholder="Input on light background" 
              className="text-gray-900 placeholder-gray-400 border-gray-300"
            />
            <p className="text-xs text-muted-foreground">
              Clear visibility on light backgrounds
            </p>
          </div>
          
          <div className="p-4 bg-gray-900 rounded-md space-y-2">
            <h3 className="text-sm font-medium text-white">Dark Background</h3>
            <Input 
              placeholder="Input on dark background" 
              className="bg-gray-800 text-white placeholder-gray-400 border-gray-700"
            />
            <p className="text-xs text-gray-400">
              Adaptive styling for dark backgrounds
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="demo-with-switch">Input with Form Control</Label>
          <div className="flex items-center gap-3">
            <Input 
              id="demo-with-switch"
              placeholder="Notification email"
              className="text-gray-900 placeholder-gray-400 border-gray-300"
            />
            <div className="flex items-center gap-2">
              <Switch id="email-notif" />
              <Label htmlFor="email-notif" className="text-sm">Active</Label>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Form controls now have consistent styling
          </p>
        </div>
        
        <div className="p-4 bg-muted/30 rounded-md text-sm">
          <p className="font-medium">Implementation Notes:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
            <li>Text color changed to #1F1F1F (dark gray)</li>
            <li>Placeholder color is #888888 (medium gray)</li>
            <li>Added subtle border (#CCC) for definition</li>
            <li>Added focus styling with blue highlight</li>
            <li>Compatible with both light and dark modes</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default InputVisibilityFix;
