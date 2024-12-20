import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Folder } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Since this file is getting long, let's split it into smaller components
import { BucketList } from "@/components/storage/BucketList";
import { CreateBucket } from "@/components/storage/CreateBucket";
import { FileList } from "@/components/storage/FileList";

const Index = () => {
  const [selectedBucket, setSelectedBucket] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Supabase Storage Manager</h1>
      
      <CreateBucket setIsLoading={setIsLoading} />
      
      <BucketList 
        selectedBucket={selectedBucket}
        setSelectedBucket={setSelectedBucket}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />

      {selectedBucket && (
        <FileList 
          selectedBucket={selectedBucket}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </div>
  );
};

export default Index;