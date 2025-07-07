from django.urls import path
from .views import *

urlpatterns = [
    path('nonce/', NonceView.as_view(), name='nonce'),
    path('verify-signature/', VerifySignature.as_view(), name='verify-signature'),
]
