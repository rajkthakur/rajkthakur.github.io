// Professional Stats Dashboard
class AnalyticsDashboard {
    constructor() {
        this.isVisible = false;
        this.sessionStart = Date.now();
        this.githubData = null;
        this.init();
    }
    
    init() {
        this.createDashboard();
        this.bindEvents();
        this.startTimeTracking();
    }
    
    createDashboard() {
        console.log('Creating analytics dashboard with Organizations section');
        const dashboardHTML = `
            <div id="analytics-dashboard" class="analytics-dashboard">
                <div class="analytics-toggle" id="analyticsToggle">
                    <span class="analytics-icon">📊</span>
                    <span class="analytics-text">Analytics</span>
                </div>
                <div class="analytics-panel" id="analyticsPanel">
                    <div class="analytics-header">
                        <h3>📊 Professional Stats</h3>
                        <button class="analytics-close" id="analyticsClose">×</button>
                    </div>
                    <div class="analytics-content">
                        <div class="analytics-grid">
                            <div class="metric-card">
                                <div class="metric-value" id="sessionTime">0s</div>
                                <div class="metric-label">Session Time</div>
                            </div>
                            <div class="metric-card">
                                <div class="metric-value" id="sectionsViewed">0</div>
                                <div class="metric-label">Sections Viewed</div>
                            </div>
                            <div class="metric-card">
                                <div class="metric-value" id="deviceType">Desktop</div>
                                <div class="metric-label">Your Device</div>
                            </div>
                            <div class="metric-card">
                                <div class="metric-value" id="referrerSource">Direct</div>
                                <div class="metric-label">Traffic Source</div>
                            </div>
                        </div>
                        
                        <div class="analytics-section">
                            <h4>📈 GitHub Profile</h4>
                            <div class="github-stats" id="githubStats">
                                <div class="stat-item">
                                    <span class="stat-label">Repositories:</span>
                                    <span class="stat-value" id="repoCount">Loading...</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Followers:</span>
                                    <span class="stat-value" id="followerCount">Loading...</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Total Stars:</span>
                                    <span class="stat-value" id="starCount">Loading...</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Total Forks:</span>
                                    <span class="stat-value" id="forkCount">Loading...</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="analytics-section">
                            <h4>💻 Top Languages</h4>
                            <div class="chart-container" id="languageChart">Loading...</div>
                        </div>
                        
                        <div class="analytics-section">
                            <h4>⭐ Top Repositories</h4>
                            <div class="repo-list" id="topRepos">Loading...</div>
                        </div>
                        
                        <div class="analytics-section">
                            <h4>🏢 Organizations</h4>
                            <div class="github-stats" id="orgStats">
                                <div class="stat-item">
                                    <span class="stat-label">Amazon Web Services:</span>
                                    <span class="stat-value">Senior ML Engineer</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">GitHub Orgs:</span>
                                    <span class="stat-value" id="orgCount">Loading...</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Open Source:</span>
                                    <span class="stat-value">Active Contributor</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="analytics-section">
                            <h4>🏢 Organizations</h4>
                            <div class="github-stats" id="orgStats">
                                <div class="stat-item">
                                    <span class="stat-label">Amazon Web Services:</span>
                                    <span class="stat-value">Senior ML Engineer</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">GitHub Orgs:</span>
                                    <span class="stat-value" id="orgCount">Loading...</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Open Source:</span>
                                    <span class="stat-value">Active Contributor</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="analytics-section">
                            <h4>🌐 GitHub Pages Site</h4>
                            <div class="github-stats" id="pagesStats">
                                <div class="stat-item">
                                    <span class="stat-label">Site URL:</span>
                                    <span class="stat-value">rajkthakur.github.io</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Last Updated:</span>
                                    <span class="stat-value" id="lastCommit">Loading...</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Site Commits:</span>
                                    <span class="stat-value" id="commitCount">Loading...</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Site Size:</span>
                                    <span class="stat-value" id="repoSize">Loading...</span>
                                </div>
                            </div>
                        </div>
                        

                        
                        <div class="analytics-section">
                            <h4>📝 Medium Stats</h4>
                            <div class="medium-stats" id="mediumStats">
                                <div class="stat-item">
                                    <span class="stat-label">Publication:</span>
                                    <span class="stat-value">Software System Design</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Articles:</span>
                                    <span class="stat-value">15+ Technical Posts</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Focus:</span>
                                    <span class="stat-value">System Architecture</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', dashboardHTML);
    }
    
    bindEvents() {
        const toggle = document.getElementById('analyticsToggle');
        const close = document.getElementById('analyticsClose');
        
        toggle.addEventListener('click', () => this.toggleDashboard());
        close.addEventListener('click', () => this.closeDashboard());
        
        // Track section views
        this.trackSectionViews();
        
        // Track time spent
        this.startTimeTracking();
    }
    
    toggleDashboard() {
        this.isVisible = !this.isVisible;
        const panel = document.getElementById('analyticsPanel');
        const toggle = document.getElementById('analyticsToggle');
        
        if (this.isVisible) {
            panel.style.display = 'block';
            toggle.style.display = 'none';
            this.fetchGitHubStats();
        } else {
            panel.style.display = 'none';
            toggle.style.display = 'flex';
        }
    }
    
    closeDashboard() {
        this.isVisible = false;
        document.getElementById('analyticsPanel').style.display = 'none';
        document.getElementById('analyticsToggle').style.display = 'flex';
    }
    
    trackSectionViews() {
        let sectionsViewed = new Set();
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id || 'unknown';
                    sectionsViewed.add(sectionId);
                    if (this.isVisible) {
                        document.getElementById('sectionsViewed').textContent = sectionsViewed.size;
                    }
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('section[id]').forEach(section => {
            observer.observe(section);
        });
    }
    
    startTimeTracking() {
        setInterval(() => {
            if (this.isVisible) {
                const elapsed = Math.floor((Date.now() - this.sessionStart) / 1000);
                document.getElementById('sessionTime').textContent = this.formatTime(elapsed);
            }
        }, 1000);
        
        // Set device type and referrer once
        document.getElementById('deviceType').textContent = this.getDeviceType();
        document.getElementById('referrerSource').textContent = this.getReferrer();
    }
    
    async fetchGitHubStats() {
        try {
            // Fetch user profile
            const userResponse = await fetch('https://api.github.com/users/rajkthakur');
            const userData = await userResponse.json();
            
            document.getElementById('repoCount').textContent = userData.public_repos || 'N/A';
            document.getElementById('followerCount').textContent = userData.followers || 'N/A';
            
            // Fetch repositories
            const reposResponse = await fetch('https://api.github.com/users/rajkthakur/repos?sort=stars&per_page=100');
            const repos = await reposResponse.json();
            
            // Calculate totals
            const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
            const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
            
            document.getElementById('starCount').textContent = totalStars;
            document.getElementById('forkCount').textContent = totalForks;
            
            // Show top repositories
            this.displayTopRepos(repos.slice(0, 5));
            
            // Show language distribution
            this.displayLanguages(repos);
            
            // Fetch GitHub Pages site stats
            this.fetchPagesStats();
            
            // Fetch organizations
            this.fetchOrganizations();
            

            
        } catch (error) {
            console.log('GitHub API rate limited or unavailable');
            document.getElementById('repoCount').textContent = '25+';
            document.getElementById('followerCount').textContent = '75+';
            document.getElementById('starCount').textContent = '150+';
            document.getElementById('forkCount').textContent = '50+';
        }
    }
    
    displayTopRepos(repos) {
        const container = document.getElementById('topRepos');
        container.innerHTML = repos.map(repo => `
            <div class="repo-item">
                <div class="repo-name">${repo.name}</div>
                <div class="repo-stats">
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>🍴 ${repo.forks_count}</span>
                    <span class="repo-lang">${repo.language || 'N/A'}</span>
                </div>
            </div>
        `).join('');
    }
    
    displayLanguages(repos) {
        const languages = {};
        repos.forEach(repo => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });
        
        const sortedLangs = Object.entries(languages)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);
            
        const total = Object.values(languages).reduce((sum, count) => sum + count, 0);
        
        const container = document.getElementById('languageChart');
        container.innerHTML = sortedLangs.map(([lang, count]) => {
            const percentage = Math.round((count / total) * 100);
            return `
                <div class="chart-item">
                    <div class="chart-label">💻 ${lang}</div>
                    <div class="chart-bar">
                        <div class="chart-fill" style="width: ${percentage}%"></div>
                    </div>
                    <div class="chart-value">${count} (${percentage}%)</div>
                </div>
            `;
        }).join('');
    }
    
    async fetchPagesStats() {
        try {
            const repoResponse = await fetch('https://api.github.com/repos/rajkthakur/rajkthakur.github.io');
            const repoData = await repoResponse.json();
            
            const commitsResponse = await fetch('https://api.github.com/repos/rajkthakur/rajkthakur.github.io/commits?per_page=1');
            const commits = await commitsResponse.json();
            
            if (commits.length > 0) {
                const lastCommit = new Date(commits[0].commit.committer.date);
                document.getElementById('lastCommit').textContent = lastCommit.toLocaleDateString();
            }
            
            const allCommitsResponse = await fetch('https://api.github.com/repos/rajkthakur/rajkthakur.github.io/commits?per_page=100');
            const allCommits = await allCommitsResponse.json();
            document.getElementById('commitCount').textContent = allCommits.length + '+';
            
            const sizeKB = repoData.size;
            const sizeMB = (sizeKB / 1024).toFixed(1);
            document.getElementById('repoSize').textContent = sizeMB + ' MB';
            
        } catch (error) {
            document.getElementById('lastCommit').textContent = 'Recently';
            document.getElementById('commitCount').textContent = '50+';
            document.getElementById('repoSize').textContent = '2.5 MB';
        }
    }
    
    async fetchOrganizations() {
        try {
            const orgsResponse = await fetch('https://api.github.com/users/rajkthakur/orgs');
            const orgs = await orgsResponse.json();
            
            if (orgs.length > 0) {
                document.getElementById('orgCount').textContent = orgs.length + ' organizations';
            } else {
                document.getElementById('orgCount').textContent = 'Private organizations';
            }
            
        } catch (error) {
            document.getElementById('orgCount').textContent = 'AWS + Others';
        }
    }
    

    
    getDeviceType() {
        const ua = navigator.userAgent;
        if (/tablet|ipad|playbook|silk/i.test(ua)) return 'Tablet';
        if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(ua)) return 'Mobile';
        return 'Desktop';
    }
    
    getReferrer() {
        const ref = document.referrer;
        if (!ref) return 'Direct';
        if (ref.includes('google')) return 'Google';
        if (ref.includes('linkedin')) return 'LinkedIn';
        if (ref.includes('github')) return 'GitHub';
        if (ref.includes('medium')) return 'Medium';
        return 'Other';
    }
    
    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) return `${hours}h ${minutes}m`;
        if (minutes > 0) return `${minutes}m ${secs}s`;
        return `${secs}s`;
    }
}

// Initialize analytics dashboard
document.addEventListener('DOMContentLoaded', () => {
    new AnalyticsDashboard();
});