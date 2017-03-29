### LinguaLibre – Massive Open Audio Recording

**Lingua-Libre** ([LinguaLibre.fr](http://lingualibre.fr)) is an opensource, openlicense platform and webapps which boost mass recording of words or sentences into clean, well cut, well named audio files. It is perfect to create from small to large datasets of audio files. Lingua-Libre is funded and used by the Wikimedia community. 

**History:** 
- **Shtooka Recorder** by Nicolas - a desktop software notable which had a deep impact on the open audio reccording ecosystems. Hundreds of applications use data produced by this software.
- **SWAC Recorder** by Nicolas - a revamp of the earlier, less known but easier to install, with better user experience
- **Lingua-Libre** (2016) by Nicolas - a cloud variation of the earliers, the project was funded by Wikimedia France, and create with feedbacks from local linguistic academics. The grant is associated with the project to reccord and preserve dying French minorities languages, but can be used for all languages around the world, as well as to reccord the voice of your important love ones. The clean, sharp, net audiofiles outputed ease the creation of various derivated applications.

### Requirements

 - PHP 5.5
 - Composer 1.2
 - Symfony 1.5
 - MySQL 5 , one instance

### Install

Run :
```
composer install
php bin/console doctrine:database:create
php bin/console doctrine:schema:update --force
php bin/console doctrine:fixtures:load
```

### Development

Run :

```
php bin/console server:run
```

### License
Lingua-Libre was produced thanks to a Wikimedia-France's funding.

- GNU GENERAL PUBLIC LICENSE


### Humans
- Nicolas -- for developments
- Rémy -- for project manangement, meetups and training

