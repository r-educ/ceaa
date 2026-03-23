# CEAA - Site vitrine

Site statique pour le Centre d'Enseignement Artisanal et Artistique de Kpalimé (CEAA)

## Structure

- `index.html` : page d'accueil (logo, hero, objectifs, formations, produits, CTA)
- `formations.html` : présentation détaillée des formations (cuisine, batik, couture, sculpture)
- `formateurs.html` : liste des formateurs et lien de retour
- `contact.html` : page de contact et formulaire
- `img/` : images locales (hero, directeurs, formations, produits)
- `styles.css` : styles globaux et responsive

## Objectifs

1. Présenter les productions du centre
2. Fidéliser les clients
3. Établir le contact avec des clients potentiels

## Lancement local

1. Ouvrir le dossier dans l'explorateur de fichiers
2. Double-cliquer sur `index.html`
3. Tester la navigation vers `formations.html` et `formateurs.html`

Optionnel : servir via un serveur local (recommandé pour tests navigation)

- Avec Python 3 :
  - `cd c:\Users\Senyo\Desktop\PROJETS\vitrine-ceaa`
  - `python -m http.server 8000`
  - ouvrir `http://localhost:8000`

## Déploiement GitHub Pages

1. Initialiser git (si nécessaire)
   - `git init`
   - `git add .`
   - `git commit -m "Initial commit site CEAA"`
2. Créer un dépôt GitHub et ajouter remote
   - `git remote add origin https://github.com/<votre-utilisateur>/vitrine-ceaa.git`
3. Pousser sur la branche main
   - `git push -u origin main`
4. Sur GitHub, aller dans Settings > Pages
   - Source : `main` (`/root`)
   - Enregistrer
5. L'URL apparaît sous `https://<votre-utilisateur>.github.io/vitrine-ceaa`.

## Améliorations possibles

- formulaire de contact (email, téléphone, message)
- plus d'images locales et textes détaillés
- galerie de réalisations et témoignages clients
- SEO, accessibilité, version multi-language
