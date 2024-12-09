import { Provider, ProviderFormData } from "@/components/admin/ProviderForm";
import { ApiClient } from "../utils/supabase/apiClient";
import { supabaseAdmin } from "../utils/supabase/admin";

export const addProvider = async (providerData: ProviderFormData) => {
  try {
    const { data, error } = await supabaseAdmin.from('providers').insert({
      name: providerData.name,
      url: providerData.url,
      description: providerData.description || null,
      logo_url: providerData.logo_url || null,
      is_active: providerData.is_active,
      created_at: new Date().toISOString(),
    }).select();
    if (error) {
      throw new Error(`Error adding provider: ${error.message}`);
    }

    return data;
  } catch (err) {
    console.error('Error adding provider:', err);
    throw err;
  }
};

export const getAllProviders = async (): Promise<Provider[]> => {
    try {
        // const { data, error } = await ApiClient.from('providers').select('*');
        const { data, error } = await supabaseAdmin.from('providers').select('*');
            if (error) {
            throw new Error(`Error adding provider: ${error.message}`);
        }
        return data;
    } catch (err) {
        console.error('Error adding provider:', err);
        throw err;
    }
}