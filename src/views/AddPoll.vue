<template>
    <div>
        <button class="button is-primary is-medium"
            @click="isModalOpen = true"
        >
            Add new poll
        </button>
        <b-modal :active.sync="isModalOpen" :width="640">
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-head-title">New poll</p>
                </header>
                <div class="modal-card-body">
                    <div class="content">
                        <b-field label="Select a date" custom-class="is-small">
                            <b-datepicker
                                ref="date"
                                placeholder="Choose poll date"
                                icon="calendar"
                                v-model="date">
                            </b-datepicker>
                        </b-field>
                        <b-field label="Score" custom-class="is-small">
                            <b-input
                                ref="scored"
                                placeholder="score"
                                size="is-large">
                            </b-input>
                        </b-field>

                        <b-field label="Players" custom-class="is-small">
                            <div class="field is-grouped">
                                <b-checkbox-button 
                                    v-for="user in users()"
                                    v-model="usersGroup"
                                    :native-value="user._id"
                                    :key="user._id"
                                    class="is-rounded">
                                    <span>{{ user.name }}</span>
                                </b-checkbox-button>
                            </div>
                        </b-field>
                    </div>
                </div>
                 <footer class="modal-card-foot">
                    <div class="">
                        <b-button
                            type="is-primary"
                            @click="save"
                        >
                        Save
                        </b-button>
                    </div>
                </footer>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import UsersMixin from "@/mixins/UsersMixin";
    import PollsMixin from "@/mixins/PollsMixin";
    export default {
        mixins: [PollsMixin, UsersMixin],
        data() {
            return {
                date: new Date(),
                isModalOpen: false,
                usersGroup: [],
                errors: []
            }
        },
        methods: {
            users() {
                return this.listUsers;
            },
            save() {
                const date = this.$refs.date.value.toISOString()
                const score = this.$refs.scored.newValue
                const out_of = 10
                const present = this.usersGroup
                this.createPoll({
                    date,
                    score,
                    out_of,
                    present
                }).then(() => {
                    this.isModalOpen = false
                    this.$buefy.toast.open({
                        message: 'Poll has been recorded'
                    })
                })
            }
        }
    }
</script>
