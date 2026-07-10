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

export default function CesiumMap({
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
    <div className="relative rounded-2xl overflow-hidden border border-sage-200/80 bg-beige-100 shadow-md flex flex-col h-[340px] w-full" id="cesium-map-card">
      
      {/* Top Header HUD */}
      <div className="bg-sage-800 text-beige-50 px-4 py-2.5 flex items-center justify-between border-b border-sage-900/60 font-sans">
        <div className="flex items-center space-x-2">
          <Earth className="h-4.5 w-4.5 text-sage-300 animate-spin" style={{ animationDuration: '20s' }} />
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest block font-display">
              CESIUM 3D GLOBE RADAR
            </span>
            <span className="text-[8px] font-mono text-sage-200 block -mt-0.5">
              TARGET: {latitude.toFixed(4)}°N, {longitude.toFixed(4)}°E
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-ping mr-1"></span>
          <span className="text-[8px] font-mono text-sage-200 uppercase">3D_RENDER_ACTIVE</span>
        </div>
      </div>

      {/* Main Map Body Container */}
      <div className="flex-grow relative bg-stone-900 overflow-hidden">
        
        {/* Loading Spinner Overlays */}
        {!libLoaded && !error && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-stone-900 text-beige-100 space-y-3.5 p-4">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sage-400"></div>
            <div className="text-center">
              <p className="text-xs font-mono tracking-wider font-bold text-beige-200 uppercase">Loading Cesium 3D Globe...</p>
              <p className="text-[10px] text-stone-400 mt-1">Acquiring orbital imagery & terrain vectors</p>
            </div>
          </div>
        )}

        {/* Error overlay */}
        {error && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-stone-900 text-amber-500 p-4 text-center">
            <Map className="h-10 w-10 mb-2 opacity-60" />
            <p className="text-xs font-bold font-mono tracking-wider uppercase">GLOBE STREAM OFFLINE</p>
            <p className="text-[10px] text-stone-400 mt-1 leading-relaxed max-w-xs">{error}</p>
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
          <div className="absolute bottom-3 right-3 z-10 flex flex-col bg-stone-900/90 backdrop-blur-xs border border-stone-700/50 rounded-xl p-1.5 shadow-xl space-y-1">
            <button
              onClick={zoomIn}
              title="Zoom In"
              className="p-2 bg-stone-850 hover:bg-sage-700 text-beige-100 hover:text-white rounded-lg transition-colors border border-stone-800"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              onClick={zoomOut}
              title="Zoom Out"
              className="p-2 bg-stone-850 hover:bg-sage-700 text-beige-100 hover:text-white rounded-lg transition-colors border border-stone-800"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              onClick={resetView}
              title="Reset View"
              className="p-2 bg-stone-850 hover:bg-sage-700 text-beige-100 hover:text-white rounded-lg transition-colors border border-stone-800"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={toggle3DOrbit}
              title="Rotate Orbit"
              className="p-2 bg-stone-850 hover:bg-sage-700 text-beige-100 hover:text-white rounded-lg transition-colors border border-stone-800"
            >
              <Navigation2 className="h-4 w-4 rotate-45" />
            </button>
          </div>
        )}

        {/* Floating Scale & Metadata Overlay Info */}
        <div className="absolute bottom-3 left-3 z-10 bg-stone-950/85 backdrop-blur-xs border border-stone-800/80 rounded-lg px-2.5 py-1.5 font-mono text-[8px] text-stone-400 space-y-0.5">
          <div className="flex items-center space-x-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-sage-400"></span>
            <span>ZOOM: DYNAMIC // TILEMAP SERVICE</span>
          </div>
          <div>COORDS: 30° 09' 27" N, 71° 25' 59" E</div>
          <div>ELEVATION: ~129m (AMSL)</div>
        </div>

      </div>

      {/* Earthy Footer details */}
      <div className="bg-beige-50 border-t border-sage-100 px-4 py-2 text-[10px] text-sage-700 font-sans text-center leading-relaxed font-semibold">
        Interactive 3D preview of <strong className="text-sage-800">Malik Enterprises Industrial Hub Phase-1</strong>. Double-click the globe or use camera nodes to navigate terrain.
      </div>

    </div>
  );
}
