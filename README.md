# MorphicLiteWeb

Static web front end for

- Password Reset
- (more features TBD)

# Developer Builds

First, copy `settings/development.js` to `www/settings.js` and adjust as needed for your
local setup.

Next, run docker-compose:

````
$ docker-compose up
````

# Password Reset URLs

When a user needs to start the password reset process, a link should send them to

````
http://localhost:5003/password/reset
````

To complete their reset, the resulting email should point them to

````
http://localhost:5003/password/reset#token=<resettoken>
````