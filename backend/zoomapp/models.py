from django.db import models
from accounts.models import UserAccount  # Import your custom user model

class OAuthToken(models.Model):
    # user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)  # Change the reference to UserAccount
    access_token = models.TextField()
    refresh_token = models.TextField()
    expires_in = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)