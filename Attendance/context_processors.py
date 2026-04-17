# context_processors.py

from django.core.cache import cache
from .models import GymNotification, Enrollment

def global_data(request):
    enrolled = False
    isStaff = False
    isSuperuser = False

    gym_notifications = cache.get("notifications")
    if gym_notifications is None:
        gym_notifications = list(
            GymNotification.objects.filter(is_active=True)
            .values("icon", "message")
        )
        cache.set("notifications", gym_notifications, timeout=3600)

    if request.user.is_authenticated:
        isStaff = request.user.is_staff
        isSuperuser = request.user.is_superuser

        enrolled = cache.get(f"enrolled_{request.user.id}")
        if enrolled is None:
            enrolled = Enrollment.objects.filter(user=request.user).exists()
            cache.set(f"enrolled_{request.user.id}", enrolled, timeout=300)

    return {
        "enrolled": enrolled,
        "isStaff": isStaff,
        "isSuperuser": isSuperuser,
        "gym_notifications": gym_notifications,
    }