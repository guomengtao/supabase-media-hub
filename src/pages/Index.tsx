import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { BucketList } from "@/components/storage/BucketList";
import { CreateBucket } from "@/components/storage/CreateBucket";
import { FileList } from "@/components/storage/FileList";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [selectedBucket, setSelectedBucket] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="container mx-auto p-4 max-w-md">
        <h1 className="text-3xl font-bold mb-6">Supabase Storage Manager</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="light"
            providers={[]}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Supabase Storage Manager</h1>
        <button
          onClick={() => supabase.auth.signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Sign Out
        </button>
      </div>
      
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