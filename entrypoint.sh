#!/bin/sh

cat > $WWWDIR/settings.js <<EOL
window.MorphicSettings = {
    serviceURL: "${SERVICE_URL-http://localhost:5002/}",
    recaptchaKey: "${RECAPTCHA_KEY}"
};
EOL

cat $WWWDIR/settings.js

nginx -p /MorphicLiteWeb -c config/nginx.conf -g "daemon off;"
