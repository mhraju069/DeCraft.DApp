from django.urls import path
from .views import *

urlpatterns = [
    path('nonce/', NonceView.as_view(), name='nonce'),
    path('update-user/', UpdateUser.as_view(), name='update-user'),
    path('verify-signature/', VerifySignature.as_view(), name='verify-signature'),
]
