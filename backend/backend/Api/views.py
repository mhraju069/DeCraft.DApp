import random
from User.models import User
from rest_framework import status
from .utils import verify_signature
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken


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

class VerifySignature(APIView):
    
    def post(self, request):
        wallet = request.data.get("wallet")
        signature = request.data.get("signature")
        
        if not wallet or not signature:
            raise ValidationError("Wallet and signature are required")

        try:
            user = User.objects.get(wallet=wallet.lower())
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        is_valid_signature = verify_signature(wallet, signature, str(user.nonce))
        
        if is_valid_signature:
            refresh = RefreshToken.for_user(user)
            print("verified")
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'message': "Signature verified successfully",
            })
        
        return Response({"error": "Invalid signature"}, status=status.HTTP_400_BAD_REQUEST)
    
class UpdateUser(APIView):
    
    def post(self, request):
        wallet = request.data.get("wallet")
        if not wallet:
            raise ValidationError("Wallet address is required")
        
        try:
            user = User.objects.get(wallet=wallet.lower())
            user.name = request.data.get("name", user.name)
            user.email = request.data.get("email", user.email)
            user.role = request.data.get("role", user.role)
            user.save()
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({"message": "User updated successfully"}, status=status.HTTP_200_OK)
