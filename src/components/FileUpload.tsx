
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, File, X } from 'lucide-react';
import { useFileUpload } from '@/hooks/useFileUpload';

interface FileUploadProps {
  onFileUploaded: (file: { url: string; path: string; name: string }) => void;
  acceptedTypes?: string;
  maxSize?: number;
  folder?: string;
  className?: string;
  children?: React.ReactNode;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUploaded,
  acceptedTypes = ".pdf,.doc,.docx,.jpg,.jpeg,.png",
  maxSize = 10 * 1024 * 1024, // 10MB
  folder = "documents",
  className = "",
  children
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFile, uploading, uploadProgress } = useFileUpload();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > maxSize) {
      alert(`File size should be less than ${maxSize / (1024 * 1024)}MB`);
      return;
    }

    try {
      const result = await uploadFile(file, folder);
      onFileUploaded(result);
    } catch (error) {
      console.error('Upload failed:', error);
    }

    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {children ? (
        <div onClick={() => fileInputRef.current?.click()}>
          {children}
        </div>
      ) : (
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full"
        >
          <Upload className="h-4 w-4 mr-2" />
          {uploading ? 'Uploading...' : 'Upload File'}
        </Button>
      )}
      
      {uploading && (
        <div className="mt-2 space-y-2">
          <Progress value={uploadProgress} className="w-full" />
          <p className="text-sm text-muted-foreground">Uploading... {uploadProgress}%</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
