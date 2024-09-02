import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

class CreateZoomMeeting(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        access_token = request.headers.get('Authorization').split(' ')[1]
        zoom_create_url = 'https://api.zoom.us/v2/users/me/meetings'
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json'
        }
        json_data = {
            "topic": request.data.get("topic", "Default Meeting"),
            "type": 2,  # 2 means scheduled meeting
            "start_time": request.data.get("start_time"),  # in UTC, format: "2024-09-30T15:00:00Z"
            "duration": request.data.get("duration", 30),  # duration in minutes
            "timezone": request.data.get("timezone", "UTC"),
            "agenda": request.data.get("agenda", "No specific agenda."),
        }
        response = requests.post(zoom_create_url, headers=headers, json=json_data)
        return Response(response.json(), status=response.status_code)

class GetZoomMeetings(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        access_token = request.headers.get('Authorization').split(' ')[1]
        zoom_create_url = 'https://api.zoom.us/v2/users/me/meetings'
        headers = {
            'Authorization': f'Bearer {access_token}'
        }
        response = requests.get(zoom_create_url, headers=headers)
        return Response(response.json(), status=response.status_code)

class UpdateZoomMeeting(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, meeting_id):
        access_token = request.headers.get('Authorization').split(' ')[1]
        zoom_update_url = f'https://api.zoom.us/v2/meetings/{meeting_id}'
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json'
        }
        json_data = {
            "topic": request.data.get("topic"),
            "start_time": request.data.get("start_time"),
            "duration": request.data.get("duration"),
            "agenda": request.data.get("agenda"),
        }
        response = requests.patch(zoom_update_url, headers=headers, json=json_data)
        return Response(response.json(), status=response.status_code)
    
class DeleteZoomMeeting(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, meeting_id):
        access_token = request.headers.get('Authorization').split(' ')[1]
        zoom_delete_url = f'https://api.zoom.us/v2/meetings/{meeting_id}'
        headers = {
            'Authorization': f'Bearer {access_token}'
        }
        response = requests.delete(zoom_delete_url, headers=headers)
        return Response(status=response.status_code)


