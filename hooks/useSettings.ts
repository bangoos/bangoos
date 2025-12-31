"use client";
import { useState, useEffect } from "react";
import { WebsiteSettings, defaultSettings } from "@/types/settings";
import { SettingsService } from "@/services/SettingsService";

export function useSettings() {
  const [settings, setSettings] = useState<WebsiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings from Supabase on mount
  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true);
      try {
        const loadedSettings = await SettingsService.getSettings();
        setSettings(loadedSettings);
      } catch (error) {
        console.error("Error loading settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Save settings to Supabase
  const saveSettings = async (newSettings: WebsiteSettings) => {
    setIsLoading(true);
    try {
      const result = await SettingsService.saveSettings(newSettings);
      if (result.success) {
        setSettings(newSettings);
      } else {
        console.error("Error saving settings:", result.error);
      }
    } catch (error) {
      console.error("Error in saveSettings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset settings to default
  const resetSettings = async () => {
    setIsLoading(true);
    try {
      const result = await SettingsService.resetSettings();
      if (result.success) {
        setSettings(defaultSettings);
      } else {
        console.error("Error resetting settings:", result.error);
      }
    } catch (error) {
      console.error("Error in resetSettings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    settings,
    saveSettings,
    resetSettings,
    isLoading,
  };
}
