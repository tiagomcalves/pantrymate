from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from family.models import MembroFamilia
from userprofiles.models import Profile
from userprofiles.serializers import ProfileSerializer

"""
    **************************************
    Account session management views first
    **************************************
"""

@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if not username or not password:
        return Response({'msg': 'invalid username/password'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(username=username).exists():
        return Response({'msg': 'username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    return Response({'msg': 'user ' + user.username + ' created'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def login_view(request):
    if request.method != 'POST':
        Response(status=status.HTTP_400_BAD_REQUEST)

    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)  # Criação da sessão
        return Response({'msg': 'user logged in'}, status=status.HTTP_200_OK)
    else:
        return Response({'msg': 'invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def logout_view(request):
    logout(request)
    return Response({'msg': 'user logged out'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_view(request):
    profile, _ = Profile.objects.get_or_create(user=request.user)
    serializer = ProfileSerializer(profile)
    return Response(serializer.data)


"""
    ***********************************
    Other account/profile related views
    ***********************************
"""