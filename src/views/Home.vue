<template>
  <!-- 
    * Since the component is minim, I thought I did not have to make separated component on the components folder
   -->
  <div class="home-page">
    <p v-if="loading">loading</p>
    <p v-else-if="error">error</p>
    <div v-else-if="data">
      <div class="settings">
        <div class="opt-filter">
          <button @click="toggleFilter">Filter</button>
        </div>
        <div class="opt-sort">
          <select v-model="sort" @change="onSort">
            <option hidden>Term Sort</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <table>
        <thead>
          <th>Transaction ID</th>
          <th>Borrower</th>
          <th>Amount</th>
          <th>Interest Rate</th>
          <th>Term</th>
          <th>Action</th>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in data" :key="idx">
            <td>{{ item.id }}</td>
            <td>{{ item.borrower.name }}</td>
            <td>{{ item.amount }}</td>
            <td>{{ item.interestRate }}</td>
            <td>{{ item.term }}</td>
            <td>
              <router-link :to="{ name: 'Detail', params: { id: item.id } }">
                Go to details
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="modal" :class="[showModal ? 'd-block' : 'd-none']">
        <div @click="toggleFilter" class="overlay"></div>
        <div class="box">
          <h2>Filter</h2>
          <div class="opt">
            <label>Loan Amount</label>
            <div class="input-container">
              <input
                type="number"
                v-model="loanMin"
                placeholder="min"
                class="input-range"
              />
              <input
                type="number"
                v-model="loanMax"
                placeholder="max"
                class="input-range"
              />
            </div>
          </div>
          <div class="opt">
            <label>Interest Rate</label>
            <div class="input-container">
              <input
                type="number"
                v-model="interestMin"
                placeholder="min"
                class="input-range"
              />
              <input
                type="number"
                v-model="interestMax"
                placeholder="max"
                class="input-range"
              />
            </div>
          </div>
          <div class="opt">
            <label>Term</label>
            <div class="input-container">
              <input
                type="number"
                v-model="termMin"
                placeholder="min"
                class="input-range"
              />
              <input
                type="number"
                v-model="termMax"
                placeholder="max"
                class="input-range"
              />
            </div>
          </div>
          <button @click="toggleFilter">Apply</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      initialData: null,
      data: null,
      loading: true,
      error: null,
      sort: null,
      showModal: false,
      loanMin: null,
      interestMin: null,
      termMin: null,
      loanMax: null,
      interestMax: null,
      termMax: null,
    };
  },
  methods: {
    onSort(e) {
      const sorted = this.data.sort((a, b) => a.term - b.term);
      if (e.target.value === "desc") {
        this.data = sorted.reverse();
      } else {
        this.data = sorted;
      }
    },
    toggleFilter() {
      this.showModal = !this.showModal;
      this.data = this.initialData.filter(
        (el) =>
          el.term >= (this.termMin || -Infinity) &&
          el.term <= (this.termMax || Infinity) &&
          el.amount >= (this.loanMin || -Infinity) &&
          el.amount <= (this.loanMax || Infinity) &&
          el.interestRate >= (this.interestMin || -Infinity) &&
          el.interestRate <= (this.interestMax || Infinity)
      );
    },
  },
  async beforeMount() {
    try {
      const response = await axios(
        "https://raw.githubusercontent.com/andreascandle/p2p_json_test/main/api/json/loans.json"
      );
      this.initialData = response.data;
      this.data = response.data;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  },
};
</script>
