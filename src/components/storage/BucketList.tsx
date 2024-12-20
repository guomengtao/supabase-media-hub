import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Folder } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BucketListProps {
  selectedBucket: string | null;
  setSelectedBucket: (bucket: string | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const BucketList = ({ 
  selectedBucket, 
  setSelectedBucket,
  isLoading,
  setIsLoading 
}: BucketListProps) => {
  const [buckets, setBuckets] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchBuckets();
  }, []);

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

  return (
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
  );
};