import { mapState, mapGetters, mapActions } from "vuex";
import feathersClient from "@/feathers";

export default {
  computed: {
    ...mapState("polls", {
      arePollsLoading: "isFindPending",
      pollsPagination: "pagination"
    }),
    ...mapGetters("polls", {
      findPollsInStore: "find",
      listPolls: "list"
    })
  },
  methods: {
    ...mapActions("polls", {
      findPolls: "find"
    })
  },
  async created() {
    console.log("PollsMixin was loaded");

    feathersClient.service("polls").on("created", data => {
      console.log(`Poll created for - ${data.date}`);
    });

    try {
      await this.findPolls({});
      console.log("found Polls");
    } catch (e) {
      console.error(e);
    }
  }
};
