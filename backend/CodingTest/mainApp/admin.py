from django.contrib import admin

# Register your models here.

# Import all models
from .models import *

# Add models to admin site
admin.site.register(Lecture)
admin.site.register(Question)
admin.site.register(Testcase)
admin.site.register(Code_Submitted)
admin.site.register(Code_Saved)
