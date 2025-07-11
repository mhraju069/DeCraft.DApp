from django.contrib import admin
from .models import User
# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ('wallet', 'is_active', 'is_admin')
    list_filter = ('wallet','is_active', 'is_admin')
admin.site.register(User, UserAdmin)