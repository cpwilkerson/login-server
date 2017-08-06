# login-server
Web app login screen

Generic login screen for web-apps

Uses Node/Express based web server that uses ReactJS, Redux, JSON Web Tokens.

The idea is that this little server will act as a front door to other apps by
providing a way to create a JWT to authenticate.

Once the user has successfully logged in, this server will redirect to a the
main page of another server.

This is intended to be part of a micro-services architecture.
