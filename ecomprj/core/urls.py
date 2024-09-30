from django.urls import path
from core.views import *

app_name= "core"

urlpatterns = [
     path('', index_view, name='index'),
     path('about/', about_view, name='about'),
     path('contact/', contact_view, name='contact'),
     path('propertylist/', property_list_view, name='propertylist'),
     path('faqs/', faqs_view, name='faqs'),
     path('please/', please_view, name='please'),
     path('terms&condition/', terms_view, name='terms&condition'),
     path('privacypolicy/', privacypolicy_view, name='privacypolicy'),
     
     path('Property_list/', property_list2_view, name='property-list'),
     path('Talk-To-Us/', contact2_view, name='talktous'),
     path('Dashboard/', dashboard_view, name='dashboard'),
     path('Blog/', page_view, name='page'),
     path('Manage_Account/', manageacc_view, name='manageacc'),
     path('Map/', map_view, name='map'),
     path('Blog2/', page2_view, name='page2'),
     path('Tasks/', tasks_view, name='tasks'),
     
]
