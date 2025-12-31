import { createClient } from "@supabase/supabase-js";
import { WebsiteSettings, defaultSettings } from "@/types/settings";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export class SettingsService {
  // Get settings from Supabase
  static async getSettings(): Promise<WebsiteSettings> {
    try {
      const { data, error } = await supabase.from("website_settings").select("*").order("updated_at", { ascending: false }).limit(1).single();

      if (error) {
        console.error("Error fetching settings:", error);
        return defaultSettings;
      }

      if (!data) {
        return defaultSettings;
      }

      // Parse JSON fields
      return {
        siteTitle: data.site_title,
        siteDescription: data.site_description,
        logoUrl: data.logo_url,
        faviconUrl: data.favicon_url,
        footerText: data.footer_text,
        footerLinks: Array.isArray(data.footer_links) ? data.footer_links : defaultSettings.footerLinks,
        socialMedia: typeof data.social_media === "object" ? data.social_media : defaultSettings.socialMedia,
        contact: typeof data.contact_info === "object" ? data.contact_info : defaultSettings.contact,
      };
    } catch (error) {
      console.error("Error in getSettings:", error);
      return defaultSettings;
    }
  }

  // Save settings to Supabase
  static async saveSettings(settings: WebsiteSettings): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.from("website_settings").upsert(
        {
          site_title: settings.siteTitle,
          site_description: settings.siteDescription,
          logo_url: settings.logoUrl,
          favicon_url: settings.faviconUrl,
          footer_text: settings.footerText,
          footer_links: settings.footerLinks,
          social_media: settings.socialMedia,
          contact_info: settings.contact,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "id",
        }
      );

      if (error) {
        console.error("Error saving settings:", error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error("Error in saveSettings:", error);
      return { success: false, error: "Unknown error occurred" };
    }
  }

  // Reset settings to default
  static async resetSettings(): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from("website_settings")
        .update({
          site_title: defaultSettings.siteTitle,
          site_description: defaultSettings.siteDescription,
          logo_url: defaultSettings.logoUrl,
          favicon_url: defaultSettings.faviconUrl,
          footer_text: defaultSettings.footerText,
          footer_links: defaultSettings.footerLinks,
          social_media: defaultSettings.socialMedia,
          contact_info: defaultSettings.contact,
          updated_at: new Date().toISOString(),
        })
        .eq("id", await this.getSettingsId());

      if (error) {
        console.error("Error resetting settings:", error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error("Error in resetSettings:", error);
      return { success: false, error: "Unknown error occurred" };
    }
  }

  // Helper method to get settings ID
  private static async getSettingsId(): Promise<string> {
    try {
      const { data } = await supabase.from("website_settings").select("id").limit(1).single();

      return data?.id || "00000000-0000-0000-0000-000000000000";
    } catch (error) {
      console.error("Error getting settings ID:", error);
      return "00000000-0000-0000-0000-000000000000";
    }
  }
}
