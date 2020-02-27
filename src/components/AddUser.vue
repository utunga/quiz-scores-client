<template>
    <div>
        <b-collapse class="card" aria-id="contentIdForA11y3">
            <div
                slot="trigger" 
                class="card-header"
                role="button"
                :open="playersOpen"
                @toggle="playersOpen = !playersOpen"
                aria-controls="contentIdForA11y3">
                <p :class="errorText()" style="margin-bottom: 0">
                    {{playersTitle()}}
                </p>
                <a class="card-header-icon">
                    <b-icon
                        icon="angle-down">
                    </b-icon>
                </a>
            </div>
            <div class="card-content">
                <div class="content">
                    <b-field
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
            </div>
        </b-collapse>
    </div>
</template>
<script>
import _ from 'lodash'
import UserButton from '@/components/UserButton'
import UserField from '@/components/UserField'
import UsersMixin from "@/mixins/UsersMixin"

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
    },
    data: () => ({
        errors: defaultErrors,
        isPlayerPanelOpen: false,
        playersOpen: false,
        usersGroup: [],
    }),
    methods: {
        updateUsers(selected) {
            this.$emit('usersGroupUpdated', selected)
            this.usersGroup = selected
        },
        collapse(e) {
            e.preventDefault()
            this.isPlayerPanelOpen = !this.isPlayerPanelOpen
        },
        panelOpen(open) {
            this.isPlayerPanelOpen = open
        },
        playersTitle() {
            const selected = _.isUndefined(this.usersGroup)
                ? 0
                : this.usersGroup.length
            return `Players (${selected})`
        },
        errorText() {
            const isError = this.hasError ? ' has-text-danger' : ''
            return `card-header-title ${isError}`
        },
    },
}
</script>
