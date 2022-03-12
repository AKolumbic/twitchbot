import dotenv from 'dotenv';
import { configureClient } from './src/configure-client';

// Configure Environment Variables
dotenv.config();

// Configure TMI Client
configureClient();
