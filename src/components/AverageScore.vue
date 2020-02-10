<template>
    <Progress
        strokeColor="#606061"
        :transitionDuration="2000"
        :radius="20"
        :strokeWidth="4"
        :value="progressValue()"
        class="average-score"
    >
        <div class="content">{{ pollAverage }}<span>/10</span></div>
    </Progress>
</template>

<script>
import Progress from 'easy-circular-progress'
import PollsMixin from "@/mixins/PollsMixin";
import _ from 'lodash'

export default {
    name: "AverageScore",
    components: { Progress },
    mixins: [ PollsMixin ],
    methods: {
        progressValue: function() {
            return this.pollAverage * 10
        }
    },
    computed: {
        pollAverage() {
            const total = _.reduce(this.listPolls, function(result, value) {
                return result + value.score;
            }, 0);
            const len = _.isNil(this.listPolls.length) || this.listPolls.length === 0 ? 1 : this.listPolls.length

            return Math.round(total/len)
        },
    }
}
</script>

<style lang="sass">
    .average-score
        .content
            // height: 48px;
            font-weight: bold;
            font-size: 1.2rem;

            span
                font-size: 0.5rem;
</style>