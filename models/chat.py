from odoo import models
import requests


class Chat(models.Model):
    _name = 'mesocials.chat'

    baseUrl = 'https://uat-crm.gmarket24h.com/channel-manager'

    def find_customers_with_last_message(self, args):
        url = self.baseUrl + '/customer/find-by-channels-and-states'
        r = requests.post(url, json={
            'cloudTenantId': 4,
            # 'applicationIds': args['applicationIds'],
            'applicationIds': ["108717091450300", "1818300178909749291", "2428970580446024137"],
            'pageSize': args['pageSize'],
            'currentPage': args['currentPage'],
            'channels': ['FB_MESSAGE', 'ZL_MESSAGE'],
            # 'conversationStates': args['conversationStates'],
            'conversationStates': ['OPEN', 'INTERACTIVE', 'CLOSE']
        }, headers={
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })

        return r.json()['data']

    def find_conversations_by_sender(self, args):
        url = self.baseUrl + '/message/find-by-sender'
        r = requests.post(url, json={
            'cloudTenantId': 4,
            'pageSize': args['pageSize'],
            'currentPage': args['currentPage'],
            'senderId': args['senderId']
        }, headers={
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })

        return r.json()

    def pick_conversation(self, args):
        url = self.baseUrl + '/conversation/pick'
        r = requests.post(url, json={
            'cloudTenantId': 4,
            'cloudAgentId': 69,
            'conversationId': args['conversationId']
        }, headers={
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })

        return r.json()

    def send_message(self, args):
        url = self.baseUrl + '/message/receive'
        r = requests.post(url, json={
            'messageType': 'TEXT',
            'text': args['text'],
            'cloudTenantId': 4,
            'cloudAgentId': 69,
            'conversationId': args['conversationId']
        }, headers={
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })

        return r.json()

    def close_conversation(self, args):
        url = self.baseUrl + '/conversation/close'
        r = requests.post(url, json={
            'cloudAgentId': 69,
            'conversationId': args['conversationId']
        }, headers={
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })

        return r.json()