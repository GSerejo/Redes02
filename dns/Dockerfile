FROM ubuntu/bind9:latest
# Desabilita o IPv6 dentro do container
RUN echo 'options { ... };' > /etc/bind/named.conf.options && \
    sed -i '/options {/a \    listen-on-v6 { none; };\n    forwarders { 8.8.8.8; 8.8.4.4; };\n    forward only;' /etc/bind/named.conf.options
COPY named.conf.local /etc/bind/
COPY db.meutrabalho.com.br /etc/bind/zones/