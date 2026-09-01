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
        
        // Current Role Duration (AWS Neuron, from Dec 2022)
        const currentRoleStart = new Date('2022-12-01');
        const currentRoleDuration = this.calculateDuration(currentRoleStart);

        // SDE II Duration
        const sdeStart = new Date('2020-06-01');
        const sdeEnd = new Date('2022-12-01');
        const sdeDuration = this.calculateDuration(sdeStart, sdeEnd);

        // Update DOM elements. Indices track .role-duration order in the AWS
        // timeline entry: 0 = current role, 1 = SDE II. Roles below AWS are
        // static and intentionally not rewritten here.
        this.updateElement('.duration', `${awsTotal} • Full-time`);
        this.updateElement('.role-duration', currentRoleDuration, 0);
        this.updateElement('.role-duration', sdeDuration, 1);
    }
    
    updateElement(selector, text, index = null) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            if (index !== null && elements[index]) {
                // Replace only the duration that follows the bullet, and leave the
                // date range untouched. Appending " - Present" here marked completed
                // roles as ongoing and doubled it on the current role.
                const element = elements[index];
                const dateRange = element.textContent.split('•')[0].trim();
                element.textContent = `${dateRange} • ${text}`;
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