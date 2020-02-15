<template>
    <div>
        <b-field
            label="Players"
            custom-class="is-small"
            :type="{ 'is-danger': hasError }"
            :message="{ 'At least 1 player is required': hasError }"
        >
            <div>
                <UserButton
                  :users="users"
                  displayType="checkbox"
                  @usersUpdated="updateUsers"
                />

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
    }),
    methods: {
        updateUsers(selected) {
            this.$emit('usersGroupUpdated', selected)
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
