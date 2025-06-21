import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import uploadRoutes from './routes/uploadRoutes';
import encodeRoutes from './routes/encodeRoutes';
import decodeRoutes from './routes/decodeRoutes';
import shareRoutes from './routes/shareRoutes';
import deleteRoutes from './routes/deleteRoutes';

const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use('/api/upload', uploadRoutes);
app.use('/api/encode', encodeRoutes);
app.use('/api/decode', decodeRoutes);
app.use('/api/share', shareRoutes); 
app.use('/api/delete', deleteRoutes);

export default app;
