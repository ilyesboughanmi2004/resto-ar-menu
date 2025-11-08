'use client';

import { useEffect } from 'react';

interface ARViewerProps {
  modelUrl: string;
  onClose: () => void;
}

export default function ARViewer({ modelUrl, onClose }: ARViewerProps) {
  // Extract model ID from URL if it's a full Sketchfab URL
  const getModelId = (url: string): string => {
    // If it's already just an ID, return it
    if (!url.includes('/') && !url.includes('http')) {
      return url;
    }
    
    // Extract ID from Sketchfab URL patterns
    // e.g., https://sketchfab.com/models/abc123 or abc123
    const match = url.match(/models\/([^\/\?]+)/) || url.match(/([a-zA-Z0-9]+)$/);
    return match ? match[1] : url;
  };

  const modelId = getModelId(modelUrl);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
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

        {/* Sketchfab iframe */}
        <iframe
          title="Dish 3D Model"
          className="w-full h-full rounded-lg"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; fullscreen; xr-spatial-tracking"
          src={`https://sketchfab.com/models/${modelId}/embed`}
          {...({
            'mozallowfullscreen': 'true',
            'webkitallowfullscreen': 'true',
            'xr-spatial-tracking': 'true',
            'execution-while-out-of-viewport': 'true',
            'execution-while-not-rendered': 'true',
            'web-share': 'true',
          } as React.HTMLAttributes<HTMLIFrameElement>)}
        />
      </div>
    </div>
  );
}

