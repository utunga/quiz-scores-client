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
                                placeholder="Choose poll date"
                                icon="calendar"
                                v-model="date">
                            </b-datepicker>
                        </b-field>
                        <b-field label="Score" custom-class="is-small">
                            <b-input
                                placeholder="score"
                                size="is-large">
                            </b-input>
                        </b-field>

                        <b-field label="Players" custom-class="is-small">
                            <div class="field is-grouped">
                                <b-checkbox-button 
                                    v-for="user in users()"
                                    v-model="usersGroup"
                                    :native-value="user.name"
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
    export default {
        mixins: [UsersMixin],
        data() {
            return {
                date: new Date(),
                isModalOpen: false,
                usersGroup: []
            }
        },
        methods: {
            users() {
                return this.listUsers;
            }
        }
    }
</script>
