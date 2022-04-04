from odoo import models
import requests

class Chat(models.Model):
  _name = 'mesocials.chat'

  def find_customers_with_last_message(self, args):
    url = 'http://172.16.88.126:5000/customer/find-by-channels-and-states'
    r = requests.post(url, json={
        'cloudAgentId': 1,
        'cloudTenantId': 135,
        'applicationIds': args['applicationIds'],
        'pageSize': args['pageSize'],
        'currentPage': args['currentPage'],
        'channels': args['channels'],
        'conversationStates': args['conversationStates'],
      }, headers={
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })

    return r.json()['data']