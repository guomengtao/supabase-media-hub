import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface FileListProps {
  selectedBucket: string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const FileList = ({ 
  selectedBucket,
  isLoading,
  setIsLoading 
}: FileListProps) => {
  const [files, setFiles] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedBucket) {
      fetchFiles();
    }
  }, [selectedBucket]);

  const fetchFiles = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.storage.from(selectedBucket).list();
      if (error) throw error;
      setFiles(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching files",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const { error } = await supabase.storage
        .from(selectedBucket)
        .upload(`${Date.now()}-${file.name}`, file);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
      
      fetchFiles();
    } catch (error: any) {
      toast({
        title: "Error uploading file",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getFileUrl = (fileName: string) => {
    return supabase.storage.from(selectedBucket).getPublicUrl(fileName).data.publicUrl;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Files in {selectedBucket}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <Input
            type="file"
            accept="video/*"
            onChange={handleFileUpload}
            className="max-w-md"
          />
          <Button disabled={isLoading}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Video
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {files.map((file) => (
            <Card key={file.id}>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">{file.name}</h3>
                {file.metadata?.mimetype?.startsWith("video/") && (
                  <video
                    controls
                    className="w-full rounded-lg"
                    src={getFileUrl(file.name)}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};