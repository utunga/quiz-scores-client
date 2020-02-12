<template>
    <div>
        <button class="button is-primary is-medium"
            @click="isModalOpen = true"
        >
            Add new poll
        </button>
        <b-modal
          :active.sync="isModalOpen"
          :width="640"
          :onCancel="reset">
          <form action="" @submit="checkForm" novalidate>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-head-title">New poll</p>
                </header>
                <div class="modal-card-body">
                    <div class="content">
                        <b-field
                          label="Select a date"
                          custom-class="is-small"
                          :type="{ 'is-danger': errors.date }"
                          :message="{ 'A poll has already been recorded for this date': errors.date }">
                            <b-datepicker
                                ref="date"
                                placeholder="Choose poll date"
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

                        <b-field
                          label="Players"
                          custom-class="is-small"
                          :type="{ 'is-danger': errors.users }"
                          :message="{ 'At least 1 player is required': errors.users }"
                        >
                            <div class="field is-grouped is-flex" style="flex-wrap: wrap;">
                                <b-checkbox-button 
                                    v-for="user in sortedUsers()"
                                    v-model="usersGroup"
                                    :native-value="user._id"
                                    :key="user._id"
                                    class="is-rounded"
                                    style="margin-bottom: 12px;">
                                    <span>{{ user.name }}</span>
                                </b-checkbox-button>
                                <b-button
                                  class="button is-primary"
                                  slot="trigger"
                                  aria-controls="contentIdForA11y1"
                                  icon-left="user-plus"
                                  style="margin-bottom: 12px;"
                                  @click="collapse">Add user</b-button>
                            </div>
                        </b-field>
                        <b-collapse
                          :open="isPlayerPanelOpen"
                          aria-id="contentIdForA11y1"
                          class="is-full-width">
                          <b-field
                            :type="{'is-danger' : errors.newUser}"
                            :message="{ 'Player with the same name already exists': errors.newUser }">
                            <div class="field is-flex has-addons">
                              <b-input
                                type="text"
                                v-model="newPlayerName"
                                placeholder="Player name"
                                class="is-expanded"
                              ></b-input>
                              <p class="control">
                                <b-button
                                  class="button is-primary"
                                  slot="trigger"
                                  aria-controls="contentIdForA11y1"
                                  @click="addUser">Add</b-button>
                              </p>
                            </div>
                          </b-field>
                        </b-collapse>
                    </div>
                </div>
                 <footer class="modal-card-foot">
                    <input type="submit" value="save poll" class="button is-primary" />
                </footer>
            </div>
          </form>
        </b-modal>
    </div>
</template>

<script>
import UsersMixin from "@/mixins/UsersMixin";
import PollsMixin from "@/mixins/PollsMixin";
import _ from "lodash";

const defaultErrors = {
  score: false,
  users: false,
  date: false,
  newUser: false
};

export default {
  mixins: [PollsMixin, UsersMixin],
  data() {
    return {
      date: new Date(),
      isModalOpen: false,
      isPlayerPanelOpen: false,
      usersGroup: [],
      errors: defaultErrors,
      scoreOptions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      newPlayerName: ""
    };
  },
  methods: {
    users() {
      return this.listUsers;
    },
    sortedUsers() {
      return _.sortBy(this.users(), ["name"]);
    },
    polls() {
      return this.listPolls;
    },
    checkForm(e) {
      e.preventDefault();
      this.checkErrors();

      if (!this.errors.users && !this.errors.score && !this.errors.date) {
        this.save();
      }
    },
    checkErrors() {
      this.errors.users = this.usersGroup.length === 0 ? true : false;
      this.errors.score = this.$refs.scored.selected === null ? true : false;
      this.errors.date = this.date === null ? true : false;

      if (!this.errors.date) {
        const curr = new Date(this.date);

        const exists = _.findIndex(this.polls(), function(value) {
          const d = new Date(value.date);
          const dstr = `${d.getDate()}${d.getMonth()}${d.getFullYear()}`;
          const currStr = `${curr.getDate()}${curr.getMonth()}${curr.getFullYear()}`;

          return dstr === currStr;
        });

        this.errors.date = exists === -1 ? false : true;
      }
    },
    reset() {
      this.usersGroup = [];
      this.errors.users = false;
      this.errors.score = false;
      this.errors.date = false;
      this.errors.newUser = false;

      this.date = new Date();
    },
    save() {
      const date = this.date.toISOString();
      const score = this.$refs.scored.selected;
      const out_of = 10;
      const present = this.usersGroup;
      this.createPoll({
        date,
        score,
        out_of,
        present
      }).then(() => {
        this.isModalOpen = false;
        this.$buefy.toast.open({
          message: "Poll has been recorded"
        });

        this.reset();
      });
    },
    collapse(e) {
      e.preventDefault();
      this.isPlayerPanelOpen = !this.isPlayerPanelOpen;
    },
    addUser(e) {
      e.preventDefault();

      const name = this.newPlayerName;

      const existingPlayer = _.findIndex(this.users(), function(value) {
        return value.name.trim().toLowerCase() === name.trim().toLowerCase();
      });

      if (existingPlayer === -1) {
        this.createUser({
          name
        }).then(() => {
          this.isPlayerPanelOpen = !this.isPlayerPanelOpen;
          this.newPlayerName = "";
        });
      } else {
        this.errors.newUser = true;
      }
    }
  }
};
</script>
