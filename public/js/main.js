require(['util', 'effect'], function (util, effect) {

    Vue.use(VueResource);
    new Vue({
        el: "body",
        data: {
            playlist: [],
            index: -1,
            votingDisabled: false
        },
        methods: {
            loadUrl: function (url) {
                var audio = document.getElementById("music")
                audio.crossOrigin = "anonymous"
                audio.src = url;
                audio.play();
                effect.beginDraw();
            },
            next: function () {
                this.index++;
                this.play()
            },
            prev: function () {
                this.index--;
                this.play()
            },
            play: function() {
                if (this.index >= this.playlist.length) {
                    this.index = 0;
                } else if(this.index < 0) {
                    this.index = this.playlist.length - 1;
                }

                var submission = this.playlist[this.index];
                this.votingDisabled = !!localStorage["voted_" + submission.id];
                this.loadUrl(submission.url)
            },
            upvote: function (submission) {
                this.votingDisabled = true;
                localStorage["voted_" + submission.id] = true;
                this.$http.post("/api/submissions/upvote", {submission: submission.id})
            }
        },
        ready: function () {
            this.$http.get("/api/submissions")
                .then(function (submissions) {
                    this.playlist = submissions.json()
                    this.next();
                })
        }
    })
});