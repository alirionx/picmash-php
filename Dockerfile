MAINTAINER Dr Daje
FROM debian:10

RUN apt update && apt install -y git php sqlite

WORKDIR /opt
RUN git clone https://github.com/alirionx/picmash-php.git

RUN chmod +x /opt/picmash-php/run_app.sh
CMD /opt/picmash-php/run_app.sh

