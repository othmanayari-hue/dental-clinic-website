# Cabinet Dentaire Ayari — Web

Application Next.js du Dr Mohamed Ayari. Le code source est dans `mohamed-ayari-dentist-web-/dental-clinic/`.

## Prérequis

- [Node.js](https://nodejs.org/) 20 LTS ou plus récent
- [MySQL](https://dev.mysql.com/downloads/) (local, XAMPP, Docker, etc.)

## Démarrage rapide (VS Code)

Ouvrez le dossier `C:\Users\othma\IdeaProjects\web` dans VS Code, puis dans le terminal intégré :

```powershell
# 1. Variables d'environnement (Prisma lit `.env`, Next.js aussi)
Copy-Item "mohamed-ayari-dentist-web-\.env.example" "mohamed-ayari-dentist-web-\dental-clinic\.env"
# Éditez dental-clinic\.env : mettez votre mot de passe MySQL dans DATABASE_URL

# 2. Installer les dépendances (depuis la racine web)
npm install

# 3. Créer la base et les tables
npm run db:generate
npm run db:push
npm run db:seed

# 4. Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

### Lancer depuis VS Code (sans taper les commandes)

- **Terminal → Run Task → `npm: dev`**  
- ou **F5** (configuration « Next.js: dev »)

## Compte admin par défaut (après seed)

| Champ | Valeur |
|-------|--------|
| Email | `admin@ayari-dentiste.tn` |
| Mot de passe | `Admin@2024!` |

## Structure

```
web/                          ← ouvrir ce dossier dans VS Code
├── package.json              ← scripts npm (pointent vers dental-clinic)
├── .vscode/                  ← tâches et débogage
└── mohamed-ayari-dentist-web-/
    ├── .env.example
    └── dental-clinic/        ← application Next.js + Prisma
```

## Dépannage

| Erreur | Solution |
|--------|----------|
| `Could not read package.json` à la racine | Utilisez ce dossier `web` (ce README), pas un parent vide. |
| `DATABASE_URL` / connexion MySQL | Vérifiez MySQL démarré et l’URL dans `.env.local`. |
| `prisma generate` échoue | `npm run db:generate` depuis la racine `web`. |
