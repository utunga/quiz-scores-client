<template>
  <b-modal
    :active="isModalOpen"
    :width="640"
    :onCancel="reset"
    :has-modal-card="true"
    @close="closeModal">
    <form
        action=""
        @submit="checkForm"
        novalidate
        style="max-height: 90vh; overflow: scroll;"
    >
      <div class="modal-card">
          <header class="modal-card-head">
              <p class="modal-card-head-title"><b>New quiz</b></p>
          </header>
          <div class="modal-card-body">
              <div class="content">
                  <b-field
                    label="Select a date"
                    custom-class="is-small"
                    :type="{ 'is-danger': errors.date }"
                    :message="{ 'A quiz has already been recorded for this date': errors.date }">
                      <b-datepicker
                          ref="date"
                          placeholder="Choose quiz date"
                          icon="calendar"
                          v-model="date">
                      </b-datepicker>
                  </b-field>
                  <b-field
                    label="Score"
                    :type="{ 'is-danger': errors.score }"
                    :message="{ 'A score is required': errors.score }"
                    custom-class="is-small">
                      <b-select 
                        ref="scored"
                        placeholder="Select a score"
                        size="is-large"
                      >
                        <option
                            v-for="option in scoreOptions"
                            :value="option"
                            :key="option">
                            {{ option }}
                        </option>
                    </b-select>
                  </b-field>

                  <AddUser
                    @usersGroupUpdated="updatedUsers"
                    :users="sortedUsers()"
                    :has-error="errors.users"
                  />
              </div>
          </div>
            <footer class="modal-card-foot">
              <input type="submit" value="save" class="button is-primary" />
          </footer>
      </div>
    </form>
  </b-modal>
</template>

<script>
import UsersMixin from '@/mixins/UsersMixin'
import PollsMixin from '@/mixins/PollsMixin'
import AddUser from '@/components/AddUser'
import _ from 'lodash'

const defaultErrors = {
    score: false,
    users: false,
    date: false,
}

export default {
    mixins: [PollsMixin, UsersMixin],
    components: { AddUser },
    props: {
        isModalOpen: Boolean,
    },
    data() {
        return {
            date: new Date(),
            usersGroup: [],
            errors: defaultErrors,
            scoreOptions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        }
    },
    methods: {
        users() {
            return this.listUsers
        },
        sortedUsers() {
            return _.sortBy(this.users(), ['name'])
        },
        polls() {
            return this.listPolls
        },
        checkForm(e) {
            e.preventDefault()
            this.checkErrors()

            if (!this.errors.users && !this.errors.score && !this.errors.date) {
                this.save()
            }
        },
        checkErrors() {
            this.errors.users = this.usersGroup.length === 0 ? true : false
            this.errors.score =
                this.$refs.scored.selected === null ? true : false
            this.errors.date = this.date === null ? true : false

            if (!this.errors.date) {
                const curr = new Date(this.date)

                const exists = _.findIndex(this.polls(), function(value) {
                    const d = new Date(value.date)
                    const dstr = `${d.getDate()}${d.getMonth()}${d.getFullYear()}`
                    const currStr = `${curr.getDate()}${curr.getMonth()}${curr.getFullYear()}`

                    return dstr === currStr
                })

                this.errors.date = exists === -1 ? false : true
            }
        },
        reset() {
            this.usersGroup = []
            this.errors.users = false
            this.errors.score = false
            this.errors.date = false

            this.date = new Date()
        },
        save() {
            const date = this.date.toISOString()
            const score = this.$refs.scored.selected
            const out_of = 10
            const present = this.usersGroup
            this.createPoll({
                date,
                score,
                out_of,
                present,
            }).then(() => {
                this.closeModal()
                this.$buefy.toast.open({
                    message: 'Poll has been recorded',
                })

                this.reset()
            })
        },
        updatedUsers(users) {
            this.usersGroup = users
        },
        closeModal() {
            this.$emit('pollModalClose')
            return false
        },
    },
}
</script>
