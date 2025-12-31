// Services data
const services = [
    {
        id: 'jellyfin',
        title: 'Jellyfin',
        description: 'Media server',
        icon: 'fa-play-circle',
        url: 'https://jellyfin.example.com/',
        color: '#00a4dc'
    },
    {
        id: 'jellyseerr',
        title: 'Jellyseerr',
        description: 'Request manager',
        icon: 'fa-search',
        url: 'https://jellyseerr.example.com/',
        color: '#7c3aed'
    },
    {
        id: 'amazon',
        title: 'Amazon Prime',
        description: 'Prime Video',
        icon: 'fab fa-amazon',
        url: 'https://www.primevideo.com/',
        color: '#ff9900'
    },
    {
        id: 'amazon-store',
        title: 'Amazon',
        description: 'Online store',
        icon: 'fab fa-amazon',
        url: 'https://www.amazon.com/',
        color: '#ff9900'
    },
    {
        id: 'bol',
        title: 'Bol.com',
        description: 'Online store',
        icon: 'fa-shopping-cart',
        url: 'https://www.bol.com/',
        color: '#00a4dc'
    },
    {
        id: 'youtube',
        title: 'YouTube',
        description: 'Video platform',
        icon: 'fab fa-youtube',
        url: 'https://www.youtube.com/',
        color: '#ff0000'
    },
    {
        id: 'kick',
        title: 'Kick',
        description: 'Live streaming',
        icon: 'fa-play',
        url: 'https://kick.com/',
        color: '#53fc18'
    },
    {
        id: 'twitch',
        title: 'Twitch',
        description: 'Live streaming',
        icon: 'fab fa-twitch',
        url: 'https://www.twitch.tv/',
        color: '#9146ff'
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initCards();
    initSearch();
    initQuickLinks();
    initLogoEasterEgg();
});

// Initialize service cards
function initCards() {
    const grid = document.getElementById('cardsGrid');
    grid.innerHTML = services.map(service => `
        <a href="${service.url}" class="service-card" data-service="${service.id}">
            <div class="card-title">${service.title}</div>
        </a>
    `).join('');

    // Add click handlers
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const serviceId = card.dataset.service;
            const service = services.find(s => s.id === serviceId);
            if (service && service.url !== '#') {
                window.open(service.url, '_blank');
            }
        });
    });
}

