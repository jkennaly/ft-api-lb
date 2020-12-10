Festigram API
===

Make your festival better

## Running Festigram locally

### Install multipass

...Starting from multipass instance login...

### Install software node
1. Add the ppa and install node
        $ curl -sL https://deb.nodesource.com/setup_13.x -o nodesource_setup.sh
        $ sudo bash nodesource_setup.sh
        $ sudo apt install nodejs
    (Say yes when prompted to confirm the installation)
2. Verify that node was installed
        $ node -v
        v13.14.0
3. Verify that npm was installed
        $ npm -v
        6.14.4

### Install and configure database
4. Install the database server
        $ sudo apt install mysql-server
5. Log into the database server as root
        $ sudo mysql
    This should give a `mysql>` prompt
6. Create a user to run the database. This will create a database and user named festigram, with a password of festigram
        mysql> create database festigram;
        mysql> create user 'festigram'@'localhost' identified WITH mysql_native_password by 'festigram';
        mysql> grant all privileges on festigram.* TO 'festigram'@'localhost';
        mysql> flush privileges;
7. Exit mysql
        mysql> quit
        Bye
        $

### Download and set up the project files
1. From inside the multipass instance
        git clone https://github.com/0441design/ft-api-lb.git
        cd ft-api-lb/
        npm install
