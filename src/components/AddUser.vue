<template>
    <div>
        <b-field
            label="Players"
            custom-class="is-small"
            :type="{ 'is-danger': hasError }"
            :message="{ 'At least 1 player is required': hasError }"
        >
            <div class="field is-grouped is-flex" style="flex-wrap: wrap;">
                <b-checkbox-button 
                    v-for="user in users"
                    v-model="selectedUsers"
                    :native-value="user._id"
                    :key="user._id"
                    class="is-rounded"
                    style="margin-bottom: 12px;"
                    @input="clickUser">
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
</template>
<script>
import _ from "lodash";

import UsersMixin from "@/mixins/UsersMixin";

const defaultErrors = {
  users: false,
  newUser: false
};
export default {
  name: "AddUser",
  mixins: [UsersMixin],
  props: {
    hasError: Boolean,
    users: Array,
    usersGroup: Array
  },
  data: () => ({
    errors: defaultErrors,
    isPlayerPanelOpen: false,
    newPlayerName: "",
    selectedUsers: []
  }),
  methods: {
    clickUser() {
      this.$emit("usersGroupUpdated", this.selectedUsers);
    },
    collapse(e) {
      e.preventDefault();
      this.isPlayerPanelOpen = !this.isPlayerPanelOpen;
    },
    addUser(e) {
      e.preventDefault();

      const name = this.newPlayerName;

      const existingPlayer = _.findIndex(this.users, function(value) {
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
