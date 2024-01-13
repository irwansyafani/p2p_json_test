<template>
  <!-- 
    * Since the component is minim, I thought I did not have to make separated component on the components folder
   -->
  <div class="details-page">
    <p v-if="loading">loading</p>
    <p v-else-if="error">error</p>
    <div v-else-if="data">
      <router-link to="/">{{ "<" }} Back</router-link>
      <div class="content">
        <img src="/unknown-person.png" />
        <table>
          <tbody>
            <tr>
              <td>Borrower ID</td>
              <td>{{ data.borrower.id }}</td>
            </tr>
            <tr>
              <td>Borrower Name</td>
              <td>{{ data.borrower.name }}</td>
            </tr>
            <tr>
              <td>Borrower Email</td>
              <td>{{ data.borrower.email }}</td>
            </tr>
            <tr>
              <td>Repayment Schedule</td>
              <td>Monthly</td>
            </tr>
            <tr>
              <td>Repayment Amount</td>
              <td>{{ data.repaymentSchedule.installments[1].amountDue }}</td>
            </tr>
            <tr>
              <td>Purpose</td>
              <td>{{ data.purpose }}</td>
            </tr>
            <tr>
              <td>Credit Score</td>
              <td>{{ data.borrower.creditScore }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  data() {
    return { data: null, loading: true, error: false };
  },
  async beforeMount() {
    try {
      // refetching needed to handle when a user directly visit the detail by the url they already have
      const route = useRoute();
      const fetched = await axios(
        "https://raw.githubusercontent.com/andreascandle/p2p_json_test/main/api/json/loans.json"
      );
      const data = fetched.data.find((el) => el.id === route.params.id);
      this.data = data;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  },
};
</script>
