from django.urls import path
from .views import zoom_auth_redirect, zoom_auth_callback

urlpatterns = [
    path('zoom/redirect/', zoom_auth_redirect, name='zoom-auth-redirect'),
    path('zoom/callback/', zoom_auth_callback, name='zoom-auth-callback'),
]