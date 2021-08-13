#java -jar payara-micro-5.2021.5.jar --deploy ./target/gnomebot-1.0-SNAPSHOT --contextroot / --port 8081
#keytool -genseckey -alias gnomebot -keyalg AES -keysize 128 -storetype JCEKS -keystore gnomebot.jks
#keytool -genkeypair -v -alias gnomebot -validity 3650 -keystore gnomeboot.p12 -keysize 4096 -keyalg RSA -sigalg SHA1withRSA
openssl pkcs12 -in ssl/gnomebot.p12 -clcerts -nokeys -out ssl/gnomebotfullchain.pem
openssl pkcs12 -in ssl/gnomebot.p12 -out ssl/gnomebotprivkey.pem
#npm i npm ou npm install npm@latest -g
#sudo npm install pm2 -g
pm2 start ./src/app.js
#pm2 stop app
#pm2 delete app
pm2 logs
cp gnomebot.conf /etc/nginx/conf.d