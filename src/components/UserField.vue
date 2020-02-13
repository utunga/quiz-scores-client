<template>
    <b-collapse
      :open="isPanelOpen"
      class="is-full-width">
      <b-field
        :message="{ 'user with this name already exists': error }"
        :type="{ 'is-danger': error }"
      >
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
                @click="addUser">Add</b-button>
            </p>
        </div>
      </b-field>
    </b-collapse>
</template>
<script>
import UsersMixin from "@/mixins/UsersMixin";
import _ from "lodash";
export default {
  name: "UserField",
  mixins: [UsersMixin],
  props: {
    isPanelOpen: Boolean
  },
  data: () => ({
    newPlayerName: "",
    error: false
  }),
  methods: {
    addUser(e) {
      e.preventDefault();

      const name = this.newPlayerName;
      const existingPlayer = _.findIndex(this.listUsers, function(value) {
        return value.name.trim().toLowerCase() === name.trim().toLowerCase();
      });

      if (existingPlayer === -1) {
        this.createUser({
          name
        }).then(() => {
          this.newPlayerName = "";
          this.$emit("panelVisibility", false);
          this.error = false;
          this.$buefy.toast.open(`${name} added.`);
        });
      } else {
        this.error = true;
      }
    }
  }
};
</script>
