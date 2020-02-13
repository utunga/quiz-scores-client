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
                    @click="collapse">Add</b-button>
            </div>
        </b-field>
        <UserField
          :isPanelOpen="isPlayerPanelOpen"
          @panelVisibility="panelOpen"
        />
    </div>
</template>
<script>
import _ from "lodash";

import UserField from "@/components/UserField";
import UsersMixin from "@/mixins/UsersMixin";

const defaultErrors = {
  users: false,
  newUser: false
};
export default {
  name: "AddUser",
  components: { UserField },
  mixins: [UsersMixin],
  props: {
    hasError: Boolean,
    users: Array,
    usersGroup: Array
  },
  data: () => ({
    errors: defaultErrors,
    isPlayerPanelOpen: false,
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
    panelOpen(open) {
      this.isPlayerPanelOpen = open;
    }
  }
};
</script>
