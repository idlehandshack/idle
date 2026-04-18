document.addEventListener('DOMContentLoaded', () => {
    console.log('App loaded successfully');
    
    // Smooth scrolling & hover animations for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', (e) => {
            e.target.style.transform = 'translateY(-2px)';
        });
        btn.addEventListener('mouseleave', (e) => {
            e.target.style.transform = 'translateY(0)';
        });
    });

    // NOTE: Auth state handling (Login, Logout, Route guarding) 
    // has been delegated to Django backend via request.user 
    // and view decorators like @login_required.
});