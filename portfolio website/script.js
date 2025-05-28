// Portfolio Site JavaScript
// Modern vanilla JS with accessibility in mind

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializePortfolio();
    initializeProjectDetails();
    initializeAnimations();
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            // Toggle menu visibility
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Update aria-expanded for accessibility
            navToggle.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Close menu when clicking on nav links (mobile)
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Portfolio page functionality
function initializePortfolio() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.querySelector('.modal-close');
    
    // Project data for modal popups
    const projectData = {
        ecommerce: {
            title: 'E-commerce Platform',
            image: 'images/ecommerce-project.jpg',
            summary: 'A full-stack e-commerce solution with modern web technologies.',
            features: ['User Authentication', 'Shopping Cart', 'Payment Processing', 'Admin Dashboard'],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'MongoDB'],
            status: 'Completed',
            duration: '3 months'
        },
        taskmanager: {
            title: 'Task Management App',
            image: 'images/task-manager.jpg',
            summary: 'A collaborative task management application with real-time updates.',
            features: ['Real-time Collaboration', 'Drag & Drop Interface', 'Team Management', 'Progress Tracking'],
            technologies: ['JavaScript', 'WebSockets', 'Express.js', 'MongoDB'],
            status: 'Completed',
            duration: '2 months'
        },
        weatherapp: {
            title: 'Weather Forecast App',
            image: 'images/weather-app.jpg',
            summary: 'A responsive weather application with location-based services.',
            features: ['Location Services', 'API Integration', 'Responsive Design', 'Data Visualization'],
            technologies: ['JavaScript', 'Weather API', 'CSS Grid', 'LocalStorage'],
            status: 'Completed',
            duration: '1 month'
        },
        chatbot: {
            title: 'AI-Powered Chatbot',
            image: 'images/chatbot.jpg',
            summary: 'An intelligent chatbot with natural language processing.',
            features: ['NLP Integration', 'Context Awareness', 'Multi-turn Conversations', 'API Integration'],
            technologies: ['JavaScript', 'Python', 'OpenAI API', 'Express.js'],
            status: 'In Progress',
            duration: '2 months'
        },
        datavis: {
            title: 'Data Visualization Dashboard',
            image: 'images/data-visualization.jpg',
            summary: 'Interactive dashboard for visualizing complex datasets.',
            features: ['Interactive Charts', 'Real-time Updates', 'Data Filtering', 'Export Functionality'],
            technologies: ['D3.js', 'JavaScript', 'CSS3', 'JSON APIs'],
            status: 'Completed',
            duration: '2 months'
        },
        mobileapp: {
            title: 'Mobile Fitness App',
            image: 'images/mobile-app.jpg',
            summary: 'Cross-platform mobile app for fitness tracking.',
            features: ['Workout Tracking', 'Progress Analytics', 'Social Features', 'Offline Support'],
            technologies: ['React Native', 'JavaScript', 'SQLite', 'Push Notifications'],
            status: 'In Progress',
            duration: '4 months'
        }
    };
    
    // Add click handlers to project cards
    projectCards.forEach(card => {
        // Click on card for modal
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.project-links')) {
                const projectId = this.dataset.project;
                openProjectModal(projectId);
            }
        });
        
        // Enter key for accessibility
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.target.closest('.project-links')) {
                const projectId = this.dataset.project;
                openProjectModal(projectId);
            }
        });
    });
    
    // Modal trigger buttons
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const projectId = this.dataset.project;
            openProjectModal(projectId);
        });
    });
    
    // Open modal function
    function openProjectModal(projectId) {
        const project = projectData[projectId];
        if (!project || !modal) return;
        
        // Create modal content
        const modalContent = `
            <div class="modal-project">
                <img src="${project.image}" alt="${project.title}" class="modal-project-image">
                <div class="modal-project-content">
                    <h2 class="modal-project-title">${project.title}</h2>
                    <p class="modal-project-summary">${project.summary}</p>
                    
                    <div class="modal-project-meta">
                        <span class="modal-meta-item"><strong>Status:</strong> ${project.status}</span>
                        <span class="modal-meta-item"><strong>Duration:</strong> ${project.duration}</span>
                    </div>
                    
                    <div class="modal-section">
                        <h3>Key Features</h3>
                        <ul class="modal-feature-list">
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="modal-section">
                        <h3>Technologies Used</h3>
                        <div class="modal-tech-tags">
                            ${project.technologies.map(tech => `<span class="modal-tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="modal-actions">
                        <a href="project-details.html?project=${projectId}" class="btn btn-primary">View Full Details</a>
                    </div>
                </div>
            </div>
        `;
        
        modalBody.innerHTML = modalContent;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        
        // Focus management
        modalClose.focus();
        
        // Trap focus in modal
        trapFocus(modal);
    }
    
    // Close modal function
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }
    
    // Modal close event listeners
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modal) {
        // Close on background click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
}

// Project details page functionality
function initializeProjectDetails() {
    // Get project parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    
    if (projectId && window.location.pathname.includes('project-details.html')) {
        loadProjectDetails(projectId);
    }
}

function loadProjectDetails(projectId) {
    // Project details data
    const projectDetails = {
        ecommerce: {
            title: 'E-commerce Platform',
            status: 'Completed',
            duration: '3 months',
            team: 'Solo Project',
            year: '2024',
            summary: 'A comprehensive e-commerce platform built from scratch, featuring modern web technologies, secure payment processing, and an intuitive user experience.',
            image: 'images/ecommerce-project.jpg',
            liveDemo: 'https://your-ecommerce-demo.com',
            github: 'https://github.com/yourusername/ecommerce-platform',
            overview: `
                <p>This e-commerce platform was designed to provide a complete online shopping experience with modern features and exceptional user experience. The project demonstrates proficiency in full-stack development, database design, API integration, and security best practices.</p>
                <p>The platform includes comprehensive features such as user authentication, product catalog management, shopping cart functionality, order processing, payment integration, and an administrative dashboard for managing products, orders, and user accounts.</p>
                <p>Special attention was given to responsive design, accessibility standards, and performance optimization to ensure the application works seamlessly across all devices and provides an inclusive user experience.</p>
            `,
            features: [
                { icon: '🛒', title: 'Shopping Cart', desc: 'Advanced shopping cart with persistent storage, quantity management, and real-time price calculations.' },
                { icon: '🔐', title: 'User Authentication', desc: 'Secure user registration and login system with email verification and password recovery.' },
                { icon: '💳', title: 'Payment Processing', desc: 'Integrated payment gateway supporting multiple payment methods with secure transaction handling.' },
                { icon: '📱', title: 'Responsive Design', desc: 'Fully responsive interface that works perfectly on desktop, tablet, and mobile devices.' },
                { icon: '🔍', title: 'Product Search', desc: 'Advanced search and filtering capabilities with category-based navigation and sorting options.' },
                { icon: '📊', title: 'Admin Dashboard', desc: 'Comprehensive admin panel for managing products, orders, users, and viewing analytics.' }
            ],
            implementation: `
                <p>The application follows modern web development best practices with a clear separation of concerns. The frontend is built with vanilla JavaScript to demonstrate core programming skills without framework dependencies, while maintaining clean, modular code structure.</p>
                <p>The backend implements RESTful API design principles with proper HTTP status codes, error handling, and data validation. Database design follows normalization principles with proper indexing for optimal performance.</p>
                <p>Security measures include input sanitization, SQL injection prevention, XSS protection, secure session management, and encrypted password storage using industry-standard hashing algorithms.</p>
            `,
            challenges: [
                { 
                    title: 'Payment Security', 
                    challenge: 'Implementing secure payment processing while maintaining user experience.',
                    solution: 'Integrated Stripe API with client-side encryption and server-side validation, ensuring sensitive payment data never touches our servers while providing smooth checkout flow.'
                },
                { 
                    title: 'Performance Optimization', 
                    challenge: 'Maintaining fast load times with large product catalogs and images.',
                    solution: 'Implemented lazy loading for images, database query optimization, caching strategies, and image compression to achieve excellent performance scores.'
                },
                { 
                    title: 'State Management', 
                    challenge: 'Managing complex application state without external frameworks.',
                    solution: 'Created a custom state management system using JavaScript modules and event-driven architecture to maintain clean separation of concerns.'
                }
            ],
            lessons: [
                'The importance of planning database schema before development to avoid costly refactoring',
                'How proper error handling and user feedback significantly improve user experience',
                'The value of writing clean, documented code for future maintenance and collaboration',
                'Security considerations must be integrated throughout development, not added afterward',
                'Performance optimization requires continuous monitoring and iterative improvement',
                'Accessibility features benefit all users, not just those with disabilities'
            ]
        },
        taskmanager: {
            title: 'Task Management App',
            status: 'Completed',
            duration: '2 months',
            team: 'Solo Project',
            year: '2024',
            summary: 'A collaborative task management application with real-time updates, team collaboration features, and intuitive drag-and-drop interfaces.',
            image: 'images/task-manager.jpg',
            liveDemo: 'https://your-taskmanager-demo.com',
            github: 'https://github.com/yourusername/task-manager',
            overview: `
                <p>This task management application was built to streamline team collaboration and project organization. The app features real-time synchronization, intuitive drag-and-drop interfaces, and comprehensive project tracking capabilities.</p>
                <p>The application supports multiple project boards, task assignments, due date management, and progress tracking. Team members can collaborate in real-time with instant updates and notifications.</p>
                <p>The interface is designed with productivity in mind, featuring keyboard shortcuts, batch operations, and customizable workflows to enhance user efficiency.</p>
            `,
            features: [
                { icon: '📋', title: 'Project Boards', desc: 'Kanban-style boards with customizable columns and workflow stages.' },
                { icon: '👥', title: 'Team Collaboration', desc: 'Real-time collaboration with team member assignments and notifications.' },
                { icon: '🎯', title: 'Task Management', desc: 'Comprehensive task creation, editing, and tracking with due dates and priorities.' },
                { icon: '🔄', title: 'Real-time Updates', desc: 'Instant synchronization across all team members using WebSocket technology.' },
                { icon: '📈', title: 'Progress Tracking', desc: 'Visual progress indicators and project completion analytics.' },
                { icon: '🔍', title: 'Advanced Filtering', desc: 'Smart filters for tasks by status, assignee, due date, and custom criteria.' }
            ],
            implementation: `
                <p>The application architecture focuses on real-time data synchronization using WebSocket technology for instant updates across all connected clients. The frontend implements a component-based architecture for maintainable and reusable code.</p>
                <p>State management is handled through a custom event-driven system that efficiently manages application state and updates the UI reactively. The drag-and-drop functionality is implemented with native HTML5 APIs for optimal performance.</p>
                <p>The backend uses Express.js with Socket.io for real-time communication, implementing proper room management for team-based collaboration and secure data transmission.</p>
            `,
            challenges: [
                { 
                    title: 'Real-time Synchronization', 
                    challenge: 'Ensuring data consistency across multiple users editing simultaneously.',
                    solution: 'Implemented operational transformation techniques and conflict resolution algorithms to handle concurrent edits gracefully.'
                },
                { 
                    title: 'Drag & Drop Performance', 
                    challenge: 'Maintaining smooth drag-and-drop interactions with large task lists.',
                    solution: 'Used virtual scrolling and optimized rendering techniques to handle hundreds of tasks without performance degradation.'
                },
                { 
                    title: 'Offline Functionality', 
                    challenge: 'Providing functionality when users lose internet connection.',
                    solution: 'Implemented service workers and local storage to cache data and sync changes when connection is restored.'
                }
            ],
            lessons: [
                'Real-time applications require careful consideration of data consistency and conflict resolution',
                'Performance optimization is crucial when dealing with large datasets and frequent updates',
                'User experience should gracefully handle network interruptions and edge cases',
                'Proper state management becomes critical in collaborative applications',
                'WebSocket connections need proper error handling and reconnection logic',
                'Testing collaborative features requires simulating multiple concurrent users'
            ]
        },
        weatherapp: {
            title: 'Weather Forecast App',
            status: 'Completed',
            duration: '1 month',
            team: 'Solo Project',
            year: '2024',
            summary: 'A responsive weather application providing accurate forecasts, location-based services, and beautiful visualizations of weather data.',
            image: 'images/weather-app.jpg',
            liveDemo: 'https://your-weather-demo.com',
            github: 'https://github.com/yourusername/weather-app',
            overview: `
                <p>This weather application provides users with accurate, up-to-date weather information through a clean and intuitive interface. The app integrates with multiple weather APIs to ensure data reliability and offers detailed forecasts for any location worldwide.</p>
                <p>Features include current weather conditions, 7-day forecasts, hourly predictions, and weather alerts. The app also provides additional information such as UV index, air quality, and astronomical data like sunrise and sunset times.</p>
                <p>The interface adapts to different weather conditions with dynamic backgrounds and animations, creating an immersive user experience that reflects the current weather state.</p>
            `,
            features: [
                { icon: '🌤️', title: 'Current Weather', desc: 'Real-time weather conditions with detailed metrics and feels-like temperature.' },
                { icon: '📅', title: '7-Day Forecast', desc: 'Extended weather predictions with high/low temperatures and precipitation chances.' },
                { icon: '⏰', title: 'Hourly Forecast', desc: 'Detailed hourly weather data for precise planning and scheduling.' },
                { icon: '📍', title: 'Location Services', desc: 'Automatic location detection and manual location search worldwide.' },
                { icon: '🎨', title: 'Dynamic UI', desc: 'Weather-responsive backgrounds and animations that match current conditions.' },
                { icon: '⚠️', title: 'Weather Alerts', desc: 'Push notifications for severe weather warnings and significant changes.' }
            ],
            implementation: `
                <p>The application uses a service-oriented architecture with separate modules for data fetching, processing, and presentation. Weather data is fetched from multiple APIs with fallback mechanisms to ensure reliability.</p>
                <p>Location services integrate the Geolocation API with geocoding services to convert between coordinates and human-readable addresses. The app implements intelligent caching to minimize API calls and improve performance.</p>
                <p>The UI dynamically adapts using CSS custom properties and JavaScript to create weather-appropriate themes and animations, providing visual feedback that enhances the user experience.</p>
            `,
            challenges: [
                { 
                    title: 'API Rate Limiting', 
                    challenge: 'Managing multiple weather API calls without exceeding rate limits.',
                    solution: 'Implemented intelligent caching, request queuing, and fallback API services to optimize data fetching while staying within limits.'
                },
                { 
                    title: 'Location Accuracy', 
                    challenge: 'Providing accurate weather data for user locations with varying precision.',
                    solution: 'Used multiple location sources including GPS, IP geolocation, and manual search with validation to ensure accurate weather data.'
                },
                { 
                    title: 'Data Visualization', 
                    challenge: 'Presenting complex weather data in an accessible and intuitive format.',
                    solution: 'Created custom charts and visual elements using SVG and Canvas APIs to display trends and forecasts clearly.'
                }
            ],
            lessons: [
                'API integration requires robust error handling and fallback strategies',
                'User location privacy must be handled with appropriate permissions and transparency',
                'Data visualization should prioritize clarity and accessibility over visual complexity',
                'Caching strategies are essential for API-dependent applications',
                'Progressive enhancement ensures functionality across different device capabilities',
                'Weather data requires proper context and explanation for non-technical users'
            ]
        },
        chatbot: {
            title: 'AI-Powered Chatbot',
            status: 'In Progress',
            duration: '2 months',
            team: 'Solo Project',
            year: '2024',
            summary: 'An intelligent chatbot with natural language processing capabilities, context awareness, and multi-turn conversation support.',
            image: 'images/chatbot.jpg',
            liveDemo: 'https://your-chatbot-demo.com',
            github: 'https://github.com/yourusername/ai-chatbot',
            overview: `
                <p>This AI-powered chatbot demonstrates advanced natural language processing capabilities, providing intelligent responses and maintaining context throughout conversations. The bot integrates multiple AI services to understand user intent and provide relevant, helpful responses.</p>
                <p>The chatbot features personality customization, learning capabilities, and integration with external knowledge bases. It can handle various conversation types from casual chat to technical support and information retrieval.</p>
                <p>Currently in development, the bot includes sentiment analysis, conversation memory, and the ability to learn from interactions to improve response quality over time.</p>
            `,
            features: [
                { icon: '🧠', title: 'NLP Processing', desc: 'Advanced natural language understanding with intent recognition and entity extraction.' },
                { icon: '💭', title: 'Context Awareness', desc: 'Maintains conversation context and references previous messages for coherent dialogue.' },
                { icon: '🎭', title: 'Personality Engine', desc: 'Customizable personality traits and response styles for different use cases.' },
                { icon: '📚', title: 'Knowledge Base', desc: 'Integration with external knowledge sources for accurate information retrieval.' },
                { icon: '📊', title: 'Analytics Dashboard', desc: 'Conversation analytics and performance metrics for continuous improvement.' },
                { icon: '🔄', title: 'Learning System', desc: 'Machine learning integration to improve responses based on user feedback.' }
            ],
            implementation: `
                <p>The chatbot architecture combines multiple AI services including OpenAI's GPT models for text generation, sentiment analysis APIs, and custom NLP pipelines for intent classification. The system uses a microservices approach for scalability and maintainability.</p>
                <p>Conversation state is managed through a sophisticated context management system that tracks dialogue history, user preferences, and session information. The bot implements rate limiting and content filtering for safe interactions.</p>
                <p>The frontend provides a modern chat interface with typing indicators, message status, and multimedia support. Real-time communication is handled through WebSocket connections for immediate response delivery.</p>
            `,
            challenges: [
                { 
                    title: 'Context Management', 
                    challenge: 'Maintaining relevant context across long conversations without losing performance.',
                    solution: 'Developed a sliding window approach with semantic similarity scoring to retain the most relevant conversation history.'
                },
                { 
                    title: 'Response Quality', 
                    challenge: 'Ensuring consistent, appropriate, and helpful responses across diverse topics.',
                    solution: 'Implemented multi-stage response validation with content filtering, fact-checking, and appropriateness scoring.'
                },
                { 
                    title: 'Scalability', 
                    challenge: 'Handling multiple concurrent conversations without degrading response times.',
                    solution: 'Used message queuing and load balancing to distribute processing across multiple AI service instances.'
                }
            ],
            lessons: [
                'AI integration requires careful prompt engineering and response validation',
                'Context management is crucial for maintaining coherent conversations',
                'User feedback loops are essential for improving AI system performance',
                'Rate limiting and abuse prevention are critical for AI-powered applications',
                'Conversation analytics provide valuable insights for system optimization',
                'Ethical AI considerations must be built into the system from the beginning'
            ]
        },
        datavis: {
            title: 'Data Visualization Dashboard',
            status: 'Completed',
            duration: '2 months',
            team: 'Solo Project',
            year: '2024',
            summary: 'An interactive dashboard for visualizing complex datasets with dynamic charts, filters, and real-time data updates.',
            image: 'images/data-visualization.jpg',
            liveDemo: 'https://your-datavis-demo.com',
            github: 'https://github.com/yourusername/data-visualization',
            overview: `
                <p>This data visualization dashboard transforms complex datasets into intuitive, interactive visual representations. The platform supports multiple data formats and provides a comprehensive suite of visualization tools for data analysis and presentation.</p>
                <p>The dashboard features real-time data updates, customizable charts, advanced filtering capabilities, and export functionality. Users can create custom dashboards, share visualizations, and collaborate on data analysis projects.</p>
                <p>Built with performance in mind, the dashboard can handle large datasets efficiently while maintaining smooth interactions and responsive design across all device types.</p>
            `,
            features: [
                { icon: '📊', title: 'Interactive Charts', desc: 'Multiple chart types including line, bar, pie, scatter, and custom visualizations with zoom and pan capabilities.' },
                { icon: '🔄', title: 'Real-time Updates', desc: 'Live data synchronization with automatic chart updates and change notifications.' },
                { icon: '🎛️', title: 'Advanced Filters', desc: 'Dynamic filtering system with date ranges, categories, and custom query builders.' },
                { icon: '📤', title: 'Export Functions', desc: 'Multiple export formats including PDF, PNG, SVG, and raw data CSV downloads.' },
                { icon: '🎨', title: 'Custom Themes', desc: 'Customizable color schemes and styling options for branded dashboards.' },
                { icon: '👥', title: 'Collaboration', desc: 'Share dashboards, add comments, and collaborate on data analysis with team members.' }
            ],
            implementation: `
                <p>The visualization engine is built using D3.js for maximum flexibility and performance, with custom chart components optimized for large datasets. The application implements virtual scrolling and data pagination for handling millions of data points efficiently.</p>
                <p>Data processing uses Web Workers to prevent UI blocking during intensive calculations and transformations. The dashboard supports multiple data sources including REST APIs, CSV files, and real-time data streams.</p>
                <p>The architecture follows a modular design with separate components for data processing, visualization rendering, and user interface management, allowing for easy extension and maintenance.</p>
            `,
            challenges: [
                { 
                    title: 'Performance with Large Datasets', 
                    challenge: 'Rendering thousands of data points without compromising interactivity.',
                    solution: 'Implemented data aggregation techniques, virtual rendering, and progressive loading to maintain smooth performance with large datasets.'
                },
                { 
                    title: 'Cross-browser Compatibility', 
                    challenge: 'Ensuring consistent visualization rendering across different browsers and devices.',
                    solution: 'Used progressive enhancement techniques and feature detection to provide optimal experience on all platforms.'
                },
                { 
                    title: 'Real-time Data Synchronization', 
                    challenge: 'Keeping visualizations updated with streaming data without disrupting user interactions.',
                    solution: 'Developed a smart update system that batches changes and uses smooth transitions to update charts without jarring the user experience.'
                }
            ],
            lessons: [
                'Performance optimization is crucial when dealing with large datasets and complex visualizations',
                'User experience should be prioritized over visual complexity in data dashboards',
                'Accessibility in data visualization requires careful consideration of color, contrast, and alternative formats',
                'Real-time data updates need intelligent batching to avoid overwhelming the interface',
                'Export functionality should maintain visual fidelity across different formats',
                'Collaboration features greatly enhance the value of data visualization tools'
            ]
        },
        mobileapp: {
            title: 'Mobile Fitness App',
            status: 'In Progress',
            duration: '4 months',
            team: 'Solo Project',
            year: '2024',
            summary: 'A cross-platform mobile application for fitness tracking with workout planning, progress monitoring, and social features.',
            image: 'images/mobile-app.jpg',
            liveDemo: 'https://your-mobileapp-demo.com',
            github: 'https://github.com/yourusername/fitness-app',
            overview: `
                <p>This comprehensive fitness application helps users track their workouts, monitor progress, and stay motivated through social features and gamification. The app provides personalized workout plans, nutrition tracking, and detailed analytics.</p>
                <p>Built with React Native for cross-platform compatibility, the app features offline functionality, synchronization across devices, and integration with popular fitness devices and health platforms.</p>
                <p>Currently in development, the app includes advanced features like AI-powered workout recommendations, social challenges, and comprehensive health metrics tracking.</p>
            `,
            features: [
                { icon: '💪', title: 'Workout Tracking', desc: 'Comprehensive exercise logging with sets, reps, weights, and personal records tracking.' },
                { icon: '📈', title: 'Progress Analytics', desc: 'Detailed charts and statistics showing fitness progress over time with goal tracking.' },
                { icon: '🥗', title: 'Nutrition Logging', desc: 'Food diary with calorie counting, macro tracking, and meal planning capabilities.' },
                { icon: '👥', title: 'Social Features', desc: 'Connect with friends, share workouts, and participate in fitness challenges.' },
                { icon: '🎯', title: 'Goal Setting', desc: 'Customizable fitness goals with milestone tracking and achievement rewards.' },
                { icon: '📱', title: 'Device Integration', desc: 'Sync with fitness trackers, smartwatches, and health platforms for comprehensive data.' }
            ],
            implementation: `
                <p>The app is built using React Native with TypeScript for type safety and maintainability. State management is handled through Redux Toolkit with RTK Query for efficient data fetching and caching.</p>
                <p>Local data storage uses SQLite with Watermelon DB for offline functionality and fast queries. The app implements background sync to update data when connectivity is restored.</p>
                <p>Push notifications are managed through Firebase Cloud Messaging, providing workout reminders, achievement notifications, and social updates while respecting user preferences.</p>
            `,
            challenges: [
                { 
                    title: 'Cross-platform Consistency', 
                    challenge: 'Ensuring identical functionality and appearance across iOS and Android platforms.',
                    solution: 'Used platform-specific components where necessary and comprehensive testing on both platforms to maintain consistency.'
                },
                { 
                    title: 'Offline Data Management', 
                    challenge: 'Providing full functionality without internet connection and handling data synchronization.',
                    solution: 'Implemented robust offline storage with conflict resolution algorithms for seamless data sync when connection is restored.'
                },
                { 
                    title: 'Battery Optimization', 
                    challenge: 'Tracking workouts and location without significantly impacting device battery life.',
                    solution: 'Used efficient background processing techniques and intelligent sensor usage to minimize battery drain while maintaining accuracy.'
                }
            ],
            lessons: [
                'Mobile app development requires careful consideration of device capabilities and limitations',
                'Offline functionality is essential for fitness apps used in various environments',
                'User engagement features like social elements and gamification significantly improve retention',
                'Performance optimization is crucial for smooth user experience on lower-end devices',
                'Privacy and data security are paramount when handling personal health information',
                'Regular user testing and feedback are essential for mobile app success'
            ]
        }
    };
    
    const project = projectDetails[projectId];
    if (!project) return;
    
    // Update page content
    const elements = {
        title: document.getElementById('project-title'),
        status: document.getElementById('project-status'),
        duration: document.getElementById('project-duration'),
        team: document.getElementById('project-team'),
        year: document.getElementById('project-year'),
        summary: document.getElementById('project-summary'),
        image: document.getElementById('project-hero-img'),
        liveDemo: document.getElementById('live-demo-link'),
        github: document.getElementById('github-link'),
        overview: document.getElementById('project-overview'),
        features: document.getElementById('project-features'),
        implementation: document.getElementById('project-implementation'),
        techStack: document.getElementById('tech-stack'),
        challenges: document.getElementById('project-challenges'),
        lessons: document.getElementById('project-lessons')
    };
    
    // Update basic elements
    if (elements.title) elements.title.textContent = project.title;
    if (elements.status) elements.status.textContent = project.status;
    if (elements.duration) elements.duration.textContent = project.duration;
    if (elements.team) elements.team.textContent = project.team;
    if (elements.year) elements.year.textContent = project.year;
    if (elements.summary) elements.summary.textContent = project.summary;
    if (elements.image) {
        elements.image.src = project.image;
        elements.image.alt = `Detailed view of ${project.title}`;
    }
    if (elements.liveDemo) elements.liveDemo.href = project.liveDemo;
    if (elements.github) elements.github.href = project.github;
    
    // Update overview section
    if (elements.overview && project.overview) {
        elements.overview.innerHTML = project.overview;
    }
    
    // Update features section
    if (elements.features && project.features) {
        elements.features.innerHTML = project.features.map(feature => `
            <div class="feature-item">
                <div class="feature-icon">${feature.icon}</div>
                <h3>${feature.title}</h3>
                <p>${feature.desc}</p>
            </div>
        `).join('');
    }
    
    // Update implementation section
    if (elements.implementation && project.implementation) {
        elements.implementation.innerHTML = project.implementation;
    }
    
    // Update challenges section
    if (elements.challenges && project.challenges) {
        elements.challenges.innerHTML = project.challenges.map(challenge => `
            <div class="challenge-item">
                <h3>${challenge.title}</h3>
                <p><strong>Challenge:</strong> ${challenge.challenge}</p>
                <p><strong>Solution:</strong> ${challenge.solution}</p>
            </div>
        `).join('');
    }
    
    // Update lessons learned section
    if (elements.lessons && project.lessons) {
        elements.lessons.innerHTML = `
            <ul class="lessons-list">
                ${project.lessons.map(lesson => `<li>${lesson}</li>`).join('')}
            </ul>
        `;
    }
    
    // Update page title
    document.title = `${project.title} - Your Name`;
}

// Animation and interaction enhancements
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.interest-card, .project-card, .stat-card, .feature-item, .challenge-item'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Typing effect for hero title (if on homepage)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        addTypingEffect(heroTitle);
    }
    
    // Smooth reveal for sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Typing effect function
function addTypingEffect(element) {
    const text = element.textContent;
    const nameSpan = element.querySelector('.highlight');
    
    if (!nameSpan) return;
    
    const beforeName = text.substring(0, text.indexOf(nameSpan.textContent));
    const afterName = text.substring(text.indexOf(nameSpan.textContent) + nameSpan.textContent.length);
    
    element.innerHTML = `${beforeName}<span class="highlight"></span>${afterName}`;
    const newNameSpan = element.querySelector('.highlight');
    
    const nameText = nameSpan.textContent;
    let i = 0;
    
    function typeWriter() {
        if (i < nameText.length) {
            newNameSpan.textContent += nameText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing after a delay
    setTimeout(typeWriter, 1000);
}

// Focus trap utility for modals
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Form validation (if forms are added later)
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimization
function preloadImages() {
    const images = [
        'images/profile-placeholder.jpg',
        'images/web-development.jpg',
        'images/ai-ml.jpg',
        'images/cloud-computing.jpg',
        'images/cybersecurity.jpg',
        'images/ecommerce-project.jpg',
        'images/task-manager.jpg',
        'images/weather-app.jpg',
        'images/chatbot.jpg',
        'images/data-visualization.jpg',
        'images/mobile-app.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
if (window.requestIdleCallback) {
    window.requestIdleCallback(preloadImages);
} else {
    setTimeout(preloadImages, 2000);
}

// Add CSS for animations
const animationCSS = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .modal-project {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        align-items: start;
    }
    
    .modal-project-image {
        width: 100%;
        height: 250px;
        object-fit: cover;
        border-radius: 12px;
    }
    
    .modal-project-title {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 1rem;
    }
    
    .modal-project-summary {
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 1.5rem;
    }
    
    .modal-project-meta {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
    }
    
    .modal-meta-item {
        background: var(--background-alt);
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-size: 0.9rem;
        color: var(--text-secondary);
    }
    
    .modal-section {
        margin-bottom: 1.5rem;
    }
    
    .modal-section h3 {
        color: var(--text-primary);
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
    }
    
    .modal-feature-list {
        list-style: none;
        padding: 0;
    }
    
    .modal-feature-list li {
        padding: 0.25rem 0;
        color: var(--text-secondary);
        position: relative;
        padding-left: 1.5rem;
    }
    
    .modal-feature-list li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--primary-color);
        font-weight: bold;
    }
    
    .modal-tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    
    .modal-tech-tag {
        background: var(--primary-color);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: 500;
    }
    
    .modal-actions {
        margin-top: 2rem;
    }
    
    @media (max-width: 768px) {
        .modal-project {
            grid-template-columns: 1fr;
        }
    }
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = animationCSS;
document.head.appendChild(style);

// Console message for recruiters ;)
console.log(`
    👋 Hello there!
    
    Thanks for checking out my portfolio code!
    This site was built with vanilla HTML, CSS, and JavaScript
    to demonstrate core web development skills.
    
    Features implemented:
    ✅ Responsive design
    ✅ Accessibility (WCAG compliant)
    ✅ Interactive modals
    ✅ Smooth animations
    ✅ Performance optimizations
    ✅ Clean, maintainable code
    
    Feel free to reach out if you'd like to discuss this project!
`);

// Error handling
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Service worker registration (if you add one later)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // navigator.serviceWorker.register('/sw.js');
    });
}