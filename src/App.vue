<template>
  <div id="app">
    
    <b-navbar :fixed-top="true" :shadow="true" :spaced="true">
      <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
              <img
                  src="/img/dragonfly-logo-rgb.svg"
                  alt=""
              >
          </b-navbar-item>
      </template>

      <template slot="end">
          <b-navbar-item tag="div">
              <AverageScore />
          </b-navbar-item>

          <b-navbar-item tag="div">
            <div class="field has-addons">
              <p class="control">
                  <button class="button is-primary is-medium"
                        @click="pollModalOpen"
                  >
                  Add quiz
                  </button>
              </p>
              <p class="control">
                  <b-button
                    class="is-medium"
                    @click="userModalOpen"
                  >
                    Manage players
                  </b-button>
                
              </p>
            </div>
          </b-navbar-item>
      </template>
    </b-navbar>

    <AddPoll :isModalOpen="isPollModalOpen" @pollModalClose="pollModalClose" />
    <ManageUsers :isModalOpen="isUserModalOpen" @userModalClose="userModalClose" />

    <router-view />
    <slot></slot>
  </div>
</template>
<script>
import AverageScore from '@/components/AverageScore'
import AddPoll from '@/views/AddPoll'
import ManageUsers from '@/views/ManageUsers'
export default {
    name: 'app',
    components: { AverageScore, AddPoll, ManageUsers },
    data: () => ({
        isPollModalOpen: false,
        isUserModalOpen: false,
    }),
    methods: {
        pollModalOpen() {
            this.isPollModalOpen = true
        },
        pollModalClose() {
            this.isPollModalOpen = false
        },
        userModalOpen() {
            this.isUserModalOpen = true
        },
        userModalClose() {
            this.isUserModalOpen = false
        },
    },
}
</script>

<style lang="scss">
// Import Bulma's core
@import '~bulma/sass/utilities/_all';

// Set your colors
$primary: #43a1c9;
$primary-invert: findColorInvert($primary);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    'white': (
        $white,
        $black,
    ),
    'black': (
        $black,
        $white,
    ),
    'light': (
        $light,
        $light-invert,
    ),
    'dark': (
        $dark,
        $dark-invert,
    ),
    'primary': (
        $primary,
        $primary-invert,
    ),
    'info': (
        $info,
        $info-invert,
    ),
    'success': (
        $success,
        $success-invert,
    ),
    'warning': (
        $warning,
        $warning-invert,
    ),
    'danger': (
        $danger,
        $danger-invert,
    ),
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import '~bulma';
@import '~buefy/src/scss/buefy';
</style>
