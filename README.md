### LinguaLibre – Massive Open Audio Recording

**Lingua-Libre** ([LinguaLibre.fr](http://lingualibre.fr)) is an opensource platform and webapps created to ease mass recording of texts into clean, well cut, well named and apps friendly audio files. It is designed from the start to ease the creation of consistant datasets of audio files. We believe it is the best tool available to create dataset from few dozens to several thousands audios files. Recording productividy can reach up to 1000 audio recordings / hour, given a good words list and an experienced user. Lingua-Libre is funded by Wikimedia France and actively used by the Wikimedia community.

**History:** 
- **Shtooka Recorder** (2010) by Nicolas Vion - a notable desktop software which had a deep impact on the open audio reccording ecosystems. Hundreds of applications use data produced by this software.
- **SWAC Recorder** (2013) by Nicolas Vion - a revamp of the earlier, less known but easier to install, with better user experience.
- **Lingua-Libre** (2016) by Nicolas Vion - a cloud variation of the earlier versions, the project was funded by Wikimedia France, and create with feedbacks from local linguistic academics. The grant is associated with the project to reccord and preserve dying French minorities languages, but can be used for all languages around the world, as well as to reccord the voice of your important love ones. The clean, sharp, net audiofiles outputed ease the creation of various derivated applications.

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
- Nicolas Vion -- research & developments
- Rémy Gerbet -- project manangement, meetups, demos and training

### Thanks
- Wikimedia France, for funding
- The French community, for beta testing, feedbacks, supports, and developments

