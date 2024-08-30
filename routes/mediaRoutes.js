const express = require('express');
const Media = require('../models/Media');
const router = express.Router();

router.post('/media', async (req, res) => {
  try {
    const media = new Media(req.body);
    await media.save();
    res.status(201).send(media);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/media', async (req, res) => {
  try {
    const mediaItems = await Media.find();
    res.send(mediaItems);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/media/:id', async (req, res) => {
  try {
    const mediaItem = await Media.findById(req.params.id);
    if (!mediaItem) return res.status(404).send();
    res.send(mediaItem);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/media/:id', async (req, res) => {
  try {
    const mediaItem = await Media.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!mediaItem) return res.status(404).send();
    res.send(mediaItem);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/media/:id', async (req, res) => {
  try {
    const mediaItem = await Media.findByIdAndDelete(req.params.id);
    if (!mediaItem) return res.status(404).send();
    res.send(mediaItem);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
