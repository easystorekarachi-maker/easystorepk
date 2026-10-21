# -*- coding: utf-8 -*-
{
    'name': 'Easy Store',
    'version': '17.0.1.0.0',
    'category': 'Website/Website',
    'summary': 'EasyStore-style storefront for Odoo Website + eCommerce (English / Urdu)',
    'description': """
EasyStore storefront for Odoo 17
===============================
* Branded header, promo bar and footer
* Homepage with hero, categories and Today's Deals
* Urdu product names (name_ur), deal flag and automatic discount percent
* Contact messages saved in the backend
* English and Urdu (RTL) translations
""",
    'author': 'EasyStore',
    'license': 'LGPL-3',
    'depends': ['website', 'website_sale', 'website_sale_wishlist'],
    'data': [
        'security/ir.model.access.csv',
        'views/layout.xml',
        'views/header.xml',
        'views/footer.xml',
        'views/homepage.xml',
        'views/product_templates.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'easy_store/static/src/css/easy_store.css',
            'easy_store/static/src/js/easy_store.js',
        ],
    },
    'installable': True,
    'application': False,
    'auto_install': False,
}
