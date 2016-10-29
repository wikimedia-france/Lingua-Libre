# Lingua-Libre

Environnement de développement
==============================

Pré-requis
----------

 - PHP 5.5
 - Composer 1.2
 - Symfony 1.5
 - Une instance MySQL 5

Initialisation de l’environnement
---------------------------------

Lancer
```
composer install
php bin/console doctrine:database:create
php bin/console doctrine:schema:update --force
php bin/console doctrine:fixtures:load
```

Lancement de l’instance de développement
----------------------------------------

 - Lancer `php bin/console server:run`
