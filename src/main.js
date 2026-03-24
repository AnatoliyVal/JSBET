(function () {

    let GAMES_POOL = [
        {
            name: 'Sweet Bonanza',
            img: 'index-files/games/Sweet Bonanza.webp',
            provider: 'Pragmatic Play',
            genre: 'Слот · Фрукти',
            rating: '4.9',
            players: '3 241',
            badge: 'hot'
        },
        {
            name: 'Big Bass Bonanza',
            img: 'index-files/games/BigBassBonanza.webp',
            provider: 'Pragmatic Play',
            genre: 'Слот · Рибалка',
            rating: '4.8',
            players: '2 187',
            badge: 'new'
        },
        {
            name: 'The Dog House',
            img: 'index-files/games/TheDogHouse.webp',
            provider: 'Pragmatic Play',
            genre: 'Слот · Тварини',
            rating: '4.7',
            players: '1 854',
            badge: ''
        },
        {
            name: 'Starlight Princess 1000',
            img: 'index-files/games/Starlight Princess 1000.webp',
            provider: 'Pragmatic Play',
            genre: 'Слот · Магія',
            rating: '4.9',
            players: '4 012',
            badge: 'jackpot'
        },
        {
            name: 'Madame Destiny Megaways',
            img: 'index-files/games/MadameDestinyMegaways.webp',
            provider: 'Pragmatic Play',
            genre: 'Megaways · Містика',
            rating: '4.6',
            players: '987',
            badge: ''
        },
        {
            name: 'Zeus vs Hades',
            img: 'index-files/games/zeus-vs-hades-gods-of-war-250.webp',
            provider: 'Pragmatic Play',
            genre: 'Слот · Mythologie',
            rating: '4.8',
            players: '2 650',
            badge: 'hot'
        },
        {
            name: 'Gates of Olympus SS',
            img: 'index-files/games/imgi_24_GatesofOlympusSuperScatt.webp',
            provider: 'Pragmatic Play',
            genre: 'Слот · Боги',
            rating: '4.7',
            players: '3 108',
            badge: 'new'
        },
        {
            name: 'Snoop Dogg Dollars',
            img: 'index-files/games/SnoopDoggDollars.webp',
            provider: 'Pragmatic Play',
            genre: 'Слот · Хіп-хоп',
            rating: '4.5',
            players: '742',
            badge: ''
        },
        {
            name: 'Aztec Magic Bonanza',
            img: 'index-files/games/AztecMagicBonanza.webp',
            provider: 'BGaming',
            genre: 'Слот · Ацтеки',
            rating: '4.6',
            players: '1 230',
            badge: ''
        },
        {
            name: 'Sun of Egypt 3',
            img: 'index-files/games/SunOfEgypt3.webp',
            provider: 'Booongo',
            genre: 'Слот · Єгипет',
            rating: '4.5',
            players: '895',
            badge: ''
        },
        {
            name: 'Wild Cash x9990',
            img: 'index-files/games/WildCashX9990.webp',
            provider: 'Endorphina',
            genre: 'Слот · Класика',
            rating: '4.4',
            players: '611',
            badge: ''
        },
        {
            name: 'Rainbow Reels',
            img: 'index-files/games/RainbowReels.webp',
            provider: 'Playson',
            genre: 'Слот · Класика',
            rating: '4.3',
            players: '528',
            badge: 'jackpot'
        },
        {
            name: 'Big Bass Splash',
            img: 'index-files/games/Big Bass Splash.webp',
            provider: 'Pragmatic Play',
            genre: 'Слот · Рибалка',
            rating: '4.7',
            players: '1 543',
            badge: 'new'
        },
        {
            name: 'Coral Island',
            img: 'index-files/games/CoralIsland.webp',
            provider: 'Playson',
            genre: 'Слот · Природа',
            rating: '4.5',
            players: '876',
            badge: 'new'
        },
        {
            name: 'Army of Ares',
            img: 'index-files/games/ArmyofAres.webp',
            provider: 'Relax Gaming',
            genre: 'Слот · Воїни',
            rating: '4.6',
            players: '1 102',
            badge: 'new'
        },
        {
            name: 'Fire Coins Hold & Win',
            img: 'index-files/games/FireCoinsHoldandWin.webp',
            provider: 'Playson',
            genre: 'Hold&Win · Монети',
            rating: '4.8',
            players: '2 310',
            badge: 'hot'
        },
        {
            name: 'Joker Blaze',
            img: 'index-files/games/JokerBlaze.webp',
            provider: 'Playson',
            genre: 'Слот · Класика',
            rating: '4.4',
            players: '684',
            badge: 'new'
        },
        {
            name: 'Fishing Club',
            img: 'index-files/games/FishingClub.webp',
            provider: 'Playson',
            genre: 'Слот · Рибалка',
            rating: '4.7',
            players: '1 629',
            badge: 'hot'
        },
        {
            name: 'Solar Queen',
            img: 'index-files/games/SolarQueen.webp',
            provider: 'Playson',
            genre: 'Слот · Єгипет',
            rating: '4.6',
            players: '918',
            badge: ''
        },
        {
            name: 'Poseidon Wild Wrath',
            img: 'index-files/games/Poseidon Wild Wrath.webp',
            provider: 'Playson',
            genre: 'Слот · Боги',
            rating: '4.6',
            players: '1 057',
            badge: ''
        },
        {
            name: 'Thunder Coins Hold & Win',
            img: 'index-files/games/ThunderCoinsHoldandWin@513x767@x2.webp',
            provider: 'Playson',
            genre: 'Hold&Win · Джекпот',
            rating: '4.6',
            players: '1 340',
            badge: 'jackpot'
        },
        {
            name: 'Good Luck Good Fortune',
            img: 'index-files/games/GoodLuckGoodFortune.webp',
            provider: 'Pragmatic Play',
            genre: 'Слот · Азія',
            rating: '4.5',
            players: '1 178',
            badge: 'jackpot'
        },
        {
            name: 'Amazing Diamonds',
            img: 'index-files/games/Amazing_Diamonds.webp',
            provider: 'Amatic',
            genre: 'Слот · Класика',
            rating: '4.4',
            players: '816',
            badge: 'jackpot'
        },
        {
            name: 'Glowberry Blast',
            img: 'index-files/games/GlowBerryBlast.webp',
            provider: 'Playson',
            genre: 'Слот · Ягоди',
            rating: '4.5',
            players: '803',
            badge: 'new'
        },
        {
            name: 'Serengeti Sunrise',
            img: 'index-files/games/Serengeti Sunrise.webp',
            provider: 'Spribe',
            genre: 'Слот · Тварини',
            rating: '4.3',
            players: '367',
            badge: ''
        }
    ];

    function buildBadgeHTML(badge) {
        if (badge === 'hot') return '<span class="badge badge--hot"><i class="fa-solid fa-fire"></i> Хіт</span>';
        if (badge === 'new') return '<span class="badge badge--new"><i class="fa-solid fa-star"></i> Новинка</span>';
        if (badge === 'jackpot') return '<span class="badge badge--jackpot"><i class="fa-solid fa-gem"></i> Джекпот</span>';
        return '';
    }

    function buildGameCardHTML(game) {
        return '<article class="game-card" role="listitem" aria-label="' + game.name + '">' +
            '<div class="game-card-thumb">' +
            buildBadgeHTML(game.badge) +
            '<img class="game-card-img" src="' + game.img + '" alt="' + game.name + '" loading="lazy">' +
            '<div class="game-card-overlay" aria-hidden="true"><div class="game-card-play-btn">▶</div></div>' +
            '<button class="game-card-fav-btn" type="button" title="Додати до улюблених" aria-label="Додати до улюблених"><i class="fa-regular fa-heart"></i></button>' +
            '</div>' +
            '<div class="game-card-info">' +
            '<p class="game-card-name">' + game.name + '</p>' +
            '<p class="game-card-provider">' + game.provider + '</p>' +
            '<p class="game-card-genre"><i class="fa-solid fa-tag"></i> ' + game.genre + '</p>' +
            '<div class="game-card-meta">' +
            '<span class="game-card-rating"><i class="fa-solid fa-star"></i> ' + game.rating + '</span>' +
            '<span class="game-card-players"><i class="fa-solid fa-users"></i> ' + game.players + '</span>' +
            '</div>' +
            '</div>' +
            '</article>';
    }

    function generateRecommended() {
        let grid = document.getElementById('recommended-grid');
        if (!grid) return;

        let pool = GAMES_POOL.slice();
        let picked = [];
        let count = 0;
        while (count < 6 && pool.length > 0) {
            let randIdx = Math.floor(Math.random() * pool.length);
            picked.push(pool[randIdx]);
            pool.splice(randIdx, 1);
            count++;
        }

        let html = '';
        for (let i = 0; i < picked.length; i++) {
            html += buildGameCardHTML(picked[i]);
        }
        grid.innerHTML = html;

        attachFavListeners(grid.querySelectorAll('.game-card'));
    }

    generateRecommended();

    let refreshBtn = document.getElementById('refresh-recommended');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function () {
            refreshBtn.classList.add('spin');
            generateRecommended();
            setTimeout(function () {
                refreshBtn.classList.remove('spin');
            }, 500);
        });
    }


    function attachFavListeners(cards) {
        cards.forEach(function (card) {
            if (card.dataset.favBound) return;
            card.dataset.favBound = '1';

            card.addEventListener('dblclick', function () {
                let isFav = card.classList.toggle('game-card--favourite');
                let btn = card.querySelector('.game-card-fav-btn');
                if (btn) {
                    btn.innerHTML = isFav
                        ? '<i class="fa-solid fa-heart"></i>'
                        : '<i class="fa-regular fa-heart"></i>';
                    btn.classList.toggle('game-card-fav-btn--active', isFav);
                }
            });
        });
    }

    document.querySelectorAll('.game-card').forEach(function (card) {
        let thumb = card.querySelector('.game-card-thumb');
        if (thumb && !thumb.querySelector('.game-card-fav-btn')) {
            let favBtn = document.createElement('button');
            favBtn.className = 'game-card-fav-btn';
            favBtn.type = 'button';
            favBtn.title = 'Додати до улюблених';
            favBtn.setAttribute('aria-label', 'Додати до улюблених');
            favBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
            thumb.appendChild(favBtn);
        }
    });

    attachFavListeners(document.querySelectorAll('.game-card'));


    let navBtns = document.querySelectorAll('#main-nav .nav-tabs-item');
    let pageSections = document.querySelectorAll('.page-section');

    navBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            let targetId = 'page-' + btn.getAttribute('data-tab');

            navBtns.forEach(function (b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            pageSections.forEach(function (sec) {
                if (sec.id === targetId) {
                    sec.classList.add('active');
                } else {
                    sec.classList.remove('active');
                }
            });

            window.scrollTo({top: 0, behavior: 'smooth'});

            if (targetId === 'page-profil') {
                animateProgressBar();
            }
        });
    });


    let REWARD_PLAYED = 347;
    let REWARD_NEEDED = 500;
    let REWARD_PCT = Math.round((REWARD_PLAYED / REWARD_NEEDED) * 100);

    function animateProgressBar() {
        let fill = document.getElementById('reward-progress-fill');
        let pctEl = document.getElementById('reward-progress-pct');
        let track = fill && fill.parentElement;
        if (!fill) return;

        fill.style.transition = 'none';
        fill.style.width = '0%';
        if (pctEl) pctEl.textContent = '0%';

        fill.offsetWidth;

        fill.style.transition = 'width 1.4s cubic-bezier(0.4, 0, 0.2, 1)';
        fill.style.width = REWARD_PCT + '%';

        let start = 0;
        let end = REWARD_PCT;
        let duration = 1400;
        let startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            let elapsed = timestamp - startTime;
            let progress = Math.min(elapsed / duration, 1);
            let eased = 1 - Math.pow(1 - progress, 3);
            let current = Math.round(eased * end);
            if (pctEl) pctEl.textContent = current + '%';
            if (track) track.setAttribute('aria-valuenow', Math.round(eased * REWARD_NEEDED));
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }


    let pfForm = document.getElementById('profile-personal-form');
    if (pfForm) {
        pfForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let successEl = document.getElementById('pf-success');
            successEl.textContent = '✓ Збережено!';
            successEl.classList.add('visible');
            setTimeout(function () {
                successEl.classList.remove('visible');
            }, 3000);
        });
    }

    let cfNumber = document.getElementById('cf-number');
    let cfHolder = document.getElementById('cf-holder');
    let cfExpiry = document.getElementById('cf-expiry');
    let numDisplay = document.getElementById('card-number-display');
    let holDisplay = document.getElementById('card-holder-display');
    let expDisplay = document.getElementById('card-expiry-display');
    let netLogo = document.getElementById('card-network-logo');
    let cfForm = document.getElementById('card-form');

    function detectNetwork(num) {
        if (/^4/.test(num)) return '<i class="fa-brands fa-cc-visa"></i>';
        if (/^5[1-5]/.test(num)) return '<i class="fa-brands fa-cc-mastercard"></i>';
        if (/^3[47]/.test(num)) return '<i class="fa-brands fa-cc-amex"></i>';
        if (/^6/.test(num)) return '<i class="fa-brands fa-cc-discover"></i>';
        return '<i class="fa-brands fa-cc-visa"></i>';
    }

    if (cfNumber) {
        cfNumber.addEventListener('input', function () {
            let digits = this.value.replace(/\D/g, '').slice(0, 16);
            let formatted = digits.replace(/(.{4})/g, '$1 ').trim();
            this.value = formatted;
            let padded = digits.padEnd(16, '•');
            numDisplay.textContent =
                padded.slice(0, 4) + ' ' +
                padded.slice(4, 8) + ' ' +
                padded.slice(8, 12) + ' ' +
                padded.slice(12, 16);
            netLogo.innerHTML = detectNetwork(digits);
        });
    }

    if (cfHolder) {
        cfHolder.addEventListener('input', function () {
            let val = this.value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
            holDisplay.textContent = val || "ВАШЕ ІМ'Я";
        });
    }

    if (cfExpiry) {
        cfExpiry.addEventListener('input', function () {
            let digits = this.value.replace(/\D/g, '').slice(0, 4);
            if (digits.length >= 3) {
                this.value = digits.slice(0, 2) + '/' + digits.slice(2);
            } else {
                this.value = digits;
            }
            expDisplay.textContent = this.value || 'MM/YY';
        });
    }

    if (cfForm) {
        cfForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let successEl = document.getElementById('cf-success');
            successEl.textContent = '✓ Картку прив\'язано!';
            successEl.classList.add('visible');
            setTimeout(function () {
                successEl.classList.remove('visible');
            }, 3000);
        });
    }

})();
