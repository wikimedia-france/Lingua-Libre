**Lingua-Libre** ([LinguaLibre.fr](http://lingualibre.fr) – Massive Open Audio Recording) is an opensource platform and webapps created to ease mass recording of texts into clean, well cut, well named and apps friendly audio files. It is designed from the start to ease the creation of consistant datasets of audio files. We believe it is the best tool available to create dataset from few dozens to several thousands audios files. Recording productividy can reach up to 1000 audio recordings / hour, given a good words list and an experienced user. Lingua-Libre is funded by Wikimedia France and actively used by the Wikimedia community.

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

### History
- **Shtooka Recorder** (2010) by Nicolas Vion - a notable desktop software which had a deep impact on the open audio reccording ecosystems. Hundreds of applications use data produced by this software.
- **SWAC Recorder** (2013) by Nicolas Vion - a revamp of the earlier, less known but easier to install, with better user experience.
- **Lingua-Libre** (2016) by Nicolas Vion - a cloud variation of the earlier versions, the project was funded by Wikimedia France, and create with feedbacks from local linguistic academics. The grant is associated with the project to reccord and preserve dying French minorities languages, but can be used for all languages around the world, as well as to reccord the voice of your important love ones. The clean, sharp, net audiofiles outputed ease the creation of various derivated applications.

### Equipment (recommendation)
- Silent room / Recording studio
- 1 x [Scarlett2 Solo Studio Pack 2nd Generation](https://www.amazon.com/dp/B01E6T54E2/), comprising portable :
  - 1 x microphone
  - 1 x headset
  - 1 x external sound card
  - 1 x cables
- [Microphone's addons](https://www.amazon.com/dp/B01KHMUQ2M/) :
  - 1 x Pod / Arm stand
  - 1 x Anti-pop filter
  - 1 x Anti-vibration system
- 1 x personal PC -- mini-pc will do if your audio recording chain is external
- Internet connexion
Hardware cost : external audio equipments for US$250 + optional modest PC for US$300 = 250 ~ 550US$.

### Working process
1. Data gathering : prepare a text file with a list of words/sentences, one by line. 1000~1500 items per half day is fair.
2. Speaker : find a willing speaker
3. Facility : find a calm studio or room 
4. Installation : install the equipment
5. Settings: connect to LinguaLibre.fr's studio, edit the settings according to your needs
6. Recording : start your high quality massive audio recording.
7. Applications : be creative, invente your apps ! :D

### License
- GNU GENERAL PUBLIC LICENSE -- thanks to a Wikimedia-France's funding.
See also [authors](https://github.com/wikimedia-france/Lingua-Libre/blob/master/AUTHORS).
