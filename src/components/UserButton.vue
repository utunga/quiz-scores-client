<template>
    <div v-if="displayType === 'button'" class="field is-grouped is-flex">
        <button
            v-for="user in users"
            :id="user._id"
            :data-name="user.name"
            :key="user._id"
            class="button"
            style="margin-bottom: 12px;"
            @click="clickFunction"
        >
            <span style="pointer-events: none;">{{ user.name }}</span>
            <span class="icon is-small" style="pointer-events: none;">
                <i class="fas fa-times-circle" style="pointer-events: none;"></i>
            </span>
        </button>
    </div>
    <div v-else-if="displayType === 'checkbox'" class="field is-grouped is-flex">
        <b-checkbox-button
            v-for="user in users"
            :v-model="model"
            :native-value="user._id"
            :key="user._id"
            style="margin-bottom: 12px;"
            @input="clickFunction">
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
        clickFunction: Function,
    },
}
</script>
