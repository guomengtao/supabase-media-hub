import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Folder } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const Index = () => {
  const [buckets, setBuckets] = useState<any[]>([]);
  const [newBucketName, setNewBucketName] = useState("");
  const [selectedBucket, setSelectedBucket] = useState<string | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchBuckets();
  }, []);

  useEffect(() => {
    if (selectedBucket) {
      fetchFiles();
    }
  }, [selectedBucket]);

  const fetchBuckets = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.storage.listBuckets();
      if (error) throw error;
      setBuckets(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching buckets",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createBucket = async () => {
    if (!newBucketName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a bucket name",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await supabase.storage.createBucket(newBucketName, {
        public: true,
      });
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Bucket created successfully",
      });
      
      setNewBucketName("");
      fetchBuckets();
    } catch (error: any) {
      toast({
        title: "Error creating bucket",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFiles = async () => {
    if (!selectedBucket) return;

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
    if (!file || !selectedBucket) return;

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
    if (!selectedBucket) return "";
    return supabase.storage.from(selectedBucket).getPublicUrl(fileName).data.publicUrl;
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Supabase Storage Manager</h1>
      
      {/* Create Bucket Section */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Bucket</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Input
            placeholder="Enter bucket name"
            value={newBucketName}
            onChange={(e) => setNewBucketName(e.target.value)}
          />
          <Button onClick={createBucket} disabled={isLoading}>
            <Plus className="mr-2 h-4 w-4" />
            Create Bucket
          </Button>
        </CardContent>
      </Card>

      {/* Buckets List */}
      <Card>
        <CardHeader>
          <CardTitle>Storage Buckets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {buckets.map((bucket) => (
              <Card
                key={bucket.id}
                className={`cursor-pointer transition-all ${
                  selectedBucket === bucket.name ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedBucket(bucket.name)}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <Folder className="h-6 w-6" />
                  <span>{bucket.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Files Section */}
      {selectedBucket && (
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
      )}
    </div>
  );
};

export default Index;