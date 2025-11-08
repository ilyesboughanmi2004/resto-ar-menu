# 3D Model Optimization Guide

## Current File Size Issue

Your GLB file (`towels_reality_scan_test.glb`) is **~16MB**, which is quite large and will cause slow loading times, especially on mobile devices.

## Why It's Slow

- **Large file size**: 16MB takes time to download, especially on slower connections
- **No compression**: The model might not be optimized
- **High polygon count**: Reality scans often have very detailed geometry
- **Large textures**: High-resolution textures increase file size

## Solutions

### Option 1: Optimize the GLB File (Recommended)

Use tools to reduce file size while maintaining quality:

**Using gltf-transform (Recommended):**
```bash
# Install gltf-transform
npm install -g @gltf-transform/cli

# Optimize your model
gltf-transform optimize towels_reality_scan_test.glb towels_optimized.glb \
  --texture-compress webp \
  --simplify \
  --quantize
```

**Using Blender:**
1. Import your GLB file
2. Go to File > Export > glTF 2.0
3. Enable:
   - ✅ Apply Modifiers
   - ✅ Compression (Draco)
   - Reduce texture size
   - Simplify geometry if needed

**Using online tools:**
- https://glb.report/ - Analyze and optimize GLB files
- https://www.creators3d.com/online-viewer - View and optimize

### Option 2: Use a CDN

Host your GLB files on a CDN for faster delivery:
- **Cloudflare R2** (free tier available)
- **AWS S3 + CloudFront**
- **Vercel Blob Storage**
- **Supabase Storage**

### Option 3: Reduce Model Complexity

1. **Reduce polygon count**: Use decimation in Blender
2. **Compress textures**: Convert to WebP, reduce resolution
3. **Remove unnecessary data**: Remove unused materials, animations
4. **Use LOD (Level of Detail)**: Create multiple versions for different distances

### Option 4: Lazy Loading

The component already supports lazy loading, but you can also:
- Only load models when user clicks "View in AR"
- Preload models in the background
- Show a thumbnail first

## Target File Sizes

For web/mobile AR:
- **Ideal**: < 2MB
- **Acceptable**: 2-5MB
- **Large**: 5-10MB
- **Too Large**: > 10MB (your current file)

## Quick Fix: Compress with gltf-transform

```bash
# Install
npm install -g @gltf-transform/cli

# Basic optimization (reduces size significantly)
gltf-transform optimize towels_reality_scan_test.glb towels_optimized.glb

# Advanced optimization (more aggressive)
gltf-transform optimize towels_reality_scan_test.glb towels_optimized.glb \
  --texture-compress webp \
  --simplify \
  --quantize \
  --texture-resize 1024
```

After optimization, replace the file:
```bash
mv towels_optimized.glb public/models/towels_reality_scan_test.glb
```

## Testing

After optimization:
1. Check the new file size (should be much smaller)
2. Test loading speed
3. Verify AR still works correctly
4. Check visual quality (should still look good)

## Current Implementation

The AR viewer now shows:
- ✅ Loading progress bar
- ✅ Percentage indicator
- ✅ Error messages if file fails to load
- ✅ Better user feedback during loading

This helps users understand that the model is loading, even if it takes time.

