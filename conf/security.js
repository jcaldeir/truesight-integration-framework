//conf/security.js
    module.exports = {
       	
		//Secure Server config variables
		//opensslPath: '/../security/openssl/bin/openssl',		
		generateCertificateCommand: '/security/openssl/bin/openssl req -x509 -newkey rsa:2048 -keyout ./server/engine/security/keystore/key.pem -out ./server/engine/security/keystore/cert.pem -days 1000 -subj "/C=PT/ST=Lisbon/L=Lisbon/O=BMC/OU=SC/CN=localhost" -nodes',
		opensslConfig: '/security/openssl/share/openssl.cnf',
		certPath: '/security/keystore/cert.pem',
		keyPath: '/security/keystore/key.pem'
		
    };
