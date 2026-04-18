from django.urls import path, include
from Attendance import views

urlpatterns = [
    # Core Navigation (Names updated to match index.html)
    path('', views.homePage, name="index"), 
    path('contact/', views.contact, name="contact"),
    
    # Mapped 'classes' and 'membership' to your existing workout and enrollment views
    path('classes/', views.workout, name="classes"), 
    path('membership/', views.enrollment, name="membership"), 
    
    # Placeholders for missing template links (You will need to create these views)
    path('trial/', views.trialPage, name="trial"), 
    path('about/', views.aboutPage, name="about"), 
    
    # Authentication & User
    path('accounts/', include('django.contrib.auth.urls')),
    path('signup/', views.signupPage, name="signPage"),
    path('login/', views.loginPage, name='login'),
    path('logout/', views.handlelogout, name="logout"),
    path('profile/', views.Profile, name="profile"), # Changed to lowercase to match template
    
    # Attendance & API Endpoints
    
    path('attendence/', views.attendence, name="attendence"),
    path('api/mark-attendance/', views.mark_attendance_api),
    path('api/get-users/', views.get_users),
    path('api/upload-face-image/', views.upload_face_image),
    path('api/stats/', views.stats_api, name='stats_api'),
    path('api/save-embeddings-batch/', views.save_embeddings_batch, name='save-embeddings-batch'),
]