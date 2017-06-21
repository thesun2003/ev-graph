# EV-Graph
Electro Vehicle (EV) Statistics in NZ with prediction, graphics and some analytics.

Technical implementation:
- Frontend
	* React/JS
- API
	* Slim/PHP

---
Apache Host Setup example:

```apache
<VirtualHost *:80>

  DocumentRoot /var/www/ev-graph/frontend/build/
  <Directory /var/www/ev-graph/frontend/build/>
    Require all granted
    php_flag engine Off
  </Directory>

  Alias /api/ "/var/www/ev-graph/api/public/"
  <Directory /var/www/ev-graph/api/public/>
    Options FollowSymLinks
    AllowOverride All
    Require all granted
  </Directory>

  Alias /static/ "/var/www/ev-graph/frontend/build/static/"
  <Directory /var/www/ev-graph/frontend/build/static/>
    Require all granted
    php_flag engine Off
  </Directory>

</VirtualHost>

```
