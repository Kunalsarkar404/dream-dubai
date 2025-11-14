# Image Upload Implementation

## Overview
Product images are now stored in the server's file system with only file paths/URLs saved in the database. This replaces the previous approach of storing base64 encoded images directly in MongoDB.

## Backend Implementation

### 1. Multer Middleware (`backend/middleware/upload.js`)
- **Storage**: Disk storage at `/uploads/products/`
- **Filename Format**: `originalname-timestamp-randomstring.ext`
- **File Validation**: 
  - Only images (jpeg, jpg, png, gif, webp)
  - Max size: 5MB per file
  - Max files: 6 images per product
- **Exports**:
  - `uploadProductImages`: Array upload (max 6 files)
  - `uploadSingleImage`: Single file upload
  - `deleteFile(filePath)`: File cleanup helper

### 2. Upload Endpoint
- **Route**: `POST /api/products/upload`
- **Middleware**: `protect`, `authorize('Admin')`, `uploadProductImages`
- **Controller**: `uploadImages` returns array of image URLs
- **Response Format**: `{ images: ['/uploads/products/file1.jpg', ...] }`

### 3. Static File Serving
- **Path**: `/uploads` serves static files
- **Access**: Images accessible at `http://localhost:5000/uploads/products/filename.jpg`

### 4. Product Deletion
- **Enhancement**: `deleteProduct` now deletes associated image files from disk
- **Prevents**: Orphaned image files accumulating on server

## Frontend Implementation

### 1. State Management
Two separate state arrays for image handling:
```javascript
const [imageFiles, setImageFiles] = useState([]);      // File objects from input
const [imagePreviews, setImagePreviews] = useState(['']); // Preview URLs (blob: or server URLs)
```

### 2. Image Handling Functions

#### `handleImageChange(index, file)`
- Stores File object in `imageFiles[index]`
- Creates blob URL for preview and stores in `imagePreviews[index]`
- Syncs both arrays

#### `handleClearImage(index)`
- Clears image at specific index
- Keeps the input row visible

#### `handleAddImage()`
- Adds new image slot (max 6)

#### `handleRemoveImage(index)`
- Removes entire image row
- Removes from both `imageFiles` and `imagePreviews`

### 3. Form Submission Workflow

#### Add Product
```javascript
handleSubmitAdd() {
  1. Upload imageFiles to /api/products/upload
  2. Receive image URLs from server
  3. Create product with received URLs
  4. Reset form and image states
}
```

#### Edit Product
```javascript
handleSubmitEdit() {
  1. Upload new imageFiles to /api/products/upload
  2. Combine new URLs with existing imagePreviews (server URLs)
  3. Update product with final URL array
  4. Reset states
}
```

### 4. Modal Lifecycle
- **Open Add Modal**: Resets to `imageFiles=[]`, `imagePreviews=['']`
- **Open Edit Modal**: Loads existing product.images into `imagePreviews`
- **Close Modal**: Cleans up all states, revokes blob URLs

## File Structure
```
backend/
  ├── middleware/
  │   └── upload.js           (NEW - Multer configuration)
  ├── controllers/
  │   └── productController.js (MODIFIED - Added uploadImages, enhanced deleteProduct)
  ├── routes/
  │   └── productRoutes.js    (MODIFIED - Added upload route)
  └── uploads/
      └── products/           (NEW - Image storage directory)

admin/
  └── src/
      ├── services/
      │   └── api.js          (MODIFIED - Added uploadImages method)
      └── pages/
          └── Products.jsx    (MODIFIED - Complete image handling rewrite)
```

## Testing Checklist

### Add Product
- [ ] Upload 1-6 images
- [ ] Preview displays correctly
- [ ] Cancel (×) button clears image
- [ ] Add Image button works (max 6)
- [ ] Remove row button works
- [ ] Form submission uploads files
- [ ] Product created with server URLs
- [ ] Images display on products page

### Edit Product
- [ ] Existing images load in edit modal
- [ ] Can add new images
- [ ] Can remove existing images
- [ ] Mixed (old + new) images work
- [ ] Update saves correct URLs
- [ ] Images display after update

### Delete Product
- [ ] Product deleted from database
- [ ] Associated image files deleted from disk
- [ ] No orphaned files in /uploads/products/

### Error Handling
- [ ] Non-image file rejected
- [ ] File > 5MB rejected
- [ ] More than 6 images rejected
- [ ] Upload failure shows error message
- [ ] Network error handled gracefully

## API Endpoints

### Upload Images
```
POST /api/products/upload
Headers: Authorization: Bearer <token>
Content-Type: multipart/form-data
Body: FormData with 'images' field (array of files)

Response:
{
  "images": [
    "/uploads/products/image1-1234567890-abc.jpg",
    "/uploads/products/image2-1234567890-def.jpg"
  ]
}
```

### Create Product
```
POST /api/products
Body: {
  "name": "Product Name",
  "images": ["/uploads/products/image1.jpg", ...],
  ...other fields
}
```

### Update Product
```
PUT /api/products/:id
Body: {
  "images": ["/uploads/products/image1.jpg", ...],
  ...other fields
}
```

## Notes
- Images are served statically from `/uploads` endpoint
- File paths stored in database start with `/uploads/products/`
- Client-side previews use blob URLs temporarily
- Server URLs replace blob URLs after upload
- File cleanup on delete prevents disk bloat
- Max 6 images per product enforced at middleware level
