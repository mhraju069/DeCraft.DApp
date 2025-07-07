import random
from User.models import User
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

# Create your views here.


class NonceView(APIView):
    
    def post(self,request):
        wallet = request.data.get("wallet")
        if not wallet:
            raise  ValidationError("Wallet address is required")
        nonce = random.randint(100000,999999)
        user,created = User.objects.get_or_create(wallet=wallet.lower())
        user.nonce = nonce
        user.save()
        if created:
           return Response({'is_new_user': True,'nonce': nonce}, status=status.HTTP_200_OK)
        return Response({'is_new_user': False,'nonce': nonce}, status=status.HTTP_200_OK)
