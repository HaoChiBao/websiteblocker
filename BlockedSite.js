class BlockedSite {
    constructor(site, title = 'unnamed') {
        this.site = site;
        this.title = title;
        this.date = {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            day: new Date().getDate(),
        }
    }
}