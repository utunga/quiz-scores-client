<template>
  <div class="polls container is-widescreen">
    <line-chart :chart-data="dataCollection" :options="options" />
  </div>
</template>
<style scoped>
</style>

<script>
import _ from 'lodash'
import Moment from 'moment'
import chroma from 'chroma-js'

import vueAddPoll from '@/views/AddPoll.vue'
import vueChart from '@/components/Chart.vue'
import vuePoll from '@/views/Poll.vue'
import PollsMixin from '@/mixins/PollsMixin'
import UsersMixin from '@/mixins/UsersMixin'

// visibility filters
let filters = {
    all(polls) {
        return polls
    },
    latest(polls) {
        return polls.filter(function(poll) {
            return poll.status === 'proposed'
        })
    },
}

export default {
    name: 'Polls',
    mixins: [PollsMixin, UsersMixin],
    components: {
        addPoll: vueAddPoll,
        LineChart: vueChart,
        poll: vuePoll,
    },
    data: () => ({
        dataCollection: {
            labels: [],
            datasets: [],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            lineTension: 0,
        },
    }),
    mounted() {
        // handle routing
        const onHashChange = () => {
            let visibility = window.location.hash.replace(/#\/?/, '')
            if (filters[visibility]) {
                this.visibility = visibility
            } else {
                window.location.hash = ''
                this.visibility = 'all'
            }
        }
        window.addEventListener('hashchange', onHashChange)
        onHashChange()
    },
    watch: {
        listPolls() {
            const labels = []
            const datasets = []
            const polls = _.sortBy(this.listPolls, ['date'])
            _.forEach(polls, function(value) {
                const label = Moment(value.date).format('D MMM YYYY')
                labels.push(label)

                datasets.push(value.score)
            })
            const maxScore = _.reduce(
                polls,
                function(result, value) {
                    return Math.max(result, value.score)
                },
                0
            )
            const minScore = _.reduce(
                polls,
                function(result, value) {
                    return Math.min(result, value.score)
                },
                0
            )
            this.dataCollection = {
                datasets: [
                    {
                        label: 'score',
                        backgroundColor: context => {
                            const index = context.dataIndex
                            const value = context.dataset.data[index]

                            const colour = chroma
                                .scale(['red', 'green'])
                                .domain([minScore, maxScore])

                            return colour(value).hex()
                        },
                        data: datasets,
                        fill: false,
                        lineTension: 0,
                    },
                ],
                labels,
            }
        },
    },
    computed: {
        users() {
            return this.listUsers
        },
        polls() {
            return this.listPolls
        },
        currDay() {
            var dateObj = new Date()
            var month = dateObj.getUTCMonth() + 1 //months from 1-12
            var day = dateObj.getUTCDate()
            var year = dateObj.getUTCFullYear()
            return Date.parse(year, month, day)
        },
        scoreDropdown() {
            return {
                options: _.map([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], val => {
                    return { value: val }
                }),
                placeholder: this.currScore,
                prefix: 'Score',
                backgroundColor: 'white',
                textColor: 'black',
                borderRadius: '0em',
                border: '1px solid gray',
            }
        },
        userDropdown() {
            return {
                options: _.map(this.users, val => {
                    return { value: val.name }
                }),
                placeholder: this.currentUser,
                prefix: 'Current User:',
                backgroundColor: 'white',
                textColor: 'black',
                borderRadius: '0em',
                border: '1px solid gray',
            }
        },
        filteredPolls() {
            return this.listPolls
        },
    },
    filters: {
        pluralize(n) {
            return n === 1 ? 'poll' : 'polls'
        },
    },
    methods: {
        addPoll() {
            let value = this.nextDate
            if (!value) {
                return
            }

            const { Poll } = this.$FeathersVuex
            let poll = new Poll({
                date: this.nextDate,
                score: this.score,
                out_of: this.out_of,
            })
            poll.save({})
            this.visibility = 'all'
            this.nextDate = null
        },
        deletePoll(poll) {
            poll.remove({})
        },
        editPoll(poll) {
            this.beforeEditCache = poll
            this.editingDate = poll
        },
        doneEdit(poll) {
            if (!this.editingDate) {
                return
            }
            this.editingDate = null
            poll.title = poll.title.trim()

            poll.save({})

            if (!poll.title) {
                this.removePoll(poll)
            }
        },
        cancelEdit(poll) {
            this.editingDate = null
            poll.title = this.beforeEditCache
        },
        setScore(selectedOption) {
            this.currScore = selectedOption.value
        },
    },
}
</script>

<style lang="scss">
@import '../styles/pollsmvc_app.scss';
</style>
