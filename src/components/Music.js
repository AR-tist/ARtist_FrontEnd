class Music {
    constructor(data) {
        this.timestamp = data.timestamp;
        this.filename = data.filename;
        this.title = data.title;
        this.imgurl = data.imgurl;
        this.subtitle = data.subtitle;
        this.rank = data.rank;
        this.poster = data.poster;
        this.like = data.like;
        this.views = data.views;
        this.music_length = data.music_length;
        this.downloadUrl = data.downloadUrl;
        this.deleteUrl = data.deleteUrl;
        this.id = data.id;
    }

    getTimestamp() {
        return this.timestamp;
    }

    getFilename() {
        return this.filename;
    }

    getTitle() {
        return this.title;
    }

    getImgurl() {
        return this.imgurl;
    }

    getSubtitle() {
        return this.subtitle;
    }

    getRank() {
        return this.rank;
    }

    getPoster() {
        return this.poster;
    }

    getLike() {
        return this.like;
    }

    getViews() {
        return this.views;
    }

    getMusicLength() {
        return this.music_length;
    }

    getDownloadUrl() {
        return this.downloadUrl;
    }

    getDeleteUrl() {
        return this.deleteUrl;
    }

    getId() {
        return this.id;
    }
}

export default Music;
