#keytool -genseckey -alias gnomebot -keyalg AES -keysize 128 -storetype JCEKS -keystore gnomebot.jks
#keytool -genkeypair -v -alias gnomebot -validity 3650 -keystore gnomeboot.p12 -keysize 4096 -keyalg RSA -sigalg SHA1withRSA
#openssl pkcs12 -in ssl/gnomebot.p12 -clcerts -nokeys -out ssl/gnomebotfullchain.pem
#openssl pkcs12 -in ssl/gnomebot.p12 -out ssl/gnomebotprivkey.pem
docker-compose up