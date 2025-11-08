# AR Setup with Model-Viewer (Native Mobile AR)

This project now uses Google's `model-viewer` for native AR viewing on mobile devices. This provides a much better experience than Sketchfab iframes.

## How It Works

- **iOS**: Uses ARKit via Quick Look (USDZ format)
- **Android**: Uses ARCore via Scene Viewer (GLB format)
- **Web**: Uses WebXR for AR viewing

## Setting Up Your 3D Models

### Option 1: Host GLB Files Locally (Recommended)

1. **Place your GLB file in the public folder:**
   ```
   public/models/towels_reality_scan_test.glb
   ```

2. **Update your database:**
   - The `arModelUrl` field should contain the path to your GLB file
   - Example: `/models/towels_reality_scan_test.glb`
   - Or full URL: `https://yourdomain.com/models/towels_reality_scan_test.glb`

3. **For iOS AR (optional but recommended):**
   - Convert your GLB to USDZ format for better iOS support
   - Use tools like: https://github.com/google/usd-from-gltf
   - Place it in the same location: `public/models/towels_reality_scan_test.usdz`
   - The component will automatically use it for iOS devices

### Option 2: Use a CDN

1. Upload your GLB file to a CDN (e.g., Cloudflare, AWS S3, etc.)
2. Update the `arModelUrl` in your database with the full CDN URL
3. Example: `https://cdn.example.com/models/towels_reality_scan_test.glb`

## Testing AR on Mobile

1. **Deploy your app** (or use local network for testing)
2. **Open on your phone** (must be HTTPS or localhost)
3. **Click "View in AR"** on any menu item
4. **Tap the AR button** that appears in the model viewer
5. **Grant camera permissions** when prompted
6. **View the 3D model in your space!**

## Current Setup

The component currently supports:
- Direct GLB file URLs
- Sketchfab model IDs (will need to be converted to GLB URLs)
- Local file paths (e.g., `/models/file.glb`)

## Converting GLB to USDZ (for iOS)

To get the best iOS AR experience:

```bash
# Install usd-from-gltf
npm install -g @google/usd-from-gltf

# Convert GLB to USDZ
usd-from-gltf towels_reality_scan_test.glb towels_reality_scan_test.usdz
```

Then place both files in `public/models/`:
- `towels_reality_scan_test.glb` (for Android/Web)
- `towels_reality_scan_test.usdz` (for iOS)

## Troubleshooting

- **AR button not showing**: Make sure you're on HTTPS or localhost
- **Model not loading**: Check the file path is correct and file is accessible
- **iOS AR not working**: Make sure you have a USDZ file for iOS devices
- **Android AR not working**: Ensure the GLB file is accessible and not too large

