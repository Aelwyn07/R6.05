## R6.05 - Développement avancé

### Contexte

Ce projet vise à continuer ce que nous avons commencé en exercices en TP : le projet d'une filmothèque, ou des utilisateurs pourront accéder à une liste de films et les ajouter en favoris.

Également, des administrateurs auront des droits sur la bibliothèque de films : pouvoir en ajouter, en modifier et en supprimer.

Enfin, un service d'envoi de mails assurera l'envoi d'un mail de bienvenue aux nouveaux utilisateurs, mais aussi des notifications lors de l'ajout d'un nouveau film, ou de la modification d'un film que les utilisateurs possèderaient en favoris.

### Mise en place

Récupérer le projet

```
https://github.com/Aelwyn07/R6.05.git
```

Installation des dépendances (à effectuer à la racine du projet)

```
npm i
```

Pour le fonctionnement des mails : 

```
npm install nodemailer
```

Lancement du conteneur Docker : 

```
docker run -d --name hapi-mysql -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user -p 3307:3306 mysql:8.0 --default-authentication-plugin=mysql_native_password
```

Dans le fichier .env (à la racine du projet), définir les variables globales : 

```
MAIL_HOST='smtp.ethereal.email'
MAIL_PORT=587
MAIL_USER='kattie99@ethereal.email'
MAIL_PASS='M51E6wWv57NGStTuu8'
MAIL_FROM_USER="kattie99@ethereal.email"

DB_HOST='127.0.0.1'   
DB_USER='root'        
DB_PASSWORD='hapi'    
DB_DATABASE='user'    
DB_PORT=3333
```

Ces données sont bien spécifiques à chaque projet, attention a penser à les changer en fonction de votre contexte.

Effectuer les migrations (création de la base de données) : 
```
npx knex migrate:latest
```


Lancer le projet (à la racine du projet, dans iut-project) :

```
npm start
```

Vous pourrez alors vous rendre sur : 

  - http://localhost:3000/
  - http://localhost:3000/documentation  (la page de l'interface interactive proposée par Swagger, afin de tester les routes)

Note : l'installation de Node.js, Git, Docker, MySQL ainsi que Npm est recquise. 

Note 2 : la base de donénes tourne sur le port 3333 ici.

Note 3 : Pour accéder à la base de données depuis le terminal, une fois Docker lancé : 

```
docker exec -it hapi-mysql bash
```

Suivi de : 

```
mysql -u root -p
```
Ici, root peut varier en fonction de ce que vous définirez dans vos variables globales, de même pour le mot de passe qui vous sera ensuite demandé. Une fois cela entré, vous aurez accès à la base de données.
