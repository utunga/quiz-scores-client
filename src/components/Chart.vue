<script>
import UsersMixin from "@/mixins/UsersMixin";
import PollsMixin from "@/mixins/PollsMixin";

import { Line } from "vue-chartjs";

// import Chart from "vue-bulma-chartjs";
import _ from "lodash";
import Moment from "moment";

export default {
  extends: Line,
  mixins: [PollsMixin, UsersMixin],
  data: () => ({
    chartData: {
      labels: [],
      datasets: []
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      }
    }
  }),
  watch: {
    listPolls() {
      const labels = [];
      const datasets = [];
      _.forEach(this.listPolls, function(value) {
        const label = Moment(value.date).format("D MMM YYYY");
        labels.push(label);

        datasets.push(value.score);
      });
      this.chartData.datasets = [{
          label: "score",
          backgroundColor: "#f87979",
          data: datasets,
          fill: false
      }];
      this.chartData.labels = labels;
      this.$data._chart.update();
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>