// Initialize search
function initSearch() {
    const form = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchEngine = document.getElementById('searchEngine');
    const shortcutsPopup = document.getElementById('searchShortcuts');

    // Search shortcuts
    const searchShortcuts = {
        '!g': 'https://www.google.com/search?q=',
        '!i': 'https://www.google.com/search?tbm=isch&q=',
        '!m': 'https://www.imdb.com/find?q=',
        '!u': 'https://www.urbandictionary.com/define.php?term=',
        '!w': 'https://en.wikipedia.org/wiki/',
        '!y': 'https://www.youtube.com/results?search_query='
    };

    // Show shortcuts popup when focusing on search input
    searchInput.addEventListener('focus', () => {
        shortcutsPopup.style.display = 'block';
    });

    // Hide shortcuts popup when input loses focus (unless clicking on shortcuts)
    searchInput.addEventListener('blur', () => {
        setTimeout(() => {
            if (!shortcutsPopup.contains(document.activeElement)) {
                shortcutsPopup.style.display = 'none';
            }
        }, 150);
    });

    // Hide popup when clicking outside
    document.addEventListener('click', (e) => {
        if (!form.contains(e.target)) {
            shortcutsPopup.style.display = 'none';
        }
    });

    // Handle shortcut selection
    shortcutsPopup.addEventListener('click', (e) => {
        const shortcutItem = e.target.closest('.shortcut-item');
        if (shortcutItem) {
            const shortcut = shortcutItem.dataset.shortcut;
            const currentValue = searchInput.value.trim();
            const searchTerm = currentValue.replace(/^!\w+\s*/, '');
            searchInput.value = shortcut + ' ' + searchTerm;
            shortcutsPopup.style.display = 'none';
            searchInput.focus();
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const q = searchInput.value.trim();
        if (!q) return;
        
        let url;
        const shortcut = q.split(' ')[0];
        if (searchShortcuts[shortcut]) {
            const searchTerm = q.substring(shortcut.length).trim();
            url = searchShortcuts[shortcut] + encodeURIComponent(searchTerm);
        } else {
            url = searchEngine.value + encodeURIComponent(q);
        }
        
        window.open(url, '_blank');
        searchInput.value = '';
        shortcutsPopup.style.display = 'none';
    });
}

// Initialize quick links with dropdowns
function initQuickLinks() {
    const container = document.getElementById('quickLinks');
    if (!container) return;

    // Define dropdown content for each service
    const dropdownContent = {
        'Networking': [
            { name: 'VMWare', url: 'https://192.168.100.100/ui/' },
            { name: 'VSphere', url: 'https://192.168.100.101/ui/' },
            { name: 'Proxy Manager', url: 'https://nginx.example.com/' }
        ],
        'Homelabbing': [
            { name: 'Prowlarr', url: 'https://prowlarr.example.com/' },
            { name: 'Sonarr', url: 'https://sonarr.example.com/' },
            { name: 'Lidarr', url: 'https://lidarr.example.com/' },
            { name: 'Radarr', url: 'http://radarr.example.com/' },
            { name: 'Jellyseerr', url: 'https://jellyseerr.example.com/' },
            { name: 'Jellyfin', url: 'https://jellyfin.example.com/' }
        ],
        'Personal Links': [
            { name: 'Website', url: 'https://example.com/' },
            { name: 'Wiki', url: 'https://wiki.example.com/' },
            { name: 'Forums', url: 'https://example.com/forums/' },
            { name: 'Project', url: 'https://project.example.com/' },
            { name: 'Discord', url: 'https://discord.gg/example' },
            { name: 'Community', url: 'https://discord.gg/community' }
        ],
        'Monitoring': [
            { name: 'Grafana', url: 'https://grafana.local/' },
            { name: 'Prometheus', url: 'https://prometheus.local/' },
            { name: 'Uptime Kuma', url: 'https://uptime.local/' },
            { name: 'Netdata', url: 'https://netdata.local/' }
        ],
        'Downloads': [
            { name: 'qBittorrent', url: 'https://qbittorrent.local/' },
            { name: 'Transmission', url: 'https://transmission.local/' },
            { name: 'Download Station', url: 'https://download.local/' },
            { name: 'File Manager', url: 'https://files.local/' }
        ],
        'Documents': [
            { name: 'Paperless', url: 'https://paperless.local/' },
            { name: 'Nextcloud', url: 'https://nextcloud.local/' },
            { name: 'OnlyOffice', url: 'https://onlyoffice.local/' },
            { name: 'File Browser', url: 'https://filebrowser.local/' }
        ],
    };

    // Default buttons to show
    const defaultButtons = [
        { name: 'Networking', url: 'https://192.168.100.100/ui/' },
        { name: 'Homelabbing', url: 'https://prowlarr.example.com/' },
        { name: 'Personal Links', url: 'https://example.com/' },
        { name: 'Monitoring', url: 'https://grafana.local/' },
        { name: 'Downloads', url: 'https://qbittorrent.local/' },
        { name: 'Documents', url: 'https://paperless.local/' }
    ];

    container.innerHTML = '';

    // Create chips container
    const chips = document.createElement('div');
    chips.className = 'chips';

    // Render buttons with dropdowns
    defaultButtons.forEach(link => {
        const chipContainer = document.createElement('div');
        chipContainer.className = 'chip-container';

        const a = document.createElement('a');
        a.className = 'chip';
        a.href = link.url;
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = link.name;

        // Create dropdown if content exists
        if (dropdownContent[link.name]) {
            const dropdown = document.createElement('div');
            dropdown.className = 'chip-dropdown';

            dropdownContent[link.name].forEach(option => {
                const optionLink = document.createElement('a');
                optionLink.className = 'chip-dropdown-option';
                optionLink.href = option.url;
                optionLink.target = '_blank';
                optionLink.rel = 'noopener';
                optionLink.textContent = option.name;
                dropdown.appendChild(optionLink);
            });

            // Add hover event listeners for dropdown
            chipContainer.addEventListener('mouseenter', function() {
                // Close other dropdowns
                document.querySelectorAll('.chip-dropdown').forEach(dd => {
                    if (dd !== dropdown) {
                        dd.style.opacity = '0';
                        dd.style.visibility = 'hidden';
                        dd.style.pointerEvents = 'none';
                    }
                });
                // Show current dropdown
                dropdown.style.opacity = '1';
                dropdown.style.visibility = 'visible';
                dropdown.style.pointerEvents = 'all';
            });

            chipContainer.addEventListener('mouseleave', function() {
                // Hide dropdown when mouse leaves
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.pointerEvents = 'none';
            });

            chipContainer.appendChild(a);
            chipContainer.appendChild(dropdown);
        } else {
            chipContainer.appendChild(a);
        }

        chips.appendChild(chipContainer);
    });

    container.appendChild(chips);
}

// Initialize logo easter egg
function initLogoEasterEgg() {
    const logo = document.querySelector('.logo');
    if (!logo) return;

    const originalHTML = logo.innerHTML; // "Rekt<span class="logo-accent">Net</span>"
    const originalText = 'RektNet';
    const easterEggText = 'I love you more ❤️';
    let hoverTimeout = null;
    let isAnimating = false;
    let typeInterval = null;

    function getCurrentText(element) {
        return element.textContent || element.innerText || '';
    }

    function typeWriter(element, text, onComplete, speed = 80) {
        let i = 0;
        element.innerHTML = '';
        
        typeInterval = setInterval(() => {
            if (i < text.length) {
                // Use innerHTML to preserve styling, but for easter egg use plain text with class
                if (element.classList.contains('easter-egg')) {
                    element.innerHTML = `<span>${text.substring(0, i + 1)}</span>`;
                } else {
                    // Reconstruct original structure while typing
                    const typed = text.substring(0, i + 1);
                    if (typed.length <= 4) {
                        element.innerHTML = typed;
                    } else {
                        element.innerHTML = typed.substring(0, 4) + `<span class="logo-accent">${typed.substring(4)}</span>`;
                    }
                }
                i++;
            } else {
                clearInterval(typeInterval);
                typeInterval = null;
                if (onComplete) onComplete();
            }
        }, speed);
    }

    function deleteText(element, textToDelete, onComplete, speed = 50) {
        let currentText = getCurrentText(element);
        let i = currentText.length;
        
        typeInterval = setInterval(() => {
            if (i > 0) {
                const remaining = currentText.substring(0, i - 1);
                // Preserve structure while deleting
                if (remaining.length <= 4) {
                    element.innerHTML = remaining;
                } else {
                    element.innerHTML = remaining.substring(0, 4) + `<span class="logo-accent">${remaining.substring(4)}</span>`;
                }
                i--;
            } else {
                clearInterval(typeInterval);
                typeInterval = null;
                element.innerHTML = '';
                if (onComplete) onComplete();
            }
        }, speed);
    }

    logo.addEventListener('mouseenter', () => {
        if (isAnimating) return;
        
        // Wait 5 seconds before starting
        hoverTimeout = setTimeout(() => {
            isAnimating = true;
            
            // Start color transition animation
            logo.classList.add('easter-egg');
            
            // Delete "RektNet" character by character
            deleteText(logo, originalText, () => {
                // Then type the easter egg message
                setTimeout(() => {
                    typeWriter(logo, easterEggText, () => {
                        // After showing the message, wait a bit then return
                        setTimeout(() => {
                            deleteText(logo, easterEggText, () => {
                                // Type back "RektNet" with original structure
                                setTimeout(() => {
                                    // Remove easter egg class to transition back to blue
                                    logo.classList.remove('easter-egg');
                                    logo.style.transition = 'all 0.3s ease';
                                    typeWriter(logo, originalText, () => {
                                        // Restore original HTML structure
                                        logo.innerHTML = originalHTML;
                                        logo.style.transition = '';
                                        isAnimating = false;
                                    }, 80);
                                }, 200);
                            }, 50);
                        }, 2000);
                    }, 80);
                }, 300);
            }, 50);
        }, 5000);
    });

    logo.addEventListener('mouseleave', () => {
        // Clear hover timeout if user leaves before 5 seconds
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            hoverTimeout = null;
        }
        
        // If animation is in progress, reset immediately
        if (isAnimating || typeInterval) {
            if (typeInterval) {
                clearInterval(typeInterval);
                typeInterval = null;
            }
            
            logo.classList.remove('easter-egg');
            logo.innerHTML = originalHTML;
            isAnimating = false;
        }
    });
}
