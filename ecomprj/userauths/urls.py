from django.urls import path
from userauths import views
from django.contrib.auth import views as auth_views

from django.conf import settings
from django.conf.urls.static import static

app_name = "userauths"

urlpatterns = [
     path("sign-up/", views.register_view, name="sign-up"),
     path("sign-in/", views.LoginView, name="sign-in"),
     path("sign-out/", views.logoutView, name="sign-out"),
     
     path('password_reset/', 
          auth_views.PasswordResetView.as_view(template_name='password_reset_form.html'), 
          name='password_reset'
          ),
     path('password_reset/done/', 
          auth_views.PasswordResetDoneView.as_view(template_name='password_reset_done.html'), 
          name='password_reset_done'
          ),
     path('change_password/<uidb64>/<token>/', 
          auth_views.PasswordResetConfirmView.as_view(template_name='password_reset_confirm.html'), 
          name='password_reset_confirm'
          ),
     path('password_reset_complete/', 
          auth_views.PasswordResetCompleteView.as_view(template_name='password_reset_complete.html'), 
          name='password_reset_complete'
          ),

     path('Delete_account/', views.delete_account, name='delete_account'),
     path('view_profile/', views.view_profile, name='view_profile'),
     path('Edit_profile/', views.edit_profile, name='edit_profile'),
     
     path('add_to_cart/', views.add_to_cart, name='add_to_cart'),
    path('cart/', views.cart_view, name='cart'),
    path('remove_from_cart/<str:item_id>/', views.remove_from_cart, name='remove_from_cart'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
