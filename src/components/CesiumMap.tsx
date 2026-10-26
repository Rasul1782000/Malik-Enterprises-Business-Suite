import { useEffect, useRef, useState } from "react";
import { Map, Navigation2, ZoomIn, ZoomOut, RotateCcw, Earth } from "lucide-react";

interface CesiumMapProps {
  latitude?: number;
  longitude?: number;
  label?: string;
}

declare global {
  interface Window {
    Cesium?: any;
  }
}

export function CesiumMap({
  latitude = 30.1575,
  longitude = 71.4331,
  label = "MALIK ENTERPRISES INDUSTRIAL PLANT"
}: CesiumMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [libLoaded, setLibLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    let scriptLoaded = false;
    let styleLoaded = false;

    // Check if Cesium is already loaded
    if (window.Cesium) {
      setLibLoaded(true);
      return;
    }

    // 1. Add Stylesheet
    const cssId = "cesium-cdn-css";
    let linkElement = document.getElementById(cssId) as HTMLLinkElement;
    if (!linkElement) {
      linkElement = document.createElement("link");
      linkElement.id = cssId;
      linkElement.rel = "stylesheet";
      linkElement.href = "https://cesium.com/downloads/cesiumjs/releases/1.110/Build/Cesium/Widgets/widgets.css";
      document.head.appendChild(linkElement);
    }
    styleLoaded = true;

    // 2. Add Script
    const scriptId = "cesium-cdn-js";
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement;
    if (!scriptElement) {
      scriptElement = document.createElement("script");
      scriptElement.id = scriptId;
      scriptElement.src = "https://cesium.com/downloads/cesiumjs/releases/1.110/Build/Cesium/Cesium.js";
      scriptElement.async = true;
      scriptElement.onload = () => {
        setLibLoaded(true);
      };
      scriptElement.onerror = () => {
        setError("Failed to load CesiumJS script. Verify network connection.");
      };
      document.body.appendChild(scriptElement);
    } else {
      // Script exists but might not be fully loaded/ready yet
      const interval = setInterval(() => {
        if (window.Cesium) {
          setLibLoaded(true);
          clearInterval(interval);
        }
      }, 150);
      return () => clearInterval(interval);
    }

    return () => {
      // We keep scripts loaded globally to avoid flickering/multiple insertions on tab transitions
    };
  }, []);

  // Initialize Viewer when library is loaded
  useEffect(() => {
    if (!libLoaded || !window.Cesium || !containerRef.current) return;

    try {
      const Cesium = window.Cesium;

      // Initialize the Cesium Viewer with standard open-source Imagery to avoid Ion Token requirement
      const viewer = new Cesium.Viewer(containerRef.current, {
        imageryProvider: new Cesium.OpenStreetMapImageryProvider({
          url: "https://a.tile.openstreetmap.org/"
        }),
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        infoBox: true,
        sceneModePicker: true,
        selectionIndicator: true,
        timeline: false,
        navigationHelpButton: false,
        animation: false,
        fullscreenButton: false,
        vrButton: false,
        scene3DOnly: true
      });

      viewerRef.current = viewer;

      // Position camera directly over Multan industrial site
      const targetPosition = Cesium.Cartesian3.fromDegrees(longitude, latitude, 1200);
      
      // Add detailed marker pin
      const entity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(longitude, latitude, 20),
        point: {
          pixelSize: 14,
          color: Cesium.Color.fromCssColorString("#486848"), // Deep Sage Green color matching theme
          outlineColor: Cesium.Color.fromCssColorString("#faf9f5"), // Warm beige border
          outlineWidth: 3,
          heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
        },
        label: {
          text: label,
          font: "12px monospace",
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          fillColor: Cesium.Color.fromCssColorString("#1d261d"), // Sage text
          outlineColor: Cesium.Color.fromCssColorString("#faf9f5"), // Warm beige border
          outlineWidth: 3,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -15),
          heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
        }
      });

      // Fly camera to target
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, 2500), // Height in meters
        orientation: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-60.0), // Slanted down angle
          roll: 0.0
        },
        duration: 2.0
      });

      // Track entity
      viewer.selectedEntity = entity;

    } catch (err: any) {
      console.error("Cesium initialization error:", err);
      setError("An error occurred during globe canvas initialization.");
    }

    return () => {
      if (viewerRef.current && !viewerRef.current.isDestroyed()) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [libLoaded, latitude, longitude, label]);

  // Dynamic Camera Controls helper functions
  const zoomIn = () => {
    if (!viewerRef.current || !window.Cesium) return;
    const Cesium = window.Cesium;
    viewerRef.current.camera.zoomIn(350);
  };

  const zoomOut = () => {
    if (!viewerRef.current || !window.Cesium) return;
    const Cesium = window.Cesium;
    viewerRef.current.camera.zoomOut(350);
  };

  const resetView = () => {
    if (!viewerRef.current || !window.Cesium) return;
    const Cesium = window.Cesium;
    viewerRef.current.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, 2500),
      orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-60.0),
        roll: 0.0
      },
      duration: 1.5
    });
  };

  const toggle3DOrbit = () => {
    if (!viewerRef.current || !window.Cesium) return;
    const viewer = viewerRef.current;
    viewer.camera.lookAtTransform(
      window.Cesium.Matrix4.IDENTITY, 
      new window.Cesium.Cartesian3(0.0, 0.0, 0.0)
    );
    // Smooth camera orbit
    viewer.camera.rotate(window.Cesium.Cartesian3.UNIT_Z, window.Cesium.Math.toRadians(15));
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm flex flex-col h-[340px] w-full" id="cesium-map-card">
      
      {/* Top Header HUD */}
      <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 font-sans">
        <div className="flex items-center space-x-2.5">
          <Earth className="h-4 w-4 text-blue-400" />
          <div>
            <span className="text-xs uppercase font-bold tracking-wider block">
              Cesium 3D Satellite Imagery
            </span>
            <span className="text-[10px] font-mono text-slate-400 block">
              {latitude.toFixed(4)}° N, {longitude.toFixed(4)}° E · 46-C Industrial Estate Phase-1
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-[10px] font-mono text-blue-300 bg-blue-950/70 border border-blue-800/60 px-2 py-0.5 rounded">
          <span>Multan Plant Coordinates</span>
        </div>
      </div>

      {/* Main Map Body Container */}
      <div className="flex-grow relative bg-slate-950 overflow-hidden">
        
        {/* Loading Spinner Overlays */}
        {!libLoaded && !error && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950 text-white space-y-3.5 p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <div className="text-center">
              <p className="text-xs font-mono tracking-wider font-bold text-slate-200 uppercase">Initializing Cesium 3D Globe</p>
              <p className="text-[10px] text-slate-400 mt-1">Streaming orbital imagery & elevation mesh for Multan facility</p>
            </div>
          </div>
        )}

        {/* Error overlay */}
        {error && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950 text-amber-500 p-4 text-center">
            <Map className="h-10 w-10 mb-2 opacity-60" />
            <p className="text-xs font-bold font-mono tracking-wider uppercase">Satellite Stream Offline</p>
            <p className="text-[10px] text-slate-400 mt-1 leading-relaxed max-w-xs">{error}</p>
          </div>
        )}

        {/* The Actual Cesium DOM Element Container */}
        <div 
          ref={containerRef} 
          id="cesiumContainer" 
          className="w-full h-full"
          style={{ minHeight: "100%" }}
        />

        {/* Floating Quick Camera HUD Control Deck */}
        {libLoaded && !error && (
          <div className="absolute bottom-3 right-3 z-10 flex flex-col bg-slate-900/90 backdrop-blur-xs border border-slate-700/60 rounded-lg p-1 shadow-lg space-y-1">
            <button
              onClick={zoomIn}
              title="Zoom In"
              className="p-1.5 bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white rounded transition-colors"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={zoomOut}
              title="Zoom Out"
              className="p-1.5 bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white rounded transition-colors"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={resetView}
              title="Reset View"
              className="p-1.5 bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white rounded transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={toggle3DOrbit}
              title="Rotate Orbit"
              className="p-1.5 bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white rounded transition-colors"
            >
              <Navigation2 className="h-3.5 w-3.5 rotate-45" />
            </button>
          </div>
        )}

        {/* Floating Scale & Metadata Overlay Info */}
        <div className="absolute bottom-3 left-3 z-10 bg-slate-950/90 backdrop-blur-xs border border-slate-800 rounded-md px-3 py-1.5 font-mono text-[9px] text-slate-300 space-y-0.5">
          <div className="text-blue-400 font-bold">COORDINATES: 30° 09' 27" N, 71° 25' 59" E</div>
          <div className="text-slate-400">ELEVATION: 129m AMSL · Multan, Southern Punjab</div>
        </div>

      </div>

      {/* Enterprise Footer details */}
      <div className="bg-slate-50 border-t border-slate-200 px-4 py-2 text-[11px] text-slate-600 font-sans text-center leading-relaxed">
        Interactive 3D preview of <strong className="text-slate-900 font-semibold">Malik Enterprises Industrial Hub Phase-1</strong>. Double-click the globe or use camera nodes to navigate terrain.
      </div>

    </div>
  );
}

export default CesiumMap;
