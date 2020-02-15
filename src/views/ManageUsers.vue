<template>
    <b-modal
      :active="isModalOpen"
      :width="640"
      :has-modal-card="true"
      @close="closeModal"
    >
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">Manage Players</p>
            </header>
            <div class="card-content">
              <div
                class="buttons content is-flex is-group"
                style="flex-wrap: wrap; align-items: flex-start;">
                <UserButton
                  :users="sortedUsers()"
                  @userClicked="confirmDelete"
                  displayType="button"
                  style="margin-right: 12px;"
                />
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
</template>

<script>
import UserButton from '@/components/UserButton'
import UserField from '@/components/UserField'
import UsersMixin from '@/mixins/UsersMixin'
import _ from 'lodash'

export default {
    mixins: [UsersMixin],
    components: { UserButton, UserField },
    props: {
        isModalOpen: Boolean,
    },
    data: () => ({
        isPanelOpen: false,
    }),
    methods: {
        users() {
            return this.listUsers
        },
        sortedUsers() {
            return _.sortBy(this.users(), ['name'])
        },
        panelOpen(open) {
            this.isPanelOpen = open
        },
        confirmDelete(e) {
            e.stopPropagation()
            let name = e.target.innerText
            let _id = e.target.id

            this.$buefy.dialog.confirm({
                message: `Delete ${name}?`,
                onConfirm: () => {
                    this.deleteUser({
                        _id,
                    }).then(() => {
                        this.$buefy.toast.open(`${name} deleted.`)
                    })
                },
            })
        },
        closeModal() {
            this.$emit('userModalClose')
            return false
        },
    },
}
</script>
