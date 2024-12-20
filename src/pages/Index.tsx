import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { BucketList } from "@/components/storage/BucketList";
import { CreateBucket } from "@/components/storage/CreateBucket";
import { FileList } from "@/components/storage/FileList";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [selectedBucket, setSelectedBucket] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Supabase Storage Manager</h1>
      
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