<template>
    <div
        v-if="displayType === 'button'"
        class="field is-grouped is-flex"
        style="flex-wrap: wrap;">
        <button
            v-for="user in users"
            :id="user._id"
            :data-name="user.name"
            :key="user._id"
            class="button"
            style="margin-bottom: 12px;"
            @click="onClick"
        >
            <span style="pointer-events: none;">{{ user.name }}</span>
            <span class="icon is-small" style="pointer-events: none;">
                <i class="fas fa-times-circle" style="pointer-events: none;"></i>
            </span>
        </button>
    </div>
    <div
        v-else-if="displayType === 'checkbox'"
        class="field is-grouped is-flex"
        style="flex-wrap: wrap;">
        <b-checkbox-button
            v-for="user in users"
            v-model="selectedUsers"
            :native-value="user._id"
            :key="user._id"
            style="margin-bottom: 12px;"
            @input="onCheck">
            <span>{{ user.name }}</span>
        </b-checkbox-button>
    </div>
</template>
<script>
export default {
    props: {
        displayType: String,
        users: Array,
        model: Array,
    },
    data: () => ({
        selectedUsers: [],
    }),
    methods: {
        onCheck() {
            this.$emit('usersUpdated', this.selectedUsers)
        },
        onClick(e) {
            this.$emit('userClicked', e)
        },
    },
}
</script>
