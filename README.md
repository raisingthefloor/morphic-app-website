# MorphicLiteWeb

Static web front end for

- Email Verification
- Password Reset
- (more features TBD)

# Developer Builds

Run docker-compose:

````
$ docker-compose up
````

Create an `.env` file to provide local values for the the following environmental variables:

- `SERVICE_URL` - The morphic api service
- `RECAPTCHA_KEY` - The client key to use when including recaptcha

# Password Reset URLs

When a user needs to start the password reset process, a link should send them to

````
http://localhost:5003/password/reset
````

To complete their reset, the resulting email should point them to

````
http://localhost:5003/password/reset#token=<resettoken>
````