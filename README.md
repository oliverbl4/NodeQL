API Framework - Express(mongoose), GraphQL, MongoDB and Docker
----------------------------------------------------------

Reusable framework made with Express (Node.js), GraphQL and MongoDB as a database system.

It has implemented a User JWT authentication system, included in GraphQL requests and with a profile user check system to let you know if you're authenticated.

Three Docker-compose environments has been configured and linked between each others. They are:

1. Express environment: It creates a node system with the last version. Then it installs all the package.json dependencies, copy all the files to the working directory /app, open the port 3000 and run an 'npm start' to start the API in localhost:3000 (can be configured using a .env file).

2. MongoDB database: Will be created a mongo environment with the latest version and running in 27020. The volumes will be saved at the project directory in /data/db. The connection route to this container is --> mongodb://mongo:27020/mongodbgraphql

3. MongoDB Management: An administrator admin to manage and control the database. More info: https://hub.docker.com/r/mrvautin/adminmongo/


#### Attention! :exclamation:
* A .env file is needed with the following configuration:
<pre>
<code>
# secret for encryption of jwt signature
JWT_SECRET=your_jwt_secret
# number of rounds for Blowfish algorithm for hashing user password
BCRYPT_ROUNDS=12
# lifetime of the token (in seconds)
JWT_LIFETIME=86400
# algorithm used in token signing
JWT_ALGORITHM=HS256
</code>
</pre>
