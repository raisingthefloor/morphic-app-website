#!/bin/sh

cat > $WWWDIR/settings.js <<EOL
window.MorphicSettings = {
    serviceURL: "${SERVICE_URL-http://localhost:5002/}",
    recaptchaKey: "${RECAPTCHA_KEY}",
    windowsDownloadURL: "${MORPHIC_WINDOWS_DOWNLOAD_URL}",
    macDownloadURL: "${MORPHIC_MAC_DOWNLOAD_URL}"
};
EOL

cat $WWWDIR/settings.js
envsubst '$MORPHIC_WINDOWS_APPCAST_URL' < /MorphicLiteWeb/config/nginx.conf > /MorphicLiteWeb/config/nginx.conf.subst
mv /MorphicLiteWeb/config/nginx.conf.subst /MorphicLiteWeb/config/nginx.conf

nginx -p /MorphicLiteWeb -c config/nginx.conf -g "daemon off;"
