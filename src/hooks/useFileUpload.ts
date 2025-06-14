
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadFile = async (file: File, folder: string = 'documents') => {
    setUploading(true);
    setUploadProgress(0);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Not authenticated');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${session.user.id}/${folder}/${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('profile-uploads')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('profile-uploads')
        .getPublicUrl(data.path);

      setUploadProgress(100);
      
      toast({
        title: "File uploaded successfully",
        description: "Your file has been uploaded and is ready to use.",
      });

      return {
        url: urlData.publicUrl,
        path: data.path,
        name: file.name
      };
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message || "Something went wrong",
        variant: "destructive"
      });
      throw error;
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return {
    uploadFile,
    uploading,
    uploadProgress
  };
};
