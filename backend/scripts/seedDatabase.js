import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

dotenv.config();

// Sample data based on mock data
const users = [
    {
        name: 'Admin User',
        email: 'admin@dreamdubai.com',
        password: 'admin123',
        role: 'Admin',
        phone: '+971 50 000 0000',
        isVerified: true,
        isActive: true,
    },
    {
        name: 'Ahmed Al Maktoum',
        email: 'ahmed@email.com',
        password: 'password123',
        phone: '+971 50 123 4567',
        role: 'User',
        isVerified: true,
        isActive: true,
        address: {
            street: 'Dubai Marina',
            city: 'Dubai',
            emirate: 'Dubai',
            country: 'UAE',
            zipCode: '00000',
        },
    },
    {
        name: 'Fatima Hassan',
        email: 'fatima@email.com',
        password: 'password123',
        phone: '+971 55 234 5678',
        role: 'User',
        isVerified: true,
        isActive: true,
        address: {
            street: 'Jumeirah Beach Road',
            city: 'Dubai',
            emirate: 'Dubai',
            country: 'UAE',
            zipCode: '00000',
        },
    },
];

const products = [
    {
        name: 'Premium Sports Leggings',
        category: 'Activewear',
        price: 180,
        stock: 45,
        status: 'active',
        images: [
            'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500',
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500',
        ],
        description: 'High-performance sports leggings with moisture-wicking fabric.',
        sku: 'ACT-001',
        colors: ['black', 'navy', 'gray'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
    },
    {
        name: 'Yoga Sports Bra Set',
        category: 'Activewear',
        price: 120,
        stock: 30,
        status: 'active',
        images: [
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500',
        ],
        description: 'Comfortable sports bra with matching shorts for yoga and fitness.',
        sku: 'ACT-002',
        colors: ['pink', 'purple', 'blue'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
    },
    {
        name: 'Elegant Evening Dress',
        category: 'Women',
        price: 450,
        stock: 20,
        status: 'active',
        images: [
            'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
        ],
        description: 'Sophisticated evening dress perfect for special occasions.',
        sku: 'WMN-003',
        colors: ['black', 'navy', 'red'],
        sizes: ['S', 'M', 'L', 'XL'],
    },
    {
        name: 'Casual Blouse Collection',
        category: 'Women',
        price: 95,
        stock: 50,
        status: 'active',
        images: [
            'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=500',
        ],
        description: 'Comfortable and stylish casual blouse for everyday wear.',
        sku: 'WMN-004',
        colors: ['white', 'beige', 'blue', 'pink'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
    },
    {
        name: 'Classic Men Shirt',
        category: 'Men',
        price: 150,
        stock: 35,
        status: 'active',
        images: [
            'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500',
        ],
        description: 'Classic formal shirt for business and casual wear.',
        sku: 'MEN-001',
        colors: ['white', 'blue', 'black'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
        name: 'Kids Summer Dress',
        category: 'Kids',
        price: 85,
        stock: 40,
        status: 'active',
        images: [
            'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500',
        ],
        description: 'Adorable summer dress for kids.',
        sku: 'KIDS-001',
        colors: ['pink', 'yellow', 'blue'],
        sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    },
    {
        name: 'Premium Notebook Set',
        category: 'Stationery',
        price: 45,
        stock: 100,
        status: 'active',
        images: [
            'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500',
        ],
        description: 'High-quality notebook set for office and school use.',
        sku: 'STAT-001',
        colors: [],
        sizes: [],
    },
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Drop the database to ensure clean state
        console.log('🗑️  Dropping database...');
        await mongoose.connection.dropDatabase();
        console.log('✅ Database dropped');        // Insert users
        console.log('👥 Creating users...');
        const createdUsers = await User.create(users);
        console.log(`✅ Created ${createdUsers.length} users`);

        // Insert products
        console.log('📦 Creating products...');
        const createdProducts = await Product.create(products);
        console.log(`✅ Created ${createdProducts.length} products`);

        // Create sample orders (one at a time to avoid duplicate orderNumber)
        console.log('🛒 Creating sample orders...');
        const order1 = await Order.create({
            user: createdUsers[1]._id,
            customerName: createdUsers[1].name,
            customerEmail: createdUsers[1].email,
            customerPhone: createdUsers[1].phone,
            items: [
                {
                    product: createdProducts[0]._id,
                    productId: createdProducts[0]._id.toString(),
                    name: createdProducts[0].name,
                    quantity: 2,
                    price: createdProducts[0].price,
                    image: createdProducts[0].images[0],
                },
            ],
            totalAmount: createdProducts[0].price * 2,
            status: 'Pending',
            paymentStatus: 'Paid',
            paymentMethod: 'Credit Card',
            shippingAddress: createdUsers[1].address,
        });

        const order2 = await Order.create({
            user: createdUsers[2]._id,
            customerName: createdUsers[2].name,
            customerEmail: createdUsers[2].email,
            customerPhone: createdUsers[2].phone,
            items: [
                {
                    product: createdProducts[2]._id,
                    productId: createdProducts[2]._id.toString(),
                    name: createdProducts[2].name,
                    quantity: 1,
                    price: createdProducts[2].price,
                    image: createdProducts[2].images[0],
                },
            ],
            totalAmount: createdProducts[2].price,
            status: 'Shipped',
            paymentStatus: 'Paid',
            paymentMethod: 'Apple Pay',
            shippingAddress: createdUsers[2].address,
        });

        console.log(`✅ Created 2 orders`); console.log('\n' + '='.repeat(50));
        console.log('🎉 Database seeded successfully!');
        console.log('='.repeat(50));
        console.log('\n📋 Default Admin Credentials:');
        console.log('   Email: admin@dreamdubai.com');
        console.log('   Password: admin123');
        console.log('\n⚠️  Remember to change these in production!\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
