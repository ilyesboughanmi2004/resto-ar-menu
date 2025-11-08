# Setting Up Sketchfab 3D Models for AR Viewing

## Steps to Upload Your GLB File to Sketchfab

1. **Create a Sketchfab Account** (if you don't have one)
   - Go to [sketchfab.com](https://sketchfab.com)
   - Sign up for a free account

2. **Upload Your GLB File**
   - Click "Upload" in the top navigation
   - Select `towels_reality_scan_test.glb` from your project folder
   - Wait for the upload and processing to complete

3. **Get Your Model ID**
   - Once uploaded, you'll be taken to your model's page
   - The URL will look like: `https://sketchfab.com/models/YOUR-MODEL-ID`
   - Copy the `YOUR-MODEL-ID` part (it's usually a long alphanumeric string)

4. **Update the Seed Scripts**
   
   **Option A: Update TypeScript Seed Script**
   - Open `prisma/seed.ts`
   - Find the line: `const sketchfabModelId = 'YOUR-SKETCHFAB-MODEL-ID'`
   - Replace `'YOUR-SKETCHFAB-MODEL-ID'` with your actual model ID (keep the quotes)
   - Run: `pnpm db:seed`

   **Option B: Update SQL Seed Script**
   - Open `prisma/seed.sql`
   - Use Find & Replace to replace all instances of `'YOUR-SKETCHFAB-MODEL-ID'` with your actual model ID
   - Run the SQL script in your Supabase SQL Editor

5. **Update Existing Database Records** (if you already seeded)
   - You can update existing records using Prisma Studio: `pnpm db:studio`
   - Or run this SQL in Supabase:
   ```sql
   UPDATE "MenuItem" 
   SET "arModelUrl" = 'YOUR-ACTUAL-MODEL-ID'
   WHERE "arModelUrl" = 'YOUR-SKETCHFAB-MODEL-ID';
   ```

## Testing the AR Feature

1. Start your development server: `pnpm dev`
2. Open the menu in your browser
3. Click "View in AR" on any drink item
4. The Sketchfab viewer should open with your 3D model
5. On mobile devices, you'll be able to view it in AR using your camera

## Notes

- Make sure your Sketchfab model is set to "Downloadable" or "Embeddable" in the model settings
- The model should support AR viewing (WebXR)
- All 15 drinks items will use the same 3D model for testing purposes

