FROM odoo:17.0
USER root
COPY requirements.txt /tmp/requirements.txt
RUN pip3 install --no-cache-dir --break-system-packages -r /tmp/requirements.txt || pip3 install --no-cache-dir -r /tmp/requirements.txt
# The project root is the Odoo module "easy_store"
COPY . /mnt/extra-addons/easy_store
COPY odoo.conf /etc/odoo/odoo.conf
RUN chown -R odoo:odoo /mnt/extra-addons /etc/odoo/odoo.conf
USER odoo
