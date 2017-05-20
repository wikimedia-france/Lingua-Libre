# Lingua-Libre 
[LinguaLibre.fr](http://lingualibre.fr) – Massive Open Audio Recording is an opensource platform and 
webapps created to ease mass recording of texts into clean, well cut, well named and apps friendly audio files. It is 
designed from the start to ease the creation of consistent datasets of audio files. We believe it is the best tool 
available to create dataset from few dozens to several thousands audios files. Recording productivity can reach up to 
1000 audio recordings / hour, given a clean words list and an experienced user. Lingua-Libre is funded by 
Wikimedia France and actively used by the Wikimedia community.

## Requirements

 - PHP 5.5
 - Composer 1.2
 - Symfony 1.5
 - MySQL 5 , one instance

## Install

In order to create a level playing field for development this project uses 
<a href="https://docs.docker.com/engine/installation/">docker</a> & 
<a href="https://docs.docker.com/compose/install/">docker-compose</a>, 
as well as <a href="https://getcomposer.org/">composer</a> for dependency management.

Run :
```
docker run -it --rm --user $(id -u):$(id -g) -v "$PWD":/app -v ~/.composer:/composer -w /app composer composer install
```

## Development
Run:

```
export UID && docker-compose up
```

The application should now be available in your browser at <a href="http://localhost:8000">http://localhost:8000</a>

### (Re-)Create Database
```
docker-compose exec app /code/bin/console doctrine:database:create --if-not-exists
docker-compose exec app /code/bin/console doctrine:schema:update --force
docker-compose exec app /code/bin/console doctrine:fixtures:load
```

### Build the Javascript files
```
make -C web/js common.js
```

## Hard dependencies

The following dependencies exist in the code and are yet to be addressed in the development environment or, 
at least, the README (e.g. required version).

* `yui-compressor` in <a href="https://github.com/wikimedia-france/Lingua-Libre/blob/master/web/js/Makefile#L15">`js/Makefile`</a>
* `oggenc` in <a href="https://github.com/wikimedia-france/Lingua-Libre/blob/master/src/AppBundle/Controller/ExportController.php#L60">`ExportController.php`</a>

## History
- **Shtooka Recorder** (2010) by Nicolas Vion - a notable desktop software which had a deep impact on the open audio reccording ecosystems. Hundreds of applications use data produced by this software.
- **SWAC Recorder** (2013) by Nicolas Vion - a revamp of the earlier, less known but easier to install, with better user experience.
- **Lingua-Libre** (2016) by Nicolas Vion - a cloud variation of the earlier versions, the project was funded by Wikimedia France, and create with feedbacks from local linguistic academics. The grant is associated with the project to reccord and preserve dying French minorities languages, but can be used for all languages around the world, as well as to reccord the voice of your important love ones. The clean, sharp, net audiofiles outputed ease the creation of various derivated applications.

### Functionalities
In order to provide very consistent, app-friendly files, the current functionality are :
- [x] easy usage without downlaod nor installation, via LinguaLibre.fr
- [x] speakers' profiles, with language, gender, age, origin and few other data recommended to us by linguists.
- [x] wordlist support
- [x] intuitive interface with audio curve went speaking
- [x] roll back capability
- [x] auto roll-back / do-again when saturation is detected
- [x] consistent cut before / after the said words
- [x] auto equalization for sound's level

Wishlist :
- [ ] batch download
- [ ] noise reduction (?)

## Equipment (recommendation)
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
- 1 x modest PC (audio recording chain is external)
- Internet connexion

**Cost** : US$250 for external audio equipments  + US$300 for optional PC  = 250 ~ 550US$.

## Working process
1. Data gathering : prepare a text file with a list of words/sentences, one by line.
2. Speaker : find a willing speaker
3. Facility : find a calm studio or room 
4. Hardware installation : install the equipment in the room so to work comfortably
5. Software settings: connect to LinguaLibre.fr's studio, edit the settings according to your needs
6. Recording : start your high quality massive audio recording. **1000~1500 items per half day** is fair.
7. Applications : be creative, invent your apps ! :D

<p align="center">
  <img  src="https://i.stack.imgur.com/873Fb.png" alt="Schematic image"/>
</p>

## License
- GNU GENERAL PUBLIC LICENSE -- thanks to a Wikimedia-France's funding.

See also [authors](https://github.com/wikimedia-france/Lingua-Libre/blob/master/AUTHORS).
