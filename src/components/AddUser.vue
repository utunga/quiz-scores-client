<template>
    <div>
        <b-field
            label="Players"
            custom-class="is-small"
            :type="{ 'is-danger': hasError }"
            :message="{ 'At least 1 player is required': hasError }"
        >
            <div class="field is-grouped is-flex" style="flex-wrap: wrap;">
                <UserButton
                  :users="users"
                  :model="selectedUsers"
                  :clickFunction="clickUser"
                  displayType="checkbox" />

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
import UserButton from '@/components/UserButton'
import UserField from '@/components/UserField'
import UsersMixin from '@/mixins/UsersMixin'

const defaultErrors = {
    users: false,
    newUser: false,
}
export default {
    name: 'AddUser',
    components: { UserButton, UserField },
    mixins: [UsersMixin],
    props: {
        hasError: Boolean,
        users: Array,
        usersGroup: Array,
    },
    data: () => ({
        errors: defaultErrors,
        isPlayerPanelOpen: false,
        selectedUsers: [],
    }),
    methods: {
        clickUser() {
            this.$emit('usersGroupUpdated', this.selectedUsers)
        },
        collapse(e) {
            e.preventDefault()
            this.isPlayerPanelOpen = !this.isPlayerPanelOpen
        },
        panelOpen(open) {
            this.isPlayerPanelOpen = open
        },
    },
}
</script>
