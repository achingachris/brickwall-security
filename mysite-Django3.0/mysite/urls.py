from django.contrib import admin
# add include to django.urls model imported
#  The include() function allows referencing other URLconfs.
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('polls/', include('polls.urls')),
]
