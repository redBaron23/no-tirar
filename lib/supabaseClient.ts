"use server";

import { ALLOWED_IMAGE_EXTENSIONS } from "@/constants";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string;
const serviceRoleKey = process.env.SERVICE_ROLE_KEY as string;

const supabase = createClient(supabaseUrl, serviceRoleKey);

export const uploadImage = async (file: File, path: string) => {
  const fileExtension = file.name.split(".").pop() || "";

  if (!ALLOWED_IMAGE_EXTENSIONS.includes(fileExtension.toLowerCase())) {
    throw new Error(
      `Invalid file type. Allowed types are: ${ALLOWED_IMAGE_EXTENSIONS.join(", ")}`,
    );
  }

  const fullPath = `${path}.${fileExtension}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("restaurant-images")
    .upload(fullPath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (uploadError) {
    throw new Error(`Image upload failed: ${uploadError.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from("restaurant-images")
    .getPublicUrl(fullPath);

  return publicUrlData.publicUrl;
};
