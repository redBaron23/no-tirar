import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const uploadImage = async (file: File, path: string) => {
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("restaurant-images")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Image upload failed: ${uploadError.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from("restaurant-images")
    .getPublicUrl(path);

  return publicUrlData.publicUrl;
};
