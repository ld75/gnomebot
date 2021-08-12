#java -jar payara-micro-5.2021.5.jar --deploy ./target/gnomebot-1.0-SNAPSHOT --contextroot / --port 8081
#keytool -genseckey -alias gnomebot -keyalg AES -keysize 128 -storetype JCEKS -keystore gnomebot.jks
#keytool -genkeypair -v -alias gnomebot -validity 3650 -keystore gnomeboot.p12 -keysize 4096 -keyalg RSA -sigalg SHA1withRSA

java  -Djavax.net.ssl.trustStore=./ssl/gnomebot.p12 	-Djavax.net.ssl.trustStorePassword=gnomebot -jar payara-micro-5.193.jar --deploy ./target/gnomebot-1.0-SNAPSHOT --contextroot / --port 8081 --sslport 8082 --prebootcommandfile asadminpayara --sslcert gnomebot
