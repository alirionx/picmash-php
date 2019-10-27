FROM debian:10

MAINTAINER Dr Daje

RUN apt update && apt install -y git sqlite3 php php-sqlite3

WORKDIR /opt
RUN git clone https://github.com/alirionx/picmash-php.git

RUN chmod +x /opt/picmash-php/run_app.sh
CMD /opt/picmash-php/run_app.sh
