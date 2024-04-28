const app = Vue.createApp({
    data() {
        return {
            items: null,
            keyword: '',
            message: '',
        }
    },
    watch: {
        keyword(newKey, oldKey) {
            this.message = 'Waiting for you stop typing'
            this.debouncedGetAnswer()
        }
    },
    mounted: function () {
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 1000)
    },
    methods: {
        getAnswer() {
            if (this.keyword === '') {
                this.items = null
                return
            }
            this.message = 'Loading...'
            const vm = this
            const params = { page: 1, per_page: 20, query: this.keyword }
            axios.get('https://qiita.com/api/v2/items', { params })
                .then(function (response) {
                    vm.items = response.data
                }).catch(function (error) {
                    vm.message = 'Error!' + error
                }).finally(function () {
                    vm.message = ''
                })
        }
    }
})
app.mount('#app')
