from django.shortcuts import redirect
from django.urls import reverse

class AuthRedirectMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # List of URLs that require authentication
        protected_urls = [
            '/Property_list/',
            '/Talk-To-Us/',
            '/Dashboard/',
            '/Blog/',
            '/Blog2/',
            '/Map/',
            '/Tasks/',
            '/Manage_Account/',
            '/Delete_account/',
            'View_profile/',
     
        ]

        # Check if the user is authenticated
        if request.path in protected_urls and not request.user.is_authenticated:
            return redirect(reverse('userauths:sign-in'))  # Replace 'login' with your login URL name

        response = self.get_response(request)
        return response
