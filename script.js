document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Audio Control & Card Sliding OUT of Envelope Logic
    // ----------------------------------------------------
    const envelopeOverlay = document.getElementById('envelopeOverlay');
    const envelopeContainer = document.getElementById('envelopeContainer');
    const sleeveFront = document.getElementById('sleeveFront');
    const openInvitationBtn = document.getElementById('openInvitationBtn');
    const bgMusic = document.getElementById('bgMusic');
    const musicToggleBtn = document.getElementById('musicToggleBtn');
    const musicIconPlay = document.getElementById('musicIconPlay');
    const musicWave = document.getElementById('musicWave');

    let isPlaying = false;

    function toggleMusic() {
        if (!bgMusic) return;
        if (isPlaying) {
            bgMusic.pause();
            isPlaying = false;
            musicIconPlay.classList.remove('hidden');
            musicWave.classList.add('hidden');
        } else {
            bgMusic.play().then(() => {
                isPlaying = true;
                musicIconPlay.classList.add('hidden');
                musicWave.classList.remove('hidden');
            }).catch(err => {
                console.log('Audio autoplay prevented or failed:', err);
            });
        }
    }

    function triggerEnvelopeOpening() {
        if (!envelopeContainer || envelopeContainer.classList.contains('stage-pull')) return;

        // Try to start music on user interaction
        toggleMusic();

        // Stage 1: Pull card partially out of envelope (600ms)
        envelopeContainer.classList.add('stage-pull');

        // Stage 2: Pull card fully out, sleeve sinks away (after 600ms)
        setTimeout(() => {
            envelopeContainer.classList.add('stage-out');
        }, 600);

        // Stage 3: Soft dissolve entire overlay into main content (after 1400ms)
        setTimeout(() => {
            envelopeOverlay.classList.add('dissolving');
        }, 1400);
    }

    if (openInvitationBtn) {
        openInvitationBtn.addEventListener('click', triggerEnvelopeOpening);
    }

    if (sleeveFront) {
        sleeveFront.addEventListener('click', triggerEnvelopeOpening);
    }

    if (musicToggleBtn) {
        musicToggleBtn.addEventListener('click', () => {
            toggleMusic();
        });
    }

    // ----------------------------------------------------
    // 2. Countdown Timer
    // Target: August 21, 2026 18:30:00 (UTC+3)
    // ----------------------------------------------------
    const targetDate = new Date('2026-08-21T18:30:00+03:00').getTime();

    const cdDays = document.getElementById('cd-days');
    const cdHours = document.getElementById('cd-hours');
    const cdMinutes = document.getElementById('cd-minutes');
    const cdSeconds = document.getElementById('cd-seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            if (cdDays) cdDays.innerText = '00';
            if (cdHours) cdHours.innerText = '00';
            if (cdMinutes) cdMinutes.innerText = '00';
            if (cdSeconds) cdSeconds.innerText = '00';
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (cdDays) cdDays.innerText = days < 10 ? '0' + days : days;
        if (cdHours) cdHours.innerText = hours < 10 ? '0' + hours : hours;
        if (cdMinutes) cdMinutes.innerText = minutes < 10 ? '0' + minutes : minutes;
        if (cdSeconds) cdSeconds.innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ----------------------------------------------------
    // 3. iCal (.ics) Download Generator
    // ----------------------------------------------------
    const downloadIcsBtn = document.getElementById('downloadIcsBtn');
    if (downloadIcsBtn) {
        downloadIcsBtn.addEventListener('click', () => {
            const icsData = [
                'BEGIN:VCALENDAR',
                'VERSION:2.0',
                'PRODID:-//Buse & Fatih Wedding//TR',
                'BEGIN:VEVENT',
                'UID:buse-fatih-dugun-20260821@wedding',
                'DTSTAMP:20260815T000000Z',
                'DTSTART:20260821T153000Z',
                'DTEND:20260821T210000Z',
                'SUMMARY:Buse & Fatih Düğünü',
                'DESCRIPTION:Buse & Fatih çiftinin düğün merasimine davetlisiniz.',
                'LOCATION:BY GARDEN DÜĞÜN SALONU\\, Sırelif Mevki\\, Kozan\\, Adana',
                'STATUS:CONFIRMED',
                'END:VEVENT',
                'END:VCALENDAR'
            ].join('\r\n');

            const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute('download', 'buse-fatih-dugun-davetiyesi.ics');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }



    // ----------------------------------------------------
    // 5. Floating Petals Particle Effect Generation
    // ----------------------------------------------------
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
        const petalCount = 15;
        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            
            const size = Math.random() * 12 + 10;
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
            
            petal.style.left = `${Math.random() * 100}%`;
            petal.style.animationDelay = `${Math.random() * 10}s`;
            petal.style.animationDuration = `${Math.random() * 6 + 8}s`;
            
            particlesContainer.appendChild(petal);
        }
    }
});
