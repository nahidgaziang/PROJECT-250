import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedDatabase() {
    console.log('🌱 Starting Database Seeding Process...');

    // check if DB credentials are present
    if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD) {
        console.error('❌ Error: Missing Database Credentials in .env file.');
        console.error('   Please ensure DB_HOST, DB_USER, DB_PASSWORD, (and optional DB_PORT, DB_NAME) are set.');
        process.exit(1);
    }

    const config = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || 3306,
        multipleStatements: true, // Needed to run full schema files
        ssl: {
            rejectUnauthorized: false // Often needed for cloud DBs like TiDB/Aiven
        }
    };

    let connection;

    try {
        console.log(`🔌 Connecting to ${config.host}...`);
        connection = await mysql.createConnection(config);
        console.log('✅ Connected successfully!');

        // 1. Create Database if it doesn't exist (and we aren't forced to a specific one)
        // Note: Some free tiers restrict creating DBs, so we try specific DB or default
        const dbName = process.env.DB_NAME || 'readefy_db';
        
        console.log(`📂 Selecting/Creating database: ${dbName}...`);
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        await connection.query(`USE \`${dbName}\`;`);

        // 2. Read Schema Files
        const projectRoot = path.resolve(__dirname, '../../');
        const schemaPath = path.join(projectRoot, 'database', 'schema.sql');
        const chatSchemaPath = path.join(projectRoot, 'database', 'chat_schema.sql');

        console.log('📜 Reading schema files...');
        
        try {
            const schemaSql = await fs.readFile(schemaPath, 'utf8');
            console.log('   Running schema.sql...');
            await connection.query(schemaSql);
            console.log('   ✅ schema.sql executed.');
        } catch (err) {
            console.error('   ❌ Failed to run schema.sql:', err.message);
        }

        try {
            const chatSchemaSql = await fs.readFile(chatSchemaPath, 'utf8');
            console.log('   Running chat_schema.sql...');
            await connection.query(chatSchemaSql);
            console.log('   ✅ chat_schema.sql executed.');
        } catch (err) {
             console.error('   ❌ Failed to run chat_schema.sql:', err.message);
        }

        console.log('🎉 Database seeding completed successfully!');

    } catch (error) {
        console.error('❌ Fatal Error during seeding:', error);
    } finally {
        if (connection) {
            await connection.end();
            console.log('👋 Connection closed.');
        }
    }
}

seedDatabase();
