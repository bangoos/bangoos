"use client";
import { useState, useEffect } from "react";
import { WebsiteSettings, defaultSettings } from "@/types/settings";

export function useSettings() {
  const [settings, setSettings] = useState<WebsiteSettings>(defaultSettings);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("websiteSettings");
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  const saveSettings = (newSettings: WebsiteSettings) => {
    setSettings(newSettings);
    localStorage.setItem("websiteSettings", JSON.stringify(newSettings));
  };

  // Reset settings to default
  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.setItem("websiteSettings", JSON.stringify(defaultSettings));
  };

  return {
    settings,
    saveSettings,
    resetSettings,
    isLoading: false,
  };
}
