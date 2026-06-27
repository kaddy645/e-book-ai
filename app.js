/* ========================================
   E-Book Reader Application
   ======================================== */

(function () {
    'use strict';

    // ── Configuration ──────────────────────────────────────
    const CHAPTERS = [
        { file: 'chapters/chapter-1.md', title: 'What is Artificial Intelligence?', num: 1 },
        { file: 'chapters/chapter-2.md', title: 'How Machines Learn', num: 2 },
        { file: 'chapters/chapter-3.md', title: 'Large Language Models (LLMs)', num: 3 },
        { file: 'chapters/chapter-4.md', title: 'Neural Networks — The Brain Behind AI', num: 4 },
        { file: 'chapters/chapter-5.md', title: 'Transformer Architecture & Attention Mechanism', num: 5 },
        { file: 'chapters/chapter-6.md', title: 'Fine-Tuning and Prompt Engineering', num: 6 },
        { file: 'chapters/chapter-7.md', title: 'Vectors, Vector Databases, and RAG', num: 7 },
        { file: 'chapters/chapter-8.md', title: 'Agents and Tool Use', num: 8 },
        { file: 'chapters/chapter-9.md', title: 'The Ethics, Risks, and Future of AI', num: 9 },
        { file: 'chapters/chapter-10.md', title: 'Tokenization — How AI Reads Text', num: 10 },
        { file: 'chapters/chapter-11.md', title: 'Self-Supervised Learning — The Secret to Scale', num: 11 },
        { file: 'chapters/chapter-12.md', title: 'Reinforcement Learning with Human Feedback (RLHF)', num: 12 },
        { file: 'chapters/chapter-13.md', title: 'Few-Shot Prompting — Teaching by Example', num: 13 },
        { file: 'chapters/chapter-14.md', title: 'Chain of Thought Reasoning', num: 14 },
        { file: 'chapters/chapter-15.md', title: 'Model Context Protocol (MCP)', num: 15 },
        { file: 'chapters/chapter-16.md', title: 'Context Engineering', num: 16 },
        { file: 'chapters/chapter-17.md', title: 'Foundation Models vs. Small Language Models', num: 17 },
        { file: 'chapters/chapter-18.md', title: 'Distillation — Compressing Intelligence', num: 18 },
        { file: 'chapters/chapter-19.md', title: 'Quantization — Making Models Fit', num: 19 },
        { file: 'chapters/chapter-20.md', title: 'Multimodal Models', num: 20 },
        { file: 'chapters/chapter-21.md', title: 'The Stack, Assembled', num: 21 },
    ];

    const FONT_SIZES = ['font-small', '', 'font-large', 'font-xlarge'];
    const STORAGE_KEY = 'ebook-reader-state';

    // ── State ──────────────────────────────────────────────
    let state = {
        currentChapter: 0,
        theme: 'light',
        fontSize: 1, // index into FONT_SIZES
        bookmarks: [],
    };

    // ── DOM References ─────────────────────────────────────
    const $ = (sel) => document.querySelector(sel);
    const dom = {
        loadingScreen: $('#loading-screen'),
        book: $('#book'),
        pageLeftContent: $('#page-left-content'),
        pageRightContent: $('#page-right-content'),
        pageLeftNumber: $('#page-left-number'),
        pageRightNumber: $('#page-right-number'),
        pageFlip: $('#page-flip'),
        prevBtn: $('#prev-btn'),
        nextBtn: $('#next-btn'),
        progressBar: $('#progress-bar'),
        progressText: $('#progress-text'),
        themeToggle: $('#theme-toggle'),
        themeSun: $('#theme-icon-sun'),
        themeMoon: $('#theme-icon-moon'),
        tocToggle: $('#toc-toggle'),
        tocSidebar: $('#toc-sidebar'),
        tocClose: $('#toc-close'),
        tocList: $('#toc-list'),
        tocOverlay: $('#toc-overlay'),
        fontIncrease: $('#font-increase'),
        fontDecrease: $('#font-decrease'),
        fullscreenToggle: $('#fullscreen-toggle'),
        bookmarkToast: $('#bookmark-toast'),
    };

    // ── Markdown cache ─────────────────────────────────────
    const chapterCache = new Map();

    // ── Persistence ────────────────────────────────────────
    function saveState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) { /* storage full or unavailable */ }
    }

    function loadState() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                state = { ...state, ...parsed };
            }
        } catch (e) { /* corrupted storage */ }
    }

    // ── Fetch & Render Markdown ────────────────────────────
    async function fetchChapter(index) {
        if (chapterCache.has(index)) return chapterCache.get(index);

        const chapter = CHAPTERS[index];
        if (!chapter) return '<p>Chapter not found.</p>';

        try {
            const response = await fetch(chapter.file);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const md = await response.text();
            const html = marked.parse(md);
            chapterCache.set(index, html);
            return html;
        } catch (err) {
            console.error(`Failed to load ${chapter.file}:`, err);
            return `<h1>Chapter ${chapter.num}</h1><p>Unable to load this chapter. Please check your connection and try again.</p>`;
        }
    }

    // ── Render Pages ───────────────────────────────────────
    async function renderChapter(index, direction = 'none') {
        if (index < 0 || index >= CHAPTERS.length) return;

        const isAnimating = direction !== 'none';

        // Trigger page flip animation
        if (isAnimating) {
            dom.pageFlip.className = 'page-flip';
            // Force reflow
            void dom.pageFlip.offsetWidth;
            dom.pageFlip.classList.add(
                direction === 'forward' ? 'flipping-forward' : 'flipping-backward'
            );
        }

        // Fetch content
        const [currentHtml, prevHtml] = await Promise.all([
            fetchChapter(index),
            index > 0 ? fetchChapter(index - 1) : Promise.resolve(null),
        ]);

        // Update after a delay if animating, immediately otherwise
        const updateContent = () => {
            // Right page: current chapter
            dom.pageRightContent.innerHTML = currentHtml;
            dom.pageRightContent.scrollTop = 0;
            dom.pageRightContent.className = 'page-content' + (isAnimating ? ' fade-in' : '');

            // Left page: previous chapter (end) or decorative
            if (prevHtml) {
                dom.pageLeftContent.innerHTML = prevHtml;
                // Scroll to bottom of left page
                requestAnimationFrame(() => {
                    dom.pageLeftContent.scrollTop = dom.pageLeftContent.scrollHeight;
                });
            } else {
                dom.pageLeftContent.innerHTML = renderTitlePage();
            }

            // Page numbers
            dom.pageLeftNumber.textContent = index > 0 ? `— ${index * 2} —` : '';
            dom.pageRightNumber.textContent = `— ${index * 2 + 1} —`;

            // Update state
            state.currentChapter = index;
            saveState();
            updateNavigation();
            updateTocActive();

            // Clear animation
            setTimeout(() => {
                dom.pageFlip.className = 'page-flip';
            }, 100);
        };

        if (isAnimating) {
            setTimeout(updateContent, 300);
        } else {
            updateContent();
        }
    }

    function renderTitlePage() {
        return `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;text-align:center;padding:40px 20px;">
                <div style="width:60px;height:2px;background:var(--accent);margin-bottom:30px;"></div>
                <h1 style="font-family:'Playfair Display',serif;font-size:1.9rem;font-weight:700;color:var(--heading);margin-bottom:8px;border:none;padding:0;">
                    Understanding AI
                </h1>
                <p style="font-family:'Crimson Pro',serif;font-style:italic;color:var(--text-secondary);font-size:1.1rem;margin:12px 0 20px;">
                    From Basics to the Frontier
                </p>
                <div style="width:40px;height:1px;background:var(--border);margin-bottom:20px;"></div>
                <p style="font-family:'Crimson Pro',serif;color:var(--text-secondary);font-size:0.8rem;letter-spacing:0.1em;line-height:1.8;">
                    A plain-language guide to<br>Artificial Intelligence, LLMs,<br>and the technology shaping our future
                </p>
                <div style="width:60px;height:2px;background:var(--accent);margin-top:30px;"></div>
            </div>
        `;
    }

    // ── Navigation ─────────────────────────────────────────
    function updateNavigation() {
        const i = state.currentChapter;
        dom.prevBtn.disabled = i <= 0;
        dom.nextBtn.disabled = i >= CHAPTERS.length - 1;

        const progress = ((i + 1) / CHAPTERS.length) * 100;
        dom.progressBar.style.setProperty('--progress', `${progress}%`);
        dom.progressText.textContent = `Chapter ${i + 1} of ${CHAPTERS.length}`;
    }

    function goToChapter(index, direction) {
        if (index < 0 || index >= CHAPTERS.length) return;
        if (!direction) {
            direction = index > state.currentChapter ? 'forward' : 'backward';
        }
        renderChapter(index, direction);
    }

    // ── Table of Contents ──────────────────────────────────
    function buildToc() {
        dom.tocList.innerHTML = '';
        CHAPTERS.forEach((ch, i) => {
            const item = document.createElement('div');
            item.className = 'toc-item' + (i === state.currentChapter ? ' active' : '');
            item.setAttribute('role', 'button');
            item.setAttribute('tabindex', '0');
            item.innerHTML = `
                <span class="toc-chapter-num">Chapter ${ch.num}</span>
                ${ch.title}
            `;
            item.addEventListener('click', () => {
                goToChapter(i);
                closeToc();
            });
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    goToChapter(i);
                    closeToc();
                }
            });
            dom.tocList.appendChild(item);
        });
    }

    function updateTocActive() {
        const items = dom.tocList.querySelectorAll('.toc-item');
        items.forEach((item, i) => {
            item.classList.toggle('active', i === state.currentChapter);
        });
    }

    function openToc() {
        dom.tocSidebar.classList.add('toc-open');
        dom.tocOverlay.className = 'toc-overlay-visible';
    }

    function closeToc() {
        dom.tocSidebar.classList.remove('toc-open');
        dom.tocOverlay.className = 'toc-overlay-hidden';
    }

    // ── Theme ──────────────────────────────────────────────
    function applyTheme(theme) {
        state.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        dom.themeSun.style.display = theme === 'dark' ? 'block' : 'none';
        dom.themeMoon.style.display = theme === 'dark' ? 'none' : 'block';
        saveState();
    }

    function toggleTheme() {
        applyTheme(state.theme === 'light' ? 'dark' : 'light');
    }

    // ── Font Size ──────────────────────────────────────────
    function applyFontSize(index) {
        FONT_SIZES.forEach(cls => {
            if (cls) document.body.classList.remove(cls);
        });
        if (FONT_SIZES[index]) {
            document.body.classList.add(FONT_SIZES[index]);
        }
        state.fontSize = index;
        saveState();
    }

    // ── Fullscreen ─────────────────────────────────────────
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen().catch(() => {});
        }
    }

    // ── Toast ──────────────────────────────────────────────
    function showToast(message) {
        dom.bookmarkToast.textContent = message;
        dom.bookmarkToast.classList.add('show');
        setTimeout(() => dom.bookmarkToast.classList.remove('show'), 2000);
    }

    // ── Keyboard Navigation ────────────────────────────────
    function handleKeyboard(e) {
        // Don't handle if focus is in an input or TOC is open
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        switch (e.key) {
            case 'ArrowRight':
            case 'PageDown':
                e.preventDefault();
                if (state.currentChapter < CHAPTERS.length - 1) {
                    goToChapter(state.currentChapter + 1, 'forward');
                }
                break;
            case 'ArrowLeft':
            case 'PageUp':
                e.preventDefault();
                if (state.currentChapter > 0) {
                    goToChapter(state.currentChapter - 1, 'backward');
                }
                break;
            case 'Escape':
                closeToc();
                break;
            case 't':
            case 'T':
                if (!e.ctrlKey && !e.metaKey) toggleTheme();
                break;
            case 'b':
            case 'B':
                if (!e.ctrlKey && !e.metaKey) {
                    showToast(`Bookmarked: Chapter ${state.currentChapter + 1}`);
                }
                break;
        }
    }

    // ── Swipe Support (Touch) ──────────────────────────────
    let touchStartX = 0;
    let touchStartY = 0;

    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }

    function handleTouchEnd(e) {
        const dx = e.changedTouches[0].screenX - touchStartX;
        const dy = e.changedTouches[0].screenY - touchStartY;

        // Only trigger if horizontal swipe is dominant
        if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;

        if (dx < 0 && state.currentChapter < CHAPTERS.length - 1) {
            goToChapter(state.currentChapter + 1, 'forward');
        } else if (dx > 0 && state.currentChapter > 0) {
            goToChapter(state.currentChapter - 1, 'backward');
        }
    }

    // ── Preload adjacent chapters ──────────────────────────
    function preloadAdjacent() {
        const i = state.currentChapter;
        if (i + 1 < CHAPTERS.length) fetchChapter(i + 1);
        if (i - 1 >= 0) fetchChapter(i - 1);
    }

    // ── Initialize ─────────────────────────────────────────
    async function init() {
        // Load saved state
        loadState();

        // Apply saved preferences
        applyTheme(state.theme);
        applyFontSize(state.fontSize);

        // Build TOC
        buildToc();

        // Render current chapter
        await renderChapter(state.currentChapter, 'none');

        // Preload neighbors
        preloadAdjacent();

        // Hide loading screen
        setTimeout(() => {
            dom.loadingScreen.classList.add('hidden');
        }, 600);

        // ── Event Listeners ────────────────────────────────
        dom.prevBtn.addEventListener('click', () => {
            if (state.currentChapter > 0) {
                goToChapter(state.currentChapter - 1, 'backward');
            }
        });

        dom.nextBtn.addEventListener('click', () => {
            if (state.currentChapter < CHAPTERS.length - 1) {
                goToChapter(state.currentChapter + 1, 'forward');
            }
        });

        dom.themeToggle.addEventListener('click', toggleTheme);
        dom.tocToggle.addEventListener('click', openToc);
        dom.tocClose.addEventListener('click', closeToc);
        dom.tocOverlay.addEventListener('click', closeToc);

        dom.fontIncrease.addEventListener('click', () => {
            if (state.fontSize < FONT_SIZES.length - 1) {
                applyFontSize(state.fontSize + 1);
                showToast('Font size increased');
            }
        });

        dom.fontDecrease.addEventListener('click', () => {
            if (state.fontSize > 0) {
                applyFontSize(state.fontSize - 1);
                showToast('Font size decreased');
            }
        });

        dom.fullscreenToggle.addEventListener('click', toggleFullscreen);

        document.addEventListener('keydown', handleKeyboard);
        dom.book.addEventListener('touchstart', handleTouchStart, { passive: true });
        dom.book.addEventListener('touchend', handleTouchEnd, { passive: true });

        // Preload on chapter change
        const origGoTo = goToChapter;
        // Already handled in renderChapter
    }

    // ── Boot ───────────────────────────────────────────────
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
