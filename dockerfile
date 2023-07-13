# Utilisez une image de base Python appropriée
FROM python:3.10.11

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie le fichier requirements.txt dans le conteneur
COPY requirements.txt .

# Installe les dépendances du projet
RUN pip install --no-cache-dir -r requirements.txt

# Copie le reste des fichiers du projet dans le conteneur
COPY . .

# Expose le port sur lequel l'application Django s'exécute
EXPOSE 8000

# Définit les variables d'environnement
ENV DJANGO_SETTINGS_MODULE=AdventureWorks.settings

# Exécute la commande pour démarrer l'application Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
