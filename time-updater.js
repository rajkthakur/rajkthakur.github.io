// Dynamic Time Updater for Work Experience
class TimeUpdater {
    constructor() {
        this.init();
    }
    
    init() {
        this.updateExperienceDurations();
        // Update every hour
        setInterval(() => this.updateExperienceDurations(), 3600000);
    }
    
    calculateDuration(startDate, endDate = null) {
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : new Date();
        
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        const years = Math.floor(diffDays / 365);
        const months = Math.floor((diffDays % 365) / 30);
        
        if (years > 0) {
            return months > 0 ? `${years} yr${years > 1 ? 's' : ''} ${months} mo${months > 1 ? 's' : ''}` : `${years} yr${years > 1 ? 's' : ''}`;
        } else {
            return `${months} mo${months > 1 ? 's' : ''}`;
        }
    }
    
    updateExperienceDurations() {
        // AWS Total Duration
        const awsStart = new Date('2020-06-01');
        const awsTotal = this.calculateDuration(awsStart);
        
        // Current Role Duration
        const currentRoleStart = new Date('2024-07-01');
        const currentRoleDuration = this.calculateDuration(currentRoleStart);
        
        // AI SDE II Duration
        const aiSdeStart = new Date('2022-12-01');
        const aiSdeEnd = new Date('2024-07-01');
        const aiSdeDuration = this.calculateDuration(aiSdeStart, aiSdeEnd);
        
        // SDE II Duration
        const sdeStart = new Date('2020-06-01');
        const sdeEnd = new Date('2022-12-01');
        const sdeDuration = this.calculateDuration(sdeStart, sdeEnd);
        
        // Update DOM elements
        this.updateElement('.duration', `${awsTotal} • Full-time`);
        this.updateElement('.role-duration', currentRoleDuration, 0);
        this.updateElement('.role-duration', aiSdeDuration, 1);
        this.updateElement('.role-duration', sdeDuration, 2);
    }
    
    updateElement(selector, text, index = null) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            if (index !== null && elements[index]) {
                const element = elements[index];
                const parts = element.textContent.split(' • ');
                if (parts.length > 1) {
                    element.textContent = `${parts[0]} - Present • ${text}`;
                } else {
                    element.textContent = element.textContent.replace(/\d+\s+yr.*?\s+\d+\s+mos?|\d+\s+mos?/, text);
                }
            } else {
                elements[0].textContent = text;
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TimeUpdater();
});