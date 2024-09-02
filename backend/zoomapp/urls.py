from django.urls import path

from .views.zoom_auth_views import ZoomAuthRedirect, ZoomAuthCallback
from .views.zoom_meeting_views import CreateZoomMeeting, GetZoomMeetings, UpdateZoomMeeting, DeleteZoomMeeting

urlpatterns = [
    path('redirect/', ZoomAuthRedirect.as_view(), name='zoom-auth-redirect'),
    path('callback/', ZoomAuthCallback.as_view(), name='zoom-auth-callback'),
    path('meetings/create/', CreateZoomMeeting.as_view(), name='create-meeting'),
    path('meetings/', GetZoomMeetings.as_view(), name='get-meetings'),
    path('meetings/update/<int:meeting_id>/', UpdateZoomMeeting.as_view(), name='update-meeting'),
    path('meetings/delete/<int:meeting_id>/', DeleteZoomMeeting.as_view(), name='delete-meeting'),
]