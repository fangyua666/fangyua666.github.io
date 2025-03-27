document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 60,
                behavior: 'smooth'
            });
        });
    });

    // Scroll animations for sections
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Dark mode toggle
    const createThemeToggle = () => {
        const themeToggle = document.createElement('div');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        document.body.appendChild(themeToggle);

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    };

    // Back to top button
    const createBackToTopButton = () => {
        const backToTopButton = document.createElement('div');
        backToTopButton.className = 'back-to-top';
        backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(backToTopButton);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    // Project filter functionality
    const setupProjectFilters = () => {
        const projectsSection = document.getElementById('projects');
        
        // Skip if projects section doesn't exist
        if (!projectsSection) return;
        
        // Create filter buttons if needed
        const createFilters = () => {
            const filterContainer = document.createElement('div');
            filterContainer.className = 'project-filters';
            filterContainer.style.marginBottom = '2rem';
            filterContainer.style.display = 'flex';
            filterContainer.style.gap = '1rem';
            filterContainer.style.justifyContent = 'center';
            filterContainer.style.flexWrap = 'wrap';
            
            // Get all project types/categories
            const projects = document.querySelectorAll('.project-card');
            const categories = new Set();
            
            projects.forEach(project => {
                const category = project.dataset.category;
                if (category) categories.add(category);
            });
            
            // Add "All" filter
            const allFilter = document.createElement('button');
            allFilter.textContent = 'All';
            allFilter.className = 'filter-btn active';
            allFilter.style.padding = '0.5rem 1rem';
            allFilter.style.borderRadius = '20px';
            allFilter.style.border = 'none';
            allFilter.style.backgroundColor = 'var(--primary-color)';
            allFilter.style.color = 'white';
            allFilter.style.cursor = 'pointer';
            allFilter.style.transition = 'all 0.3s ease';
            filterContainer.appendChild(allFilter);
            
            // Add category filters
            categories.forEach(category => {
                const filterBtn = document.createElement('button');
                filterBtn.textContent = category;
                filterBtn.className = 'filter-btn';
                filterBtn.style.padding = '0.5rem 1rem';
                filterBtn.style.borderRadius = '20px';
                filterBtn.style.border = 'none';
                filterBtn.style.backgroundColor = '#e0e0e0';
                filterBtn.style.color = 'var(--text-color)';
                filterBtn.style.cursor = 'pointer';
                filterBtn.style.transition = 'all 0.3s ease';
                filterContainer.appendChild(filterBtn);
            });
            
            // Insert filters before projects grid
            const projectsGrid = projectsSection.querySelector('.projects-grid');
            projectsSection.insertBefore(filterContainer, projectsGrid);
            
            // Add filter functionality
            const filterBtns = document.querySelectorAll('.filter-btn');
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Update active button
                    filterBtns.forEach(b => {
                        b.classList.remove('active');
                        b.style.backgroundColor = '#e0e0e0';
                        b.style.color = 'var(--text-color)';
                    });
                    this.classList.add('active');
                    this.style.backgroundColor = 'var(--primary-color)';
                    this.style.color = 'white';
                    
                    const category = this.textContent;
                    
                    // Filter projects
                    projects.forEach(project => {
                        if (category === 'All' || project.dataset.category === category) {
                            project.style.display = 'block';
                        } else {
                            project.style.display = 'none';
                        }
                    });
                });
            });
        };
        
        // Only create filters if there are data-category attributes
        const projectsWithCategories = document.querySelectorAll('.project-card[data-category]');
        if (projectsWithCategories.length > 0) {
            createFilters();
        }
    };

    // Initialize features
    createThemeToggle();
    createBackToTopButton();
    setupProjectFilters();
    
    // Typing effect for header title (if it exists)
    const titleElement = document.querySelector('.title');
    if (titleElement) {
        const text = titleElement.textContent;
        titleElement.textContent = '';
        
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < text.length) {
                titleElement.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 100);
    }
    
    // Add year to copyright in footer
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});