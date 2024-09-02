import base64
import requests
import datetime
from django.http import JsonResponse, HttpResponseRedirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from ..models import OAuthToken
import os
from rest_framework.permissions import AllowAny
from django.shortcuts import redirect

class ZoomAuthRedirect(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        auth_url = f"https://zoom.us/oauth/authorize?client_id={os.environ.get('ZOOM_CLIENT_ID')}&response_type=code&redirect_uri={os.environ.get('ZOOM_REDIRECT_URI')}"
        return HttpResponseRedirect(auth_url)

class ZoomAuthCallback(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        code = request.query_params.get('code')
        if not code:
            return Response({'error': 'Authorization code not found'}, status=status.HTTP_400_BAD_REQUEST)

        token_url = "https://zoom.us/oauth/token"
        credentials = f"{os.environ.get('ZOOM_CLIENT_ID')}:{os.environ.get('ZOOM_CLIENT_SECRET')}"
        encoded_credentials = base64.b64encode(credentials.encode()).decode('utf-8')

        headers = {
            'Authorization': f"Basic {encoded_credentials}",
            'Content-Type': "application/x-www-form-urlencoded"
        }
        data = {
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': os.environ.get('ZOOM_REDIRECT_URI'),
        }
        response = requests.post(token_url, headers=headers, data=data)

        if response.status_code == 200:
            token_data = response.json()
            expires_in = timezone.now() + datetime.timedelta(seconds=token_data['expires_in'])

            OAuthToken.objects.create(
                access_token=token_data['access_token'],
                refresh_token=token_data['refresh_token'],
                expires_in=expires_in
            )
            return redirect(f'http://localhost:3000/zoom-auth-success?access_token={token_data["access_token"]}')
            # user = request.user if request.user.is_authenticated else None
            # if user:
            #     OAuthToken.objects.create(
            #         user=user,
            #         access_token=token_data['access_token'],
            #         refresh_token=token_data['refresh_token'],
            #         expires_in=expires_in
            #     )
            #     return Response(token_data)
            # else:
            #     return Response({'error': 'User must be authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'error': 'Failed to exchange code for tokens', 'details': response.json()}, status=response.status_code)

