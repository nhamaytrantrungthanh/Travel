import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';

// In-memory data store for the CMS
let settings = {
  siteName: 'WorldClass',
  heroHeading: 'Discover the World with WorldClass',
  heroSubheading: 'Premium international travel experiences tailored for you.',
  themeColor: '#1e3a8a', // blue-900
  accentColor: '#d97706', // amber-600
  fontHeading: 'Playfair Display',
  fontBody: 'Inter',
};

let destinations = [
  {
    id: '1',
    title: 'Santorini, Greece',
    description: 'Experience the breathtaking sunsets and iconic blue-domed churches.',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a3217365?auto=format&fit=crop&w=800&q=80',
    price: '$2,499',
    duration: '7 Days',
    region: 'Europe',
  },
  {
    id: '2',
    title: 'Kyoto, Japan',
    description: 'Immerse yourself in ancient traditions, stunning temples, and beautiful gardens.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    price: '$3,299',
    duration: '10 Days',
    region: 'Asia',
  },
  {
    id: '3',
    title: 'Serengeti, Tanzania',
    description: 'Witness the great migration and incredible wildlife on a luxury safari.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    price: '$4,599',
    duration: '8 Days',
    region: 'Africa',
  },
];

let posts = [
  {
    id: '1',
    title: 'Top 10 Hidden Gems in Europe',
    excerpt: 'Discover the lesser-known but equally stunning destinations across Europe.',
    content: 'Full content goes here...',
    date: '2023-10-15',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'How to Pack for a 2-Week Safari',
    excerpt: 'Everything you need to know to pack smart and light for your African adventure.',
    content: 'Full content goes here...',
    date: '2023-11-02',
    image: 'https://images.unsplash.com/photo-1547471080-7cb2acd47223?auto=format&fit=crop&w=800&q=80',
  },
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/settings', (req, res) => {
    res.json(settings);
  });

  app.put('/api/settings', (req, res) => {
    settings = { ...settings, ...req.body };
    res.json(settings);
  });

  app.get('/api/destinations', (req, res) => {
    res.json(destinations);
  });

  app.post('/api/destinations', (req, res) => {
    const newDest = { id: Date.now().toString(), ...req.body };
    destinations.push(newDest);
    res.status(201).json(newDest);
  });

  app.put('/api/destinations/:id', (req, res) => {
    const index = destinations.findIndex((d) => d.id === req.params.id);
    if (index !== -1) {
      destinations[index] = { ...destinations[index], ...req.body };
      res.json(destinations[index]);
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  });

  app.delete('/api/destinations/:id', (req, res) => {
    destinations = destinations.filter((d) => d.id !== req.params.id);
    res.status(204).send();
  });

  app.get('/api/posts', (req, res) => {
    res.json(posts);
  });

  app.post('/api/posts', (req, res) => {
    const newPost = { id: Date.now().toString(), date: new Date().toISOString().split('T')[0], ...req.body };
    posts.push(newPost);
    res.status(201).json(newPost);
  });

  app.put('/api/posts/:id', (req, res) => {
    const index = posts.findIndex((p) => p.id === req.params.id);
    if (index !== -1) {
      posts[index] = { ...posts[index], ...req.body };
      res.json(posts[index]);
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  });

  app.delete('/api/posts/:id', (req, res) => {
    posts = posts.filter((p) => p.id !== req.params.id);
    res.status(204).send();
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
