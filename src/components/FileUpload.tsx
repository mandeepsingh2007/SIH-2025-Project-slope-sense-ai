import React, { useCallback, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, CheckCircle, FileX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  acceptedTypes: string;
  onFileUpload: (file: File) => void;
  file: File | null;
  gradient: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  title,
  description,
  icon,
  acceptedTypes,
  onFileUpload,
  file,
  gradient
}) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileUpload(files[0]);
    }
  }, [onFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  }, [onFileUpload]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="data-card overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{description}</p>
        
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-mining cursor-pointer",
            dragOver ? "border-primary bg-primary/5" : "border-border",
            file ? "border-success bg-success/5" : ""
          )}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => document.getElementById(`file-input-${title}`)?.click()}
        >
          <input
            id={`file-input-${title}`}
            type="file"
            accept={acceptedTypes}
            onChange={handleFileSelect}
            className="hidden"
          />
          
          {file ? (
            <div className="space-y-3">
              <CheckCircle className="w-12 h-12 text-success mx-auto" />
              <div>
                <div className="font-medium">{file.name}</div>
                <div className="text-sm text-muted-foreground">
                  {formatFileSize(file.size)}
                </div>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                File Ready
              </Badge>
            </div>
          ) : (
            <div className="space-y-3">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
              <div>
                <div className="font-medium">Drop files here or click to browse</div>
                <div className="text-sm text-muted-foreground">
                  Accepted formats: {acceptedTypes.replace(/\./g, '').toUpperCase()}
                </div>
              </div>
            </div>
          )}
        </div>

        {file && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onFileUpload(null as any)}
            className="w-full"
          >
            <FileX className="w-4 h-4 mr-2" />
            Remove File
          </Button>
        )}
      </CardContent>
    </Card>
  );
};