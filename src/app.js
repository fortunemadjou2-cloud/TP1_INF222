const express        = require('express');
const cors           = require('cors');
const path           = require('path');
const swaggerUi      = require('swagger-ui-express');
const YAML           = require('yamljs');
const fs             = require('fs');

// Créer le dossier data s'il n'existe pas
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const app = express();

// ─── Middlewares globaux ──────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Documentation Swagger ────────────────────────────────────────────────────
const swaggerDoc = YAML.load(path.join(__dirname, 'config/swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// ─── Routes ───────────────────────────────────────────────────────────────────
const articlesRouter = require('./routes/articles');
app.use('/api/articles', articlesRouter);

// ─── Route racine ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  const base = `${req.protocol}://${req.get('host')}`;
  res.json({
    message   : '🚀 Blog API - INF222 TAF1',
    version   : '1.0.0',
    docs      : `${base}/api-docs`,
    endpoints : {
      articles : `${base}/api/articles`
    },
    local: {
      docs     : 'http://localhost:3000/api-docs',
      articles : 'http://localhost:3000/api/articles'
    };
  });
});

// ─── Gestion des routes inexistantes ─────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route "${req.method} ${req.path}" introuvable.` });
});

// ─── Démarrage du serveur ─────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📄 Documentation Swagger : http://localhost:${PORT}/api-docs\n`);
});

module.exports = app;
