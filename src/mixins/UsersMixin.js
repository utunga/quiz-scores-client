import { mapState, mapGetters, mapActions } from "vuex";
import feathersClient from "@/feathers";

export default {
  computed: {
    ...mapState("users", {
      areUsersLoading: "isFindPending",
      todosPagination: "pagination"
    }),
    ...mapGetters("users", {
      findUsersInStore: "find",
      listUsers: "list"
    })
  },
  methods: {
    ...mapActions("users", {
      findUsers: "find"
    })
  },
  async created() {
   
    feathersClient.service("users").on("created", data => {
      console.log(`User created - ${data.title}`);
    });

    try {
      await this.findUsers({});
    } catch (e) {
      console.error(e);
    }
  }
};
