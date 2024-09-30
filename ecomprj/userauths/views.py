from django.shortcuts import render
from userauths.forms import UserRegisterForm
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from django.shortcuts import redirect, render, get_object_or_404
from django.conf import settings
from .models import Profile
from userauths.models import User

# User = settings.AUTH_USER_MODEL


# Create your views here.
def register_view(request):
    
    if request.method == "POST":
        form = UserRegisterForm(request.POST or None)
        if form.is_valid():
            # try: 
                new_user = form.save()
                username = form.cleaned_data.get("username")
                messages.success(request, f"Hello {username}, account created successfully.")
                new_user = authenticate(username=form.cleaned_data['email'], 
                                        password=form.cleaned_data['password1'])
            
                print("user registered")
                login(request, new_user)
                return redirect("core:dashboard")
            # except UnboundLocalError:
            #     print("New user not found")
    else:
        print("User cannot be registered. ")
        form= UserRegisterForm()
    
    context = {
        'form': form,
    }
    return render(request, "userauths/sign-up.html", context)



def LoginView(request):
    if request.user.is_authenticated:
        messages.warning(request, f"You are already logged in.")
        return redirect("core:dashboard")
    
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
            
        try:
            # User = User.objects.get(email = email)
            User = authenticate(request, email = email, password = password)
            if User is not None:
                login(request, User) 
                messages.success(request, "Welcome Back. You are logged in.")
                return redirect("core:dashboard")
        
            else:
                messages.warning(request, "User does not exist, Create an account")
        except:
            messages.warning(request, f"User with {email} does not exist")
                            
        
        
    context ={
         
    }
    return render(request, "userauths/sign-in.html", context)


def logoutView(request):
    logout(request)
    messages.success(request, "You logged out!")

    return redirect("userauths:sign-in")

def delete_account(request):
    if request.method == "POST":
        user = request.user
        user.delete()
        messages.success(request, "Your account has been successfully deleted.")
        return redirect("core:index")
    return redirect("core:dashboard")

def view_profile(request):
    user = request.user  # Get the currently logged-in user
    context = {
        'user': user
    }
    return render(request, 'core/viewprofile.html', context)


def edit_profile(request):
    user = request.user
    profile, created = Profile.objects.get_or_create(user=user)  # Get or create the profile

    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        # Update the user object
        if username:
            user.username = username
        if email:
            user.email = email
        if password:  # Only change password if provided
            user.set_password(password)

        user.save()  # Save user first to avoid integrity error

        # Handle profile picture upload
        if request.FILES.get('profile_picture'):
            profile_picture = request.FILES['profile_picture']
            if not profile_picture.name.endswith(('.png', '.jpg', '.jpeg')):
                messages.error(request, "Invalid file type. Please upload a JPEG or PNG image.")
                return redirect('userauths:edit_profile')

            profile.profile_picture = profile_picture

        profile.save()  # Save the profile

        messages.success(request, "Profile updated successfully.")
        return redirect('userauths:view_profile')

    return render(request, 'userauths/manageacc.html', {'user': user, 'profile': profile})

def dashboard_view(request):
    # Fetch the user's profile
    profile = Profile.objects.get(user=request.user)
    return render(request, 'partials/base2.html', {'profile': profile})
