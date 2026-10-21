        // 1. Initialize Lucide Icons
        lucide.createIcons();

        // 2. Interactive Ambient Background Canvas
        const canvas = document.getElementById('cyber-canvas');
        const ctx = canvas.getContext('2d');
        let width, height;

        function resizeCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const dots = Array.from({ length: 40 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.5,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            alpha: Math.random() * 0.5 + 0.2
        }));

        function drawCanvas() {
            ctx.clearRect(0, 0, width, height);
            dots.forEach(dot => {
                dot.x += dot.vx;
                dot.y += dot.vy;
                if (dot.x < 0 || dot.x > width) dot.vx *= -1;
                if (dot.y < 0 || dot.y > height) dot.vy *= -1;

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 240, 255, ${dot.alpha})`;
                ctx.shadowBlur = 8;
                ctx.shadowColor = '#00f0ff';
                ctx.fill();
            });
            requestAnimationFrame(drawCanvas);
        }
        drawCanvas();

        // 3. Mouse Ambient Glow Tracker
        const ambientGlow = document.getElementById('ambient-glow');
        document.addEventListener('mousemove', (e) => {
            if (ambientGlow) {
                ambientGlow.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(0, 240, 255, 0.09), transparent 80%)`;
            }
        });

        // 4. Drawer Toggle Logic with Explicit Cross Close Button
        const menuToggle = document.getElementById('menu-toggle');
        const drawerClose = document.getElementById('drawer-close');
        const navDrawer = document.getElementById('nav-drawer');

        function openDrawer() {
            navDrawer.classList.remove('translate-x-full');
        }

        function closeDrawer() {
            navDrawer.classList.add('translate-x-full');
        }

        if (menuToggle) menuToggle.addEventListener('click', openDrawer);
        if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

        // Close drawer on clicking nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', closeDrawer);
        });

        // 5. GSAP ScrollTrigger Animations
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray('.roadmap-panel').forEach((panel) => {
            gsap.from(panel, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: panel,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // 6. Live Order Book Dynamic Simulation
        const asksContainer = document.getElementById('asks-container');
        const bidsContainer = document.getElementById('bids-container');
        let currentPrice = 67420.50;

        function updateOrderBook() {
            currentPrice += (Math.random() - 0.49) * 2;
            const tickerPriceElem = document.getElementById('ticker-price');
            if (tickerPriceElem) {
                tickerPriceElem.textContent = `$${currentPrice.toFixed(2)}`;
            }

            if (asksContainer && bidsContainer) {
                asksContainer.innerHTML = '';
                bidsContainer.innerHTML = '';

                for (let i = 4; i >= 1; i--) {
                    const price = (currentPrice + i * 0.5).toFixed(2);
                    const size = (Math.random() * 1.8 + 0.1).toFixed(4);
                    const depthWidth = Math.floor(size * 40);
                    asksContainer.innerHTML += `
                        <div class="flex justify-between items-center relative py-0.5 px-1 rounded bg-red-950/20">
                            <div class="absolute right-0 top-0 bottom-0 bg-red-500/20 rounded-r" style="width: ${depthWidth}%"></div>
                            <span class="text-red-400 z-10 font-bold">$${price}</span>
                            <span class="z-10">${size}</span>
                            <span class="text-slate-500 z-10 text-[10px]">${depthWidth}%</span>
                        </div>
                    `;
                }

                for (let i = 1; i <= 4; i++) {
                    const price = (currentPrice - i * 0.5).toFixed(2);
                    const size = (Math.random() * 1.8 + 0.1).toFixed(4);
                    const depthWidth = Math.floor(size * 40);
                    bidsContainer.innerHTML += `
                        <div class="flex justify-between items-center relative py-0.5 px-1 rounded bg-emerald-950/20">
                            <div class="absolute right-0 top-0 bottom-0 bg-emerald-500/20 rounded-r" style="width: ${depthWidth}%"></div>
                            <span class="text-emerald-400 z-10 font-bold">$${price}</span>
                            <span class="z-10">${size}</span>
                            <span class="text-slate-500 z-10 text-[10px]">${depthWidth}%</span>
                        </div>
                    `;
                }
            }
        }
        setInterval(updateOrderBook, 1200);
        updateOrderBook();

        // 7. Benchmark Latency Slider
        const slider = document.getElementById('volume-slider');
        const volLabel = document.getElementById('volume-label');
        const tradTime = document.getElementById('trad-time');
        const findataTime = document.getElementById('findata-time');

        if (slider) {
            slider.addEventListener('input', (e) => {
                const vol = e.target.value;
                volLabel.textContent = `${vol} Million Ticks / Day`;
                tradTime.textContent = `${(vol * 0.284).toFixed(1)} sec`;
                findataTime.textContent = `${(vol * 0.0062).toFixed(2)} sec`;
            });
        }

        // 8. 11 Architecture Layers Filter Tabs
        function filterLayers(category) {
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('bg-cyan-400', 'text-slate-950', 'neon-btn');
                btn.classList.add('bg-slate-900', 'text-slate-300');
            });

            const activeBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
            if (activeBtn) {
                activeBtn.classList.remove('bg-slate-900', 'text-slate-300');
                activeBtn.classList.add('bg-cyan-400', 'text-slate-950', 'neon-btn');
            }

            document.querySelectorAll('.layer-card').forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // 9. Interactive Terminal Tab Switching
        function switchTab(tabKey) {
            document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('.terminal-tab').forEach(el => {
                el.classList.remove('text-cyan-400', 'border-cyan-400', 'bg-cyan-500/10', 'font-bold');
                el.classList.add('text-slate-400', 'border-transparent');
            });

            const targetContent = document.getElementById(`content-${tabKey}`);
            const targetTab = document.getElementById(`tab-${tabKey}`);

            if (targetContent) targetContent.classList.remove('hidden');
            if (targetTab) {
                targetTab.classList.add('text-cyan-400', 'border-cyan-400', 'bg-cyan-500/10', 'font-bold');
                targetTab.classList.remove('text-slate-400', 'border-transparent');
            }
        }

        // 10. Copy Terminal Logs
        function copyTerminalLogs() {
            const activeTabContent = document.querySelector('.tab-content:not(.hidden)');
            if (!activeTabContent) return;

            const textToCopy = activeTabContent.innerText;
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                const copyBtnText = document.getElementById('copy-btn-text');
                if (copyBtnText) {
                    copyBtnText.textContent = "Logs Copied!";
                    setTimeout(() => {
                        copyBtnText.textContent = "Copy Logs";
                    }, 2000);
                }
            } catch (err) {
                console.error('Copy failed', err);
            }
            document.body.removeChild(textArea);
        }

        // 11. Hero Stats Randomizer Incrementer
        setInterval(() => {
            const ingElem = document.getElementById('stat-ingestion');
            const vwapElem = document.getElementById('stat-vwap');
            
            if (ingElem) {
                ingElem.textContent = (2.35 + Math.random() * 0.18).toFixed(2);
            }
            if (vwapElem) {
                vwapElem.textContent = (0.34 + Math.random() * 0.08).toFixed(2);
            }
        }, 2000);
