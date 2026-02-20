'use strict';

(function () {
    var PDF_URL = 'alejnp_cv.pdf';

    var loading        = document.getElementById('loading');
    var viewer         = document.getElementById('pdf-viewer');
    var fallback       = document.getElementById('fallback');
    var inlineSentinel = document.getElementById('inline-fallback');
    var fab            = document.getElementById('fab');

    /* ── Mobile / inline-PDF detection ─────────────────────────
       iOS Safari and most Android browsers cannot render PDFs
       inline. Detect this early and skip straight to the download
       UI instead of showing a blank <object> for several seconds.
    ──────────────────────────────────────────────────────────── */
    function isMobileBrowser() {
        return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    function showFallback() {
        if (viewer)   viewer.style.display   = 'none';
        if (fallback) fallback.style.display = 'flex';
        if (loading)  loading.classList.add('hidden');
    }

    function hideLoading() {
        if (loading) loading.classList.add('hidden');
        showFab();
    }

    function showFab() {
        if (fab) fab.classList.add('visible');
    }

    /* ── Mobile: skip inline render entirely ───────────────── */
    if (isMobileBrowser()) {
        showFallback();
        return;
    }

    /* ── Desktop: hide loader once the page has fully loaded ── */
    // window 'load' is the most cross-browser-reliable signal that
    // the <object> has either rendered the PDF or given up.
    window.addEventListener('load', function () {
        hideLoading();
    });

    // Safety fallback: if 'load' never fires or stalls, give up
    // after 10 s so the spinner doesn't sit there forever.
    var safetyTimer = setTimeout(function () {
        hideLoading();
    }, 10000);

    window.addEventListener('load', function () {
        clearTimeout(safetyTimer);

        // Heuristic: the #inline-fallback div lives inside <object>.
        // It is only rendered (offsetParent !== null) when the browser
        // cannot display the PDF — i.e. it acted as fallback content.
        if (inlineSentinel && inlineSentinel.offsetParent !== null) {
            showFallback();
        }
    });

    /* ── Verify the PDF URL is reachable (network error guard) ─
       Catches 404s and other HTTP errors that the <object> element
       swallows silently.
    ──────────────────────────────────────────────────────────── */
    fetch(PDF_URL, { method: 'HEAD' })
        .then(function (res) {
            if (!res.ok) showFallback();
        })
        .catch(function () {
            showFallback();
        });
}());
