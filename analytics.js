// Real-time Analytics Dashboard
class AnalyticsDashboard {
    constructor() {
        this.isVisible = false;
        this.sessionData = this.initSessionData();
        this.init();
    }
    
    initSessionData() {
        const stored = localStorage.getItem('raj-analytics') || '{}';
        const data = JSON.parse(stored);
        
        return {
            visits: data.visits || 0,
            pageViews: data.pageViews || 0,
            timeSpent: data.timeSpent || 0,
            sections: data.sections || {},
            countries: data.countries || {},
            devices: data.devices || {},
            referrers: data.referrers || {},
            lastVisit: data.lastVisit || Date.now()
        };
    }
    
    init() {
        this.trackSession();
        this.createDashboard();
        this.bindEvents();
        this.startRealTimeUpdates();
    }
    
    trackSession() {
        // Track visit
        this.sessionData.visits++;
        this.sessionData.pageViews++;
        this.sessionData.lastVisit = Date.now();
        
        // Track device
        const device = this.getDeviceType();
        this.sessionData.devices[device] = (this.sessionData.devices[device] || 0) + 1;
        
        // Track referrer
        const referrer = this.getReferrer();
        this.sessionData.referrers[referrer] = (this.sessionData.referrers[referrer] || 0) + 1;
        
        // Track location (mock data)
        const country = this.getCountry();
        this.sessionData.countries[country] = (this.sessionData.countries[country] || 0) + 1;
        
        this.saveData();
    }
    
    createDashboard() {
        const dashboardHTML = `
            <div id="analytics-dashboard" class="analytics-dashboard">
                <div class="analytics-toggle" id="analyticsToggle">
                    <span class="analytics-icon">📊</span>
                    <span class="analytics-text">Analytics</span>
                </div>
                <div class="analytics-panel" id="analyticsPanel">
                    <div class="analytics-header">
                        <h3>📊 Live Analytics</h3>
                        <button class="analytics-close" id="analyticsClose">×</button>
                    </div>
                    <div class="analytics-content">
                        <div class="analytics-grid">
                            <div class="metric-card">
                                <div class="metric-value" id="totalVisits">${this.sessionData.visits}</div>
                                <div class="metric-label">Total Visits</div>
                            </div>
                            <div class="metric-card">
                                <div class="metric-value" id="pageViews">${this.sessionData.pageViews}</div>
                                <div class="metric-label">Page Views</div>
                            </div>
                            <div class="metric-card">
                                <div class="metric-value" id="timeSpent">${this.formatTime(this.sessionData.timeSpent)}</div>
                                <div class="metric-label">Time Spent</div>
                            </div>
                            <div class="metric-card">
                                <div class="metric-value" id="activeUsers">1</div>
                                <div class="metric-label">Active Users</div>
                            </div>
                        </div>
                        
                        <div class="analytics-section">
                            <h4>🌍 Geographic Distribution</h4>
                            <div class="chart-container" id="countryChart"></div>
                        </div>
                        
                        <div class="analytics-section">
                            <h4>📱 Device Types</h4>
                            <div class="chart-container" id="deviceChart"></div>
                        </div>
                        
                        <div class="analytics-section">
                            <h4>🔗 Traffic Sources</h4>
                            <div class="chart-container" id="referrerChart"></div>
                        </div>
                        
                        <div class="analytics-section">
                            <h4>📈 GitHub Stats</h4>
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
                                    <span class="stat-label">Stars:</span>
                                    <span class="stat-value" id="starCount">Loading...</span>
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
            this.updateCharts();
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
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id || 'unknown';
                    this.sessionData.sections[sectionId] = (this.sessionData.sections[sectionId] || 0) + 1;
                    this.saveData();
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('section[id]').forEach(section => {
            observer.observe(section);
        });
    }
    
    startTimeTracking() {
        let startTime = Date.now();
        
        setInterval(() => {
            this.sessionData.timeSpent += 1;
            this.saveData();
            
            if (this.isVisible) {
                document.getElementById('timeSpent').textContent = this.formatTime(this.sessionData.timeSpent);
            }
        }, 1000);
    }
    
    startRealTimeUpdates() {
        setInterval(() => {
            if (this.isVisible) {
                this.updateMetrics();
            }
        }, 5000);
    }
    
    updateMetrics() {
        document.getElementById('totalVisits').textContent = this.sessionData.visits;
        document.getElementById('pageViews').textContent = this.sessionData.pageViews;
        document.getElementById('activeUsers').textContent = Math.floor(Math.random() * 3) + 1; // Mock active users
    }
    
    updateCharts() {
        this.renderChart('countryChart', this.sessionData.countries, '🌍');
        this.renderChart('deviceChart', this.sessionData.devices, '📱');
        this.renderChart('referrerChart', this.sessionData.referrers, '🔗');
    }
    
    renderChart(containerId, data, icon) {
        const container = document.getElementById(containerId);
        const total = Object.values(data).reduce((sum, val) => sum + val, 0);
        
        container.innerHTML = Object.entries(data)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([key, value]) => {
                const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                return `
                    <div class="chart-item">
                        <div class="chart-label">${icon} ${key}</div>
                        <div class="chart-bar">
                            <div class="chart-fill" style="width: ${percentage}%"></div>
                        </div>
                        <div class="chart-value">${value} (${percentage}%)</div>
                    </div>
                `;
            }).join('');
    }
    
    async fetchGitHubStats() {
        try {
            const response = await fetch('https://api.github.com/users/rajkthakur');
            const data = await response.json();
            
            document.getElementById('repoCount').textContent = data.public_repos || 'N/A';
            document.getElementById('followerCount').textContent = data.followers || 'N/A';
            
            // Fetch total stars
            const reposResponse = await fetch('https://api.github.com/users/rajkthakur/repos');
            const repos = await reposResponse.json();
            const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
            document.getElementById('starCount').textContent = totalStars;
            
        } catch (error) {
            console.log('GitHub API rate limited or unavailable');
            document.getElementById('repoCount').textContent = '20+';
            document.getElementById('followerCount').textContent = '50+';
            document.getElementById('starCount').textContent = '100+';
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
    
    getCountry() {
        // Mock country detection - in production, use IP geolocation service
        const countries = ['United States', 'India', 'Canada', 'United Kingdom', 'Germany'];
        return countries[Math.floor(Math.random() * countries.length)];
    }
    
    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) return `${hours}h ${minutes}m`;
        if (minutes > 0) return `${minutes}m ${secs}s`;
        return `${secs}s`;
    }
    
    saveData() {
        localStorage.setItem('raj-analytics', JSON.stringify(this.sessionData));
    }
}

// Initialize analytics dashboard
document.addEventListener('DOMContentLoaded', () => {
    new AnalyticsDashboard();
});