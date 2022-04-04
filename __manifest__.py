{
    'name': 'Mesocials',
    'version': '0.0.1',
    'category': 'Productivity',
    'sequence': 1,
    'summary': 'Chat, mail gateway and private channels',
    'description': "",
    'depends': ['base', 'bus'],
    'data': [
      "views/social_channel.xml",
      "views/social_menu.xml",
    ],
    
    'installable': True,
    'application': True,
    'assets': {
      'web.assets_backend': [
        'mesocials/static/src/components/*/*.js',
        'mesocials/static/src/widgets/*/*.js',
      ],
      'web.assets_backend_prod_only': [
        'mesocials/static/src/main.js'
      ],
      'web.assets_qweb': [
          'mesocials/static/src/xml/*.xml',
          'mesocials/static/src/components/*/*.xml',
          'mesocials/static/src/widgets/*/*.xml',
      ]
    },
    'license': 'LGPL-3',
}
