from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def index_view(request):
    return render(request,'core/index.html')
def about_view(request):
    return render(request, 'core/about.html')
def contact_view(request):
    return render(request, 'core/contact.html')
def property_list_view(request):
    return render(request, 'core/propertylist.html')
def faqs_view(request):
    return render(request, 'core/faqs.html')
def terms_view(request):
    return render(request, 'core/terms&condition.html')
def privacypolicy_view(request):
    return render(request, 'core/privacypolicy.html')
def please_view(request):
    return render(request, 'core/please.html')

def property_list2_view(request):
    return render(request, 'core/property-list.html')
def page_view(request):
    return render(request, 'core/page.html')
def manageacc_view(request):
    return render(request, 'core/manageacc.html')
def map_view(request):
    return render(request, 'core/map.html')
def page2_view(request):
    return render(request, 'core/page2.html')
def contact2_view(request):
    return render(request, 'core/talktous.html')
def dashboard_view(request):
    return render(request, 'core/dashboard.html')
def tasks_view(request):
    return render(request, 'core/tasks.html')
def cart_view(request):
    return render(request, 'core/cart.html')
def advertise_view(request):
    return render(request, 'core/advertise.html')