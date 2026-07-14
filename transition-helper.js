// transition-helper.js - Handles smooth page transitions across the birthday pages

(function() {
    // 1. Create and inject CSS for transition overlay
    const css = `
        .transition-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #feecea; /* Match body --color-pink background */
            z-index: 99999999;
            opacity: 1;
            visibility: visible;
            transition: opacity 0.5s ease, visibility 0.5s ease;
            pointer-events: none;
        }
        .transition-overlay.fade-out {
            opacity: 0;
            visibility: hidden;
        }
    `;

    const styleEl = document.createElement('style');
    styleEl.innerHTML = css;
    document.head.appendChild(styleEl);

    // 2. Create and inject overlay div as soon as document.body is ready
    const overlay = document.createElement('div');
    overlay.className = 'transition-overlay';

    if (document.body) {
        document.body.appendChild(overlay);
    } else {
        const observer = new MutationObserver((mutations, obs) => {
            if (document.body) {
                document.body.appendChild(overlay);
                obs.disconnect();
            }
        });
        observer.observe(document.documentElement, { childList: true, subtree: true });
    }

    // 3. Fade out overlay on page load complete
    window.addEventListener('load', () => {
        // A tiny delay to ensure initial layout calculations are done and smooth out stutters
        setTimeout(() => {
            overlay.classList.add('fade-out');
        }, 150);
    });

    // 4. Define global navigation function with fade-in effect
    window.navigateToPage = function(url) {
        overlay.classList.remove('fade-out');
        // Wait for the fade-in animation to complete before changing the URL
        setTimeout(() => {
            window.location.href = url;
        }, 500);
    };
})();
