FROM ubuntu/bind9:latest

# Copia a configuração da nossa zona
COPY named.conf.local /etc/bind/

# Copia o arquivo da nossa zona
COPY db.meutrabalho.com.br /etc/bind/zones/

# Copia o arquivo de opções corrigido
COPY named.conf.options /etc/bind/named.conf.options