# Image Upload Fixes - Summary

## Issues Fixed

### 1. Images Not Displaying in Table and Edit Modal
**Problem**: Images were stored with relative paths (`/uploads/products/filename.jpg`) but frontend couldn't resolve them properly.

**Solution**: Modified `uploadImages` controller to return full URLs including protocol and host:
```javascript
const baseUrl = `${req.protocol}://${req.get('host')}`;
const imageUrls = req.files.map(file => {
    return `${baseUrl}/uploads/products/${file.filename}`;
});
```

Now images are returned as: `http://localhost:8000/uploads/products/filename.jpg`

### 2. Images Not Deleted on Remove/Update
**Problem**: When removing images in edit mode or deleting products, image files remained in the uploads directory.

**Solutions Implemented**:

#### A. Update Product - Delete Removed Images
Modified `updateProduct` controller to:
1. Compare old images with new images
2. Identify removed images
3. Delete removed image files from disk

```javascript
const removedImages = oldImages.filter(oldImg => !newImages.includes(oldImg));
removedImages.forEach(imagePath => {
    const pathMatch = imagePath.match(/\/uploads\/products\/.+$/);
    if (pathMatch) {
        deleteFile(pathMatch[0]);
    }
});
```

#### B. Delete Product - Delete All Associated Images
Modified `deleteProduct` controller to:
1. Extract path from full URLs
2. Delete all image files before removing product

```javascript
product.images.forEach(imagePath => {
    const pathMatch = imagePath.match(/\/uploads\/products\/.+$/);
    if (pathMatch) {
        deleteFile(pathMatch[0]);
    }
});
```

#### C. Frontend - Better Image Tracking
Fixed `handleSubmitEdit` to properly map blob URLs to uploaded URLs:
```javascript
let uploadIndex = 0;
const finalImages = imagePreviews
    .filter(preview => preview)
    .map(preview => {
        if (preview.startsWith('blob:')) {
            return newImageUrls[uploadIndex++];
        }
        return preview;
    })
    .filter(img => img);
```

## Additional Features Added

### 1. Orphaned Image Cleanup Utility
Created `/backend/utils/imageCleanup.js` with two functions:

#### `cleanupOrphanedImages()`
- Scans uploads directory
- Compares with images referenced in database
- Deletes orphaned files
- Returns statistics about cleanup

#### `getImageStats()`
- Returns storage statistics
- Total files, used files, orphaned files
- Total storage size

### 2. New API Endpoints

#### POST `/api/products/cleanup-images`
- Manually trigger cleanup of orphaned images
- Admin only
- Returns cleanup statistics

#### GET `/api/products/image-stats`
- Get image storage statistics
- Admin only
- Returns file counts and storage size

## Files Modified

### Backend
1. **controllers/productController.js**
   - Modified `uploadImages` - returns full URLs
   - Modified `updateProduct` - deletes removed images
   - Modified `deleteProduct` - handles full URLs
   - Added `cleanupImages` - cleanup endpoint
   - Added `getImageStorageStats` - stats endpoint

2. **routes/productRoutes.js**
   - Added cleanup and stats routes

3. **utils/imageCleanup.js** (NEW)
   - Cleanup utility functions

### Frontend
1. **admin/src/pages/Products.jsx**
   - Fixed `handleSubmitEdit` - better image URL mapping

## Testing Checklist

### Image Display
- [ ] New uploaded images display in products table
- [ ] Images display in edit modal when editing product
- [ ] Multiple images display correctly
- [ ] Placeholder shows when no image

### Image Upload
- [ ] Can upload 1-6 images when adding product
- [ ] Can upload new images when editing product
- [ ] Can mix old and new images in edit

### Image Deletion
- [ ] Removing image in edit modal deletes file from server
- [ ] Deleting product deletes all associated image files
- [ ] Clearing image in modal removes it properly

### Cleanup Features
- [ ] Can call cleanup endpoint: `POST /api/products/cleanup-images`
- [ ] Can get stats: `GET /api/products/image-stats`
- [ ] Orphaned files are identified correctly
- [ ] Cleanup removes only orphaned files

## API Usage Examples

### Upload Images
```bash
POST http://localhost:8000/api/products/upload
Content-Type: multipart/form-data
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": [
    "http://localhost:8000/uploads/products/image-123456.jpg",
    "http://localhost:8000/uploads/products/image-789012.jpg"
  ],
  "message": "2 image(s) uploaded successfully"
}
```

### Get Image Stats
```bash
GET http://localhost:8000/api/products/image-stats
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "totalFiles": 25,
    "totalSize": "12.45 MB",
    "usedFiles": 23,
    "orphanedFiles": 2
  }
}
```

### Cleanup Orphaned Images
```bash
POST http://localhost:8000/api/products/cleanup-images
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "totalFiles": 25,
    "usedFiles": 23,
    "orphanedFiles": 2,
    "removed": 2,
    "errors": []
  },
  "message": "Cleanup completed. 2 orphaned file(s) removed."
}
```

## Important Notes

1. **Full URLs**: Images are now stored as full URLs in the database (e.g., `http://localhost:8000/uploads/products/file.jpg`)

2. **Automatic Cleanup**: Images are automatically deleted when:
   - Product is deleted
   - Images are removed during product update

3. **Manual Cleanup**: Use the cleanup endpoint periodically to remove any orphaned files that may have been left due to errors or interrupted operations

4. **Path Extraction**: The code uses regex to extract the path portion from full URLs: `/uploads/products/filename.jpg`

5. **Environment**: Backend runs on port 8000 (configured in .env)

## Troubleshooting

### Images Still Not Displaying
1. Check backend is running on correct port (8000)
2. Verify VITE_API_URL in admin/.env matches backend URL
3. Check browser console for CORS errors
4. Verify uploads directory exists and is readable

### Images Not Being Deleted
1. Check file permissions on uploads directory
2. Verify the image URLs in database match the pattern
3. Check server logs for deletion errors
4. Run cleanup endpoint to remove orphaned files

### Storage Growing Over Time
1. Run cleanup endpoint periodically
2. Monitor stats endpoint for orphaned files
3. Check logs for failed deletions
