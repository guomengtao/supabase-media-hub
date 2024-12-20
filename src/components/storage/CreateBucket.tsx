import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CreateBucketProps {
  setIsLoading: (loading: boolean) => void;
}

export const CreateBucket = ({ setIsLoading }: CreateBucketProps) => {
  const [newBucketName, setNewBucketName] = useState("");
  const { toast } = useToast();

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

  return (
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
        <Button onClick={createBucket}>
          <Plus className="mr-2 h-4 w-4" />
          Create Bucket
        </Button>
      </CardContent>
    </Card>
  );
};