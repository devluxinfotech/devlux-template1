document.addEventListener('DOMContentLoaded', function() {
    const discountModal = document.getElementById('discountModal');
    const closeModal = document.getElementById('closeModal');
    const COOLDOWN_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

    // Check if modal should be shown
    function checkModalCooldown() {
        const cooldownEnd = localStorage.getItem('modalCooldownEnd');
        
        // If no cooldown exists or cooldown has expired
        if (!cooldownEnd || Date.now() > parseInt(cooldownEnd)) {
            return true; // Show modal
        }
        return false; // Hide modal
    }

    // Show modal only if cooldown has expired
    if (checkModalCooldown()) {
        setTimeout(() => {
            discountModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }, 1000);
    }

    // Close modal and set new cooldown
    function closeModalHandler() {
        // Set cooldown to expire 10 minutes from now
        const cooldownEnd = Date.now() + COOLDOWN_DURATION;
        localStorage.setItem('modalCooldownEnd', cooldownEnd.toString());
        
        discountModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Close events
    closeModal.addEventListener('click', closeModalHandler);
    discountModal.addEventListener('click', (e) => {
        if (e.target === discountModal) closeModalHandler();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && discountModal.style.display === 'flex') {
            closeModalHandler();
        }
    });

    // Optional: Clear cooldown for testing
    // localStorage.removeItem('modalCooldownEnd');
});