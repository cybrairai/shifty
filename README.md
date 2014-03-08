# Shifty
## Install instructions

0. clone the repo with `git clone git@github.com:cybrairai/shifty.git
1. check if you have pip installed, otherwise install pip (ubuntu: `sudo apt-get install python-pip`)
2. run `pip install -e .` (maybe with sudo?) in the folder
3. run `./migrate.sh`
4. run `python manage.py runserver` to start the development web server

### Scss-files
Need SASS to generate css-files from scss
* `gem install sass --pre`

To genereate CSS the watcher script must run:
* `./watcher.sh`

### Dependencies
#### Bower
We use Bower (http://bower.io/) to install dependencies. Can be installed by:
```sudo npm install -g bower```

Then we need to fetch the dependencies:
1. Go to ```shifty/static``` in shell
2. Run ```bower install```

### Fixtures
To install fixtures:
* ```./manage.py loaddata shifts```
