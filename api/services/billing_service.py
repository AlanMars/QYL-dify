import os
import requests


class BillingService:
    base_url = os.environ.get('BILLING_API_URL', 'BILLING_API_URL')
    secret_key = os.environ.get('BILLING_API_SECRET_KEY', 'BILLING_API_SECRET_KEY')

    @classmethod
    def get_info(cls, tenant_id: str):
        params = {'tenant_id': tenant_id}

        # billing_info = cls._send_request('GET', '/subscription/info', params=params)

        billing_info_sandbox = {
            "enabled": True,
            "subscription": {
                "plan": "sandbox",
                "interval": ""
            },
            "members": {
                "size": 1,
                "limit": 1
            },
            "apps": {
                "size": 10,
                "limit": 10
            },
            "vector_space": {
                "size": 2.87,
                "limit": 5
            },
            "docs_processing": "standard",
            "can_replace_logo": False
        }

        billing_info_professional = {
            "enabled": True,
            "subscription": {
                "plan": "professional",
                "interval": "month"
            },
            "members": {
                "size": 2,
                "limit": 3
            },
            "apps": {
                "size": 9,
                "limit": 50
            },
            "vector_space": {
                "size": 2.87,
                "limit":200
            },
            "docs_processing": "standard",
            "can_replace_logo": True
        }

        billing_info_team = {
            "enabled": True,
            "subscription": {
                "plan": "team",
                "interval": "month"
            },
            "members": {
                "size": 2,
                "limit": 1000
            },
            "apps": {
                "size": 9,
                "limit": 1000
            },
            "vector_space": {
                "size": 2.87,
                "limit":5000
            },
            "docs_processing": "standard",
            "can_replace_logo": True
        }

        billing_info = billing_info_team
        
        return billing_info

    @classmethod
    def get_subscription(cls, plan: str,
                         interval: str,
                         prefilled_email: str = '',
                         tenant_id: str = ''):
        params = {
            'plan': plan,
            'interval': interval,
            'prefilled_email': prefilled_email,
            'tenant_id': tenant_id
        }
        return cls._send_request('GET', '/subscription/payment-link', params=params)

    @classmethod
    def get_model_provider_payment_link(cls,
                                        provider_name: str,
                                        tenant_id: str,
                                        account_id: str):
        params = {
            'provider_name': provider_name,
            'tenant_id': tenant_id,
            'account_id': account_id
        }
        return cls._send_request('GET', '/model-provider/payment-link', params=params)

    @classmethod
    def get_invoices(cls, prefilled_email: str = ''):
        params = {'prefilled_email': prefilled_email}
        return cls._send_request('GET', '/invoices', params=params)

    @classmethod
    def _send_request(cls, method, endpoint, json=None, params=None):
        headers = {
            "Content-Type": "application/json",
            "Billing-Api-Secret-Key": cls.secret_key
        }

        url = f"{cls.base_url}{endpoint}"
        response = requests.request(method, url, json=json, params=params, headers=headers)

        return response.json()
