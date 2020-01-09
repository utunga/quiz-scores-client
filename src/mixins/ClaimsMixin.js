import { mapState, mapGetters, mapActions } from "vuex";
import feathersClient from "@/feathers";

export default {
  computed: {
    ...mapState("claims", {
      areClaimsLoading: "isFindPending",
      todosPagination: "pagination"
    }),
    ...mapGetters("claims", {
      findClaimsInStore: "find",
      listClaims: "list"
    })
  },
  methods: {
    ...mapActions("claims", {
      findClaims: "find"
    })
  },
  async created() {
    console.log("ClaimsMixin was loaded");

    feathersClient.service("claims").on("created", data => {
      console.log(`Claim created - ${data.content}`);
    });

    try {
      await this.findClaims({});
      console.log("found claims");
    } catch (e) {
      console.error(e);
    }
  }
};
