import express from 'express';
import HeroModel from '../models/HeroSection.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

router.post('/add', upload.single('image'), async (req, res) => {
    try {
        const { title, subtitle } = req.body;
        if (!title || !subtitle || !req.file)
            return res.status(400).json({ success: false, message: 'All fields are required' });

        const uploadResult = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
            { folder: 'hero' }
        );

        const newHero = new HeroModel({
            title,
            subtitle,
            image: uploadResult.secure_url,
        });

        await newHero.save();
        res.status(201).json({ success: true, message: 'Hero section added successfully', data: newHero });
    } catch (error) {
        console.error('Add Hero Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const heroSections = await HeroModel.find().sort({ _id: -1 });
        res.status(200).json({ success: true, data: heroSections });
    } catch (error) {
        console.error('Get Heroes Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const hero = await HeroModel.findById(req.params.id);
        if (!hero) return res.status(404).json({ success: false, message: 'Hero section not found' });
        res.status(200).json({ success: true, data: hero });
    } catch (error) {
        console.error('Get Hero Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const hero = await HeroModel.findById(req.params.id);
        if (!hero) return res.status(404).json({ success: false, message: 'Hero section not found' });

        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(
                `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
                { folder: 'hero' }
            );
            hero.image = uploadResult.secure_url;
        }

        if (req.body.title) hero.title = req.body.title;
        if (req.body.subtitle) hero.subtitle = req.body.subtitle;

        await hero.save();
        res.status(200).json({ success: true, message: 'Hero section updated successfully', data: hero });
    } catch (error) {
        console.error('Update Hero Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const hero = await HeroModel.findByIdAndDelete(req.params.id);
        if (!hero) return res.status(404).json({ success: false, message: 'Hero section not found' });

        res.status(200).json({ success: true, message: 'Hero section deleted successfully' });
    } catch (error) {
        console.error('Delete Hero Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

export default router;
