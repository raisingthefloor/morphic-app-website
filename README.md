# MorphicLiteWeb

Static web front end for

- Password Reset
- (more features TBD)

# Developer Builds

First, copy `settings/development.js` to `www/settings.js` and adjust as needed for your
local setup.

Next, build the docker image

````
$ docker build -t morphicliteweb .
````

Finally, run the docker image, mounting your local `www` folder so you don't have
to rebuild the image each time you make a change
````
$ docker run \
    --rm \
    --name morphicliteweb \
    -p 5003:80 \
    --mount type=bind,source=`pwd`/www,target=/MorphicLiteWeb/www \
    morphicliteweb:latest
````

# Password Reset URLs

When a user needs to start the password reset process, a link should send them to

````
<host>/password/reset
````

To complete their reset, the resulting email should point them to

````
<host>/password/reset#token=<resettoken>
````