from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class MyUserManager(BaseUserManager):
    def create_user(self, wallet, password=None):
        if not wallet:
            raise ValueError("Users must have a wallet address")
        
        user = self.model(
            wallet=wallet.lower(),  
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, wallet, password=None):
        user = self.create_user(wallet=wallet,password=password)
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    wallet = models.CharField(verbose_name="wallet address",max_length=255,unique=True)
    name = models.CharField(verbose_name="name",max_length=255,blank=True,null=True)
    email = models.EmailField(verbose_name="email address",max_length=255,blank=True,null=True)
    nonce = models.IntegerField(max_length=256, blank=True,null=True)
    role = models.CharField(max_length=50, default='',blank=True,null=True)  # e.g., 'user', 'admin', etc.
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = "wallet"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.wallet
    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True
    @property
    def is_staff(self):
        return self.is_admin
