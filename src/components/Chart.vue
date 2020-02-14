<script>
import UsersMixin from '@/mixins/UsersMixin'
import PollsMixin from '@/mixins/PollsMixin'

import { Line } from 'vue-chartjs'

import _ from 'lodash'
import Moment from 'moment'
import chroma from 'chroma-js'

export default {
    extends: Line,
    mixins: [PollsMixin, UsersMixin],
    data: () => ({
        chartData: {
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
            this.chartData.datasets = [
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
            ]
            this.chartData.labels = labels
            this.$data._chart.update()
        },
    },
    mounted() {
        this.renderChart(this.chartData, this.options)
    },
}
</script>
