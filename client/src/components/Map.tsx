/**
 * GOOGLE MAPS FRONTEND INTEGRATION - ESSENTIAL GUIDE
 *
 PARENT COMPONENT:
 * ======
 * USAGE FROM *
 * const mapRef = useRef<any>(null);
 *
 * <MapView
 *   initialCenter={{ lat: 40.7128, lng: -74.0060 }}
 *   initialZoom={15}
 *   onMapReady={(map) => {
 *     mapRef.current = map; // Store to control map from parent anytime
 *   }}
 * </MapView>
 */

import { useEffect, useRef } from "react";
import { usePersistFn } from "@/hooks/usePersistFn";
import { cn } from "@/lib/utils";

interface MapViewProps {
  className?: string;
  initialCenter?: { lat: number; lng: number };
  initialZoom?: number;
  onMapReady?: (map: any) => void;
}

export function MapView({
  className,
  initialCenter = { lat: 37.7749, lng: -122.4194 },
  initialZoom = 12,
  onMapReady,
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<any>(null);

  const API_KEY = import.meta.env.VITE_FRONTEND_FORGE_API_KEY;
  const FINAL_API_KEY = API_KEY || "DEMO_KEY";

  const FORGE_BASE_URL =
    import.meta.env.VITE_FRONTEND_FORGE_API_URL ||
    "https://forge.butterfly-effect.dev";
  const MAPS_PROXY_URL = `${FORGE_BASE_URL}/v1/maps/proxy`;

  const loadMapScript = usePersistFn(() => {
    return new Promise<void>((resolve, reject) => {
      if (!API_KEY) {
        console.warn("VITE_FRONTEND_FORGE_API_KEY not defined, using demo mode");
      }
      const script = document.createElement("script");
      script.src = `${MAPS_PROXY_URL}/maps/api/js?key=${FINAL_API_KEY}&v=weekly&libraries=marker,places,geocoding,geometry`;
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onload = () => {
        script.remove();
        resolve();
      };
      script.onerror = () => {
        console.error("Failed to load Google Maps script");
        reject(new Error("Failed to load Google Maps script"));
      };
      document.head.appendChild(script);
    });
  });

  const init = usePersistFn(async () => {
    await loadMapScript();
    if (!mapContainer.current) {
      console.error("Map container not found");
      return;
    }
    if (!window.google) {
      console.error("Google Maps not loaded");
      return;
    }
    map.current = new window.google.maps.Map(mapContainer.current, {
      zoom: initialZoom,
      center: initialCenter,
      mapTypeControl: true,
      fullscreenControl: true,
      zoomControl: true,
      streetViewControl: true,
      mapId: "DEMO_MAP_ID",
    });
    if (onMapReady) {
      onMapReady(map.current);
    }
  });

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div ref={mapContainer} className={cn("w-full h-[500px]", className)} />
  );
}
