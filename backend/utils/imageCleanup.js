import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/Product.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Clean up orphaned image files
 * Finds images in uploads/products that are not referenced by any product
 */
export const cleanupOrphanedImages = async () => {
    try {
        const uploadsDir = path.join(__dirname, '..', 'uploads', 'products');
        
        if (!fs.existsSync(uploadsDir)) {
            console.log('Uploads directory does not exist');
            return { removed: 0, errors: [] };
        }

        // Get all image files from uploads directory
        const files = fs.readdirSync(uploadsDir);
        
        // Get all products with their images
        const products = await Product.find({}, 'images');
        
        // Extract just the filenames from all product images
        const usedFilenames = new Set();
        products.forEach(product => {
            if (product.images && Array.isArray(product.images)) {
                product.images.forEach(imageUrl => {
                    // Extract filename from full URL
                    const filename = imageUrl.split('/').pop();
                    if (filename) {
                        usedFilenames.add(filename);
                    }
                });
            }
        });

        // Find orphaned files
        const orphanedFiles = files.filter(file => !usedFilenames.has(file));
        
        const errors = [];
        let removedCount = 0;

        // Delete orphaned files
        orphanedFiles.forEach(file => {
            try {
                const filePath = path.join(uploadsDir, file);
                fs.unlinkSync(filePath);
                removedCount++;
                console.log(`Deleted orphaned file: ${file}`);
            } catch (error) {
                console.error(`Error deleting file ${file}:`, error.message);
                errors.push({ file, error: error.message });
            }
        });

        return {
            totalFiles: files.length,
            usedFiles: usedFilenames.size,
            orphanedFiles: orphanedFiles.length,
            removed: removedCount,
            errors,
        };
    } catch (error) {
        console.error('Error in cleanup:', error);
        throw error;
    }
};

/**
 * Get statistics about image usage
 */
export const getImageStats = async () => {
    try {
        const uploadsDir = path.join(__dirname, '..', 'uploads', 'products');
        
        if (!fs.existsSync(uploadsDir)) {
            return {
                totalFiles: 0,
                totalSize: 0,
                usedFiles: 0,
                orphanedFiles: 0,
            };
        }

        const files = fs.readdirSync(uploadsDir);
        let totalSize = 0;

        files.forEach(file => {
            const filePath = path.join(uploadsDir, file);
            const stats = fs.statSync(filePath);
            totalSize += stats.size;
        });

        const products = await Product.find({}, 'images');
        const usedFilenames = new Set();
        products.forEach(product => {
            if (product.images && Array.isArray(product.images)) {
                product.images.forEach(imageUrl => {
                    const filename = imageUrl.split('/').pop();
                    if (filename) {
                        usedFilenames.add(filename);
                    }
                });
            }
        });

        return {
            totalFiles: files.length,
            totalSize: (totalSize / (1024 * 1024)).toFixed(2) + ' MB',
            usedFiles: usedFilenames.size,
            orphanedFiles: files.length - usedFilenames.size,
        };
    } catch (error) {
        console.error('Error getting stats:', error);
        throw error;
    }
};
