<template>
    <div class="poll">
        <p>Date: {{ poll.date }}</p>
        <p>
            Score: {{ poll.score }} /
            {{ poll.out_of }}
        </p>
        Present:
        <ul>
            <li :key="user._id" v-for="user in poll_users()">
                {{ user.name }}
            </li>
        </ul>
    </div>
</template>

<script>
import _ from 'lodash'
import PollsMixin from '@/mixins/PollsMixin'
import UsersMixin from '@/mixins/UsersMixin'

export default {
    name: 'Poll',
    mixins: [PollsMixin, UsersMixin],
    components: {},
    props: ['poll'],
    computed: {},
    filters: {},
    methods: {
        users() {
            return this.listUsers
        },
        poll_users() {
            return _.filter(this.listUsers, user => {
                return _.includes(this.poll.present, user._id)
            })
        },
    },
}
</script>
