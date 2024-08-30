from django.shortcuts import render
import base64
import requests
from django.http import HttpResponseRedirect, JsonResponse
from django.conf import settings

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .helper import create_auth_signature, create_zoom_meeting
from datetime import datetime
from rest_framework import status

from .zoom_service import ZoomService

def zoom_auth_redirect(request):
    """ Redirects users to Zoom OAuth URL """
    # https://zoom.us/oauth/authorize?client_id=eEVuo18aSEO1K3phwZ7ew&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fapi%2Fzoom%2Fcallback
    # auth_url = f"https://zoom.us/oauth/authorize?response_type=code&client_id={settings.ZOOM_CLIENT_ID}&redirect_uri={settings.ZOOM_REDIRECT_URI}&scope=user:read:admin user:write:admin"
    auth_url = f"https://zoom.us/oauth/authorize?client_id={settings.ZOOM_CLIENT_ID}&response_type=code&redirect_uri={settings.ZOOM_REDIRECT_URI}"
    return HttpResponseRedirect(auth_url)

# http://localhost:8000/api/zoom/callback/?code=r19KMyzNPzAv33JCDaaRyOg2TDcPavRHg
def zoom_auth_callback(request):
    code = request.GET.get('code')
    if code:
        token_url = "https://zoom.us/oauth/token"
        redirect_uri = settings.ZOOM_REDIRECT_URI
        credentials = f"{settings.ZOOM_CLIENT_ID}:{settings.ZOOM_CLIENT_SECRET}"
        encoded_credentials = base64.b64encode(credentials.encode()).decode('utf-8')  # Encode client_id and client_secret

        headers = {
            'Authorization': f"Basic {encoded_credentials}",
            'Content-Type': "application/x-www-form-urlencoded"
        }

        data = {
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': redirect_uri,
        }

        response = requests.post(token_url, headers=headers, data=data)
        print('--- response: ', response, ' ', response.json(), '---')

        if response.status_code == 200:
            access_token = response.json().get('access_token')
            refresh_token = response.json().get('refresh_token')
            expires_in = response.json().get('expires_in')
            return JsonResponse({
                'access_token': access_token,
                'refresh_token': refresh_token,
                'expires_in': expires_in
            })
        else:
            return JsonResponse({'error': 'Failed to exchange code for tokens', 'details': response.json()}, status=response.status_code)
    else:
        return JsonResponse({'error': 'Authorization code not found'}, status=400)
    