# zoom_service.py
import requests

class ZoomService:
    BASE_URL = 'https://api.zoom.us/v2/'
    API_KEY = 'B38sVvNtQiGnJf6YOtTKGg'
    API_SECRET = '5cWxzAHCKpsBpJSTClOkdUO0yZwoMCXl'

    def __init__(self):
        self.auth_header = {
            'Authorization': f'Bearer {self._generate_jwt()}',
            'Content-Type': 'application/json'
        }

    def _generate_jwt(self):
        import jwt
        import time
        payload = {
            'iss': self.API_KEY,
            'exp': time.time() + 3600
        }
        return jwt.encode(payload, self.API_SECRET, algorithm='HS256')

    def create_meeting(self, topic, start_time, duration):
        url = f'{self.BASE_URL}users/me/meetings'
        data = {
            'topic': topic,
            'type': 2,
            'start_time': start_time,
            'duration': duration,
            'timezone': 'UTC'
        }
        response = requests.post(url, json=data, headers=self.auth_header)
        return response.json()
