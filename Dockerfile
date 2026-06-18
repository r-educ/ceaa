FROM nginx:alpine

# Copie des fichiers statiques du site dans le répertoire public de Nginx
COPY . /usr/share/nginx/html

# Exposition du port 80 pour le trafic web
EXPOSE 80

# Commande de démarrage par défaut de Nginx
CMD ["nginx", "-g", "daemon off;"]
