#!/bin/bash
python manage.py schemamigration shifty --auto
python manage.py migrate shifty