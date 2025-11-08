'use client';

import { useEffect, useRef, useState } from 'react';

interface ARViewerProps {
  modelUrl: string;
  onClose: () => void;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          ar?: boolean;
          'ar-modes'?: string;
          'camera-controls'?: boolean;
          'touch-action'?: string;
          'ios-src'?: string;
          'shadow-intensity'?: string;
          exposure?: string;
          'environment-image'?: string;
        },
        HTMLElement
      >;
    }
  }
}

export default function ARViewer({ modelUrl, onClose }: ARViewerProps) {
  const modelViewerRef = useRef<HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Get the model URL - supports:
  // 1. Direct GLB/GLTF/USDZ file URLs
  // 2. Local paths (e.g., /models/file.glb)
  // 3. Sketchfab model IDs (converted to local path)
  const getModelUrl = (url: string): string => {
    // If it's already a full URL with file extension, use it directly
    if (url.startsWith('http') && (url.endsWith('.glb') || url.endsWith('.gltf') || url.endsWith('.usdz'))) {
      return url;
    }
    
    // If it's a local path starting with /, use it directly
    if (url.startsWith('/')) {
      return url;
    }
    
    // If it's a Sketchfab model ID (just an ID without http or /)
    if (!url.includes('http') && !url.includes('/') && !url.includes('.')) {
      // Assume the GLB file is in public/models/ with the same name
      // You should update your database to store the actual file path
      return `/models/${url}.glb`;
    }
    
    // If it's a Sketchfab URL, extract model ID
    const match = url.match(/models\/([^\/\?]+)/);
    if (match) {
      return `/models/${match[1]}.glb`;
    }
    
    // Default: assume it's a local path
    return url.startsWith('/') ? url : `/models/${url}`;
  };

  const modelUrlFinal = getModelUrl(modelUrl);
  
  // For iOS, we need a USDZ file. Try to find it by replacing .glb with .usdz
  // If the original URL doesn't have .glb, try appending .usdz
  const iosModelUrl = modelUrlFinal.endsWith('.glb') 
    ? modelUrlFinal.replace('.glb', '.usdz')
    : modelUrlFinal.endsWith('.gltf')
    ? modelUrlFinal.replace('.gltf', '.usdz')
    : `${modelUrlFinal}.usdz`;

  useEffect(() => {
    // Reset loading state when model URL changes
    setIsLoading(true);
    setLoadProgress(0);
    setError(null);
  }, [modelUrlFinal]);

  useEffect(() => {
    // Listen for model-viewer events
    const modelViewer = modelViewerRef.current as any;
    if (!modelViewer) return;

    const handleLoad = () => {
      setIsLoading(false);
      setLoadProgress(100);
    };

    const handleProgress = (e: any) => {
      const progress = e.detail.totalProgress * 100;
      setLoadProgress(Math.round(progress));
    };

    const handleError = () => {
      setIsLoading(false);
      setError('Failed to load 3D model. Please check the file path.');
    };

    modelViewer.addEventListener('load', handleLoad);
    modelViewer.addEventListener('progress', handleProgress);
    modelViewer.addEventListener('error', handleError);

    return () => {
      modelViewer.removeEventListener('load', handleLoad);
      modelViewer.removeEventListener('progress', handleProgress);
      modelViewer.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full max-w-6xl max-h-[90vh] m-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white hover:bg-gray-100 text-shadow rounded-full p-2 shadow-lg transition-colors"
          aria-label="Close AR viewer"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Model Viewer with AR support */}
        <model-viewer
          ref={modelViewerRef}
          src={modelUrlFinal}
          alt="3D Model"
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          touch-action="pan-y"
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
          }}
          ios-src={iosModelUrl}
          shadow-intensity="1"
          exposure="1"
          environment-image="neutral"
          loading="eager"
          reveal="interaction"
        >
          {/* Loading indicator with progress */}
          {(isLoading || error) && (
            <div
              slot="poster"
              className="w-full h-full flex items-center justify-center bg-gray-100"
            >
              <div className="text-center">
                {error ? (
                  <>
                    <div className="text-red-500 text-4xl mb-4">⚠️</div>
                    <p className="text-red-600 font-semibold mb-2">Error Loading Model</p>
                    <p className="text-gray-600 text-sm mb-4">{error}</p>
                    <p className="text-gray-500 text-xs">Path: {modelUrlFinal}</p>
                  </>
                ) : (
                  <>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium mb-2">Loading 3D model...</p>
                    {loadProgress > 0 && (
                      <div className="w-48 bg-gray-200 rounded-full h-2 mx-auto mb-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${loadProgress}%` }}
                        ></div>
                      </div>
                    )}
                    <p className="text-gray-500 text-xs">{loadProgress}%</p>
                    {loadProgress === 0 && (
                      <p className="text-gray-400 text-xs mt-2">This may take a moment for large files...</p>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </model-viewer>

        {/* AR Button Info */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-sm">
          <p>Tap the AR button to view in your space</p>
        </div>
      </div>
    </div>
  );
}
