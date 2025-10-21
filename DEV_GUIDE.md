# Guide de Développement - ComfyUI Browser

## 🎯 Configuration Actuelle

Votre fork est maintenant installé et configuré pour le développement !

### Remotes Git

```bash
origin   -> https://github.com/smallchindryad/comfyui-browser.git (votre fork)
upstream -> https://github.com/talesofai/comfyui-browser.git (repo original)
```

## 🚀 Workflow de Développement

### 1. Créer une Nouvelle Feature

```bash
cd /home/projects/ComfyUI/custom_nodes/comfyui-browser

# Sync avec upstream avant de commencer
git checkout main
git fetch upstream
git merge upstream/main
git push origin main

# Créer une branche pour votre feature
git checkout -b feature/nom-de-votre-feature
# Exemples:
# - feature/add-model-tags
# - feature/improve-search
# - fix/video-preview-bug
```

### 2. Développement Backend (Python)

**Structure des fichiers:**
- `__init__.py` - Point d'entrée, enregistrement des routes
- `routes/` - Routes API (files, collections, sources, etc.)
- `nodes/` - Custom nodes ComfyUI
- `utils.py` - Fonctions utilitaires

**Modifier le backend:**
```bash
# Éditer les fichiers Python
vim routes/files.py  # ou votre éditeur préféré

# Redémarrer ComfyUI pour voir les changements
cd /home/projects/ComfyUI
python main.py --enable-cors-header
```

### 3. Développement Frontend (Svelte)

**Structure:**
- `svelte/src/` - Code source Svelte/TypeScript
- `svelte/package.json` - Dépendances Node.js
- `web/build/` - Build compilé (ne pas éditer directement)
- `web/index.js` - Integration avec ComfyUI

**Développement en mode watch:**

```bash
# Terminal 1: Backend ComfyUI
cd /home/projects/ComfyUI
python main.py --enable-cors-header

# Terminal 2: Frontend dev server (avec hot reload)
cd /home/projects/ComfyUI/custom_nodes/comfyui-browser/svelte
npm run dev

# Accès dev: http://localhost:5173/?comfyUrl=http://localhost:8188
```

**Build pour production:**
```bash
cd /home/projects/ComfyUI/custom_nodes/comfyui-browser/svelte
npm run build

# Le build génère web/build/ qui est servi par ComfyUI
```

### 4. Tester vos Modifications

**Backend:**
- Redémarrer ComfyUI
- Tester via l'UI ou avec curl/Postman

**Frontend:**
- Mode dev: changements en temps réel
- Mode prod: rebuild + redémarrer ComfyUI

### 5. Commit et Push

```bash
cd /home/projects/ComfyUI/custom_nodes/comfyui-browser

# Vérifier les changements
git status
git diff

# Ajouter les fichiers (IMPORTANT: build frontend avant!)
cd svelte && npm run build && cd ..
git add .

# Commit avec message descriptif (en anglais)
git commit -m "Add: description courte

- Détail 1 des changements
- Détail 2 des changements
- Fixes #ISSUE_NUMBER (si applicable)"

# Push vers votre fork
git push origin feature/nom-de-votre-feature
```

### 6. Créer une Pull Request

1. Aller sur https://github.com/smallchindryad/comfyui-browser
2. Cliquer "Compare & pull request"
3. Sélectionner:
   - **Base repository:** talesofai/comfyui-browser
   - **Base:** main
   - **Head repository:** smallchindryad/comfyui-browser
   - **Compare:** feature/nom-de-votre-feature
4. Remplir la description de la PR
5. Soumettre !

## 📁 Structure du Projet

```
comfyui-browser/
├── __init__.py              # Point d'entrée, routes, nodes
├── utils.py                 # Helpers (paths, git, config)
├── requirements.txt         # Dépendances Python
│
├── routes/                  # API Backend (aiohttp)
│   ├── files.py             # CRUD fichiers
│   ├── collections.py       # Gestion collections
│   ├── sources.py           # Sources Git
│   ├── downloads.py         # Téléchargements
│   ├── config.py            # Configuration
│   └── xyz_plot.py          # Stats XYZ Plot
│
├── nodes/                   # Custom Nodes ComfyUI
│   ├── select_inputs.py
│   ├── xyz_plot.py
│   ├── load_image_by_url.py
│   ├── dify_text_generator.py
│   └── upload_to_remote.py
│
├── web/                     # Frontend (compilé)
│   ├── index.js             # Integration ComfyUI
│   └── build/               # Svelte compilé (généré)
│
└── svelte/                  # Frontend (source)
    ├── src/                 # Code Svelte/TS
    ├── package.json         # Dépendances
    └── vite.config.ts       # Config build
```

## 🔧 Commandes Utiles

### Git

```bash
# Voir l'état actuel
git status
git log --oneline -10

# Sync avec upstream
git fetch upstream
git merge upstream/main

# Annuler des changements
git restore fichier.py
git reset --hard HEAD

# Lister les branches
git branch -a
```

### NPM (Frontend)

```bash
cd svelte

# Installer deps
npm install

# Dev server (hot reload)
npm run dev

# Build production
npm run build

# Vérifier les vulnérabilités
npm audit
npm audit fix
```

### Python (Backend)

```bash
# Vérifier les imports
cd /home/projects/ComfyUI/custom_nodes/comfyui-browser
python -c "import routes.files; print('OK')"

# Tester un module
python -m pytest tests/  # si tests existent
```

## 🐛 Debug

### Backend
- Logs dans le terminal ComfyUI
- Ajouter des `print()` dans le code Python
- Utiliser `logging` module pour des logs propres

### Frontend
- Console du navigateur (F12)
- Network tab pour voir les requêtes API
- Vite dev server montre les erreurs en temps réel

## 📝 Bonnes Pratiques

### Messages de Commit

```bash
# Format: Type: Description courte

# Types:
# - Add: nouvelle fonctionnalité
# - Fix: correction de bug
# - Update: amélioration existante
# - Refactor: restructuration code
# - Docs: documentation
# - Style: formatage, cosmétique

# Exemples:
git commit -m "Add: search by model name in outputs tab"
git commit -m "Fix: video preview not working on Safari"
git commit -m "Update: improve file loading performance"
```

### Code Style

**Python:**
- Suivre PEP 8
- Utiliser des noms descriptifs
- Ajouter des docstrings pour les fonctions complexes

**JavaScript/TypeScript:**
- Suivre le style existant du projet
- Utiliser Prettier (si configuré)

## 🎓 Exemples de Modifications

### Exemple 1: Ajouter une Route API

```python
# routes/my_feature.py
from aiohttp import web

async def api_my_new_route(request):
    data = await request.json()
    # Votre logique ici
    return web.json_response({"status": "success"})
```

```python
# __init__.py
from .routes import my_feature

browser_app.add_routes([
    # ...
    web.post("/my-feature", my_feature.api_my_new_route),
])
```

### Exemple 2: Modifier l'UI

```bash
# Éditer le frontend
cd svelte/src/routes/
# Modifier les fichiers .svelte

# Tester en dev
cd ..
npm run dev

# Build pour production
npm run build
```

## 🆘 Besoin d'Aide ?

- **Issues upstream:** https://github.com/talesofai/comfyui-browser/issues
- **README original:** Voir README.md
- **Code existant:** Regarder les PRs mergées pour des exemples

## ✨ Prochaines Étapes

1. Explorer le code existant
2. Identifier une amélioration à faire
3. Créer une branche de développement
4. Développer et tester
5. Créer une PR

Bon développement ! 🚀
