<template>
  <div>
    <b-button
      class="is-medium"
      @click="isModalOpen = true"
    >
      Manage players
    </b-button>
    <b-modal
      :active.sync="isModalOpen"
      :width="640">
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">Manage Players</p>
            </header>
            <div class="card-content">
              <div
                class="buttons content is-grouped"
                style="flex-wrap: wrap;">
                  <button 
                    v-for="user in sortedUsers()"
                    :id="user._id"
                    :data-name="user.name"
                    :key="user._id"
                    class="button"
                    style="margin-bottom: 12px;"
                    @click="confirmDelete"
                  >
                    <span style="pointer-events: none;">{{ user.name }}</span>
                    <span class="icon is-small" style="pointer-events: none;">
                      <i class="fas fa-times-circle" style="pointer-events: none;"></i>
                    </span>
                  </button>
                  <button
                    class="button is-primary"
                    style="margin-bottom: 12px;"
                    @click="isPanelOpen = !isPanelOpen"
                  >
                    <span>Add</span>
                    <span class="icon is-small">
                      <i class="fas fa-user-plus"></i>
                    </span>
                  </button>
              </div>
              <UserField
                :isPanelOpen="isPanelOpen"
                @panelVisibility="panelOpen"
              />
            </div>
        </div>
    </b-modal>
  </div>
</template>

<script>
import UsersMixin from "@/mixins/UsersMixin";
import UserField from "@/components/UserField";
import _ from "lodash";

export default {
  mixins: [UsersMixin],
  components: { UserField },
  data: () => ({
    isModalOpen: false,
    isPanelOpen: false
  }),
  methods: {
    users() {
      return this.listUsers;
    },
    sortedUsers() {
      return _.sortBy(this.users(), ["name"]);
    },
    panelOpen(open) {
      this.isPanelOpen = open;
    },
    confirmDelete(e) {
      e.stopPropagation();
      let name = e.target.innerText;
      let _id = e.target.id;

      this.$buefy.dialog.confirm({
        message: `Delete ${name}?`,
        onConfirm: () => {
          this.deleteUser({
            _id
          }).then(() => {
            this.$buefy.toast.open(`${name} deleted.`);
          });
        }
      });
    }
  }
};
</script>
