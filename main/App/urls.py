from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('', views.home, name='Main Page'),
    path('signIn/', views.signIn, name='SignIn Page'),
    path('login/', views.log_in, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('mybooks/', views.mybook, name='My Books Page'),
    path('aboutUs/', views.aboutUs, name='About Us Page'),
    path('complains', views.complain, name='Complaints Page'),
    path('add', views.add, name='Add Page'),
    path('borrow/<int:id>/', views.borrow, name='Borrow Page'),
    path('ditials/<int:id>/', views.ditials, name='Detials Page'),
    path('edit_delete/<int:id>/', views.edit_delete, name='Edit_Delete Page'),
    path('delete/<int:id>/', views.Delete, name='Delete'),
    path('Return/<int:id>/', views.Return, name='Return')
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)