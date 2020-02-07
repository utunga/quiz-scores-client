<template>
  <div class="polls">
    <section class="pollapp">
      <header class="header">
        <h1><div id="faction_logo">Polls</div></h1>
    
        <div class="new-poll">
          <input
            autofocus
            autocomplete="off"
            v-model="nextDate"
            @keyup.enter="addPoll"
          />
          <vue-dropdown 
            :config="scoreDropdown"
            @setSelectedOption="setScore($event);"
            class="score_chooser"
            ></vue-dropdown>
        </div>
      </header>
      <section class="main" v-show="polls.length" v-cloak>
        <ul class="poll-list">
          <li
            v-for="poll in filteredPolls"
            class="poll"
            :key="poll.id"
            :class="{
              editing: poll == editingPoll
            }"
          >
            <div class="view">

              <!-- <vue-confirmation-button
                class="remove-confirm"
                title="Remove from record"
                v-if="poll.completed" 
                :messages="['X','Are you sure?','']"
                v-on:confirmation-success="deletePoll(poll)">
              </vue-confirmation-button> -->
            </div>
            <input
              class="edit"
              type="text"
              v-model="poll.score"
             
              @blur="doneEdit(poll)"
              @keyup.enter="doneEdit(poll)"
              @keyup.esc="cancelEdit(poll)"
            />

<!--             v-poll-focus="poll == editingPoll" -->
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="polls.length" v-cloak>
     
        
      </footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a poll</p>

     
    </footer>
  </div>
</template>
<style scoped>
div >>> .user_chooser .dropdown-label-container .dropdown-label .text {
  font-size: 0.8em !important;
}

div >>> .user_chooser .options .option {
  font-size: 0.8em !important;
}
</style>

<script>
import vueConfirmationButton from "vue-confirmation-button";
import vueDynamicDropdown from "vue-dynamic-dropdown";
import _ from "lodash";
import PollsMixin from "@/mixins/PollsMixin";
import UsersMixin from "@/mixins/UsersMixin";
// visibility filters
let filters = {
  all(polls) {
    return polls;
  },
  latest(polls) {
    return polls.filter(function(poll) {
      return poll.status === "proposed";
    });
  }
};

export default {
  name: "Polls",
  mixins: [PollsMixin, UsersMixin],
  components: {
    "vue-confirmation-button": vueConfirmationButton,
    "vue-dropdown": vueDynamicDropdown
  },
  mounted() {
    // handle routing
    const onHashChange = () => {
      let visibility = window.location.hash.replace(/#\/?/, "");
      console.log(visibility);
      if (filters[visibility]) {
        this.visibility = visibility;
      } else {
        window.location.hash = "";
        this.visibility = "all";
      }
    };

    window.addEventListener("hashchange", onHashChange);
    onHashChange();
  },
  data() {
    return {
      nextDate: this.currDay,
      editingPoll: null,
      currScore: null
    };  
  },
  computed: {
    polls() {
      return this.listPolls;
    },
    currDay() {
      var dateObj = new Date();
      var month = dateObj.getUTCMonth() + 1; //months from 1-12
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      return Date.parse(year, month, day);
    },
    scoreDropdown() {
      return {
        options: _.map([0,1,2,3,4,5,6,7,8,9,10], val => {
          return { value: val };
        }),
        placeholder: this.currScore,
        prefix: "Score",
        backgroundColor: "white",
        textColor: "black",
        borderRadius: "0em",
        border: "1px solid gray"
      };
    },
    userDropdown() {
      return {
        options: _.map(this.users, val => {
          return { value: val.name };
        }),
        placeholder: this.currentUser,
        prefix: "Current User:",
        backgroundColor: "white",
        textColor: "black",
        borderRadius: "0em",
        border: "1px solid gray"
      };
    },
    filteredPolls() {
      return this.listPolls;
      //return filters[this.visibility](this.polls, this.currentUser);
    }
  },
  filters: {
    pluralize(n) {
      return n === 1 ? "poll" : "polls";
    }
  },
  methods: {
    addPoll() {
      let value = this.nextDate;
      if (!value) {
        return;
      }

      const { Poll } = this.$FeathersVuex;
      let poll = new Poll({
        date: this.nextDate,
        score: this.score,
        out_of: this.out_of
      });
      poll.save({});
      this.visibility = "all";
      this.nextDate = null;
    },
    deletePoll(poll) {
      poll.remove({});
    },
    editPoll(poll) {
      this.beforeEditCache = poll;
      this.editingPoll = poll;
    },
    doneEdit(poll) {
      if (!this.editingPoll) {
        return;
      }
      this.editingPoll = null;
      poll.title = poll.title.trim();

      poll.save({});

      if (!poll.title) {
        this.removePoll(poll);
      }
    },
    cancelEdit(poll) {
      this.editingPoll = null;
      poll.title = this.beforeEditCache;
    },
    setScore(selectedOption) {
      this.currScore = selectedOption.value;
    }
  }
};
</script>

<style lang="scss">
@import "../styles/pollsmvc_app.scss";
</style>
