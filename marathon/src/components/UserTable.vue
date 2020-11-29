<template>
    <div class="table_cover">
      <table class="users_table">
        <thead>
          <tr class="table_head_row">
            <th>Name</th>
            <th>
              <span>Date of Birth</span>
              <button class="table_sorting" v-on:click.prevent="sortTable('dateForSorting', false)">
                <span class="material-icons" v-if="sorting.dateForSorting.direction === 'descending'">north</span>
                <span class="material-icons" v-else-if="sorting.dateForSorting.direction === 'ascending'">south</span>
              </button>
            </th>
            <th>Email</th>
            <th>Contact Phone</th>
            <th>
              <span>Preferred Distance, km</span>
              <button class="table_sorting" v-on:click.prevent="sortTable('distance', false)">
                <span class="material-icons" v-if="sorting.distance.direction === 'descending'">north</span>
                <span class="material-icons" v-else-if="sorting.distance.direction === 'ascending'">south</span>
              </button>
            </th>
            <th>
              <span>Donation</span>
              <button class="table_sorting" v-on:click.prevent="sortTable('donation', false)">
                <span class="material-icons" v-if="sorting.donation.direction === 'descending'">north</span>
                <span class="material-icons" v-else-if="sorting.donation.direction === 'ascending'">south</span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="table_body_row" v-bind:class="{ new: user.new }" v-for="user in shownUsers" v-bind:key="user.id">
            <td>{{ user.username }}</td>
            <td>{{ getDisplayDate(user.birth) }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.distance }}</td>
            <td>{{ user.donation | numberFormat }}</td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button class="page_button"
                v-on:click.prevent="prevPage()"
                v-bind:disabled="pageNumber === 0">
                <span class="material-icons">arrow_back</span>
        </button>
        <button class="page_button"
                v-on:click.prevent="nextPage()"
                v-bind:disabled="pageNumber >= totalPages - 1">
                <span class="material-icons">arrow_forward</span>
        </button>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import numberFormat from '@/helpers/filters/numberFormat'

export default {
  filters: { numberFormat },
  data () {
    return {
      totalUsers: [],
      shownUsers: [],
      perPage: 4,
      pageNumber: 0,
      sorting: {
        dateForSorting: {
          direction: 'descending'
        },
        distance: {
          direction: 'descending'
        },
        donation: {
          direction: 'descending'
        }
      }
    }
  },
  methods: {
    paginate () {
      const start = this.pageNumber * this.perPage
      const end = start + this.perPage
      this.shownUsers = this.totalUsers.slice(start, end)
    },
    nextPage () {
      this.pageNumber++
      this.paginate()
    },
    prevPage () {
      this.pageNumber--
      this.paginate()
    },
    getDisplayDate (field) {
      return field.slice(8, 10) + '.' + field.slice(5, 7) + '.' + field.slice(0, 4)
    },
    sortTable (column, isDefault) {
      if (!isDefault) {
        if (this.sorting[column].direction === 'descending') {
          this.totalUsers.sort(function (a, b) {
            if (a[column] > b[column]) {
              return 1
            }
            if (a[column] < b[column]) {
              return -1
            }
            return 0
          })
          this.sorting[column].direction = 'ascending'
        } else {
          this.totalUsers.sort(function (a, b) {
            if (b[column] > a[column]) {
              return 1
            }
            if (b[column] < a[column]) {
              return -1
            }
            return 0
          })
          this.sorting[column].direction = 'descending'
        }
      } else {
        this.totalUsers.sort(function (a, b) {
          if (a[column] > b[column]) {
            return 1
          }
          if (a[column] < b[column]) {
            return -1
          }
          return 0
        })
        this.sorting[column].direction = 'ascending'
      }
    }
  },
  watch: {
    myState () {
      this.totalUsers = this.$store.state.addedUsers
      this.paginate()
    }
  },
  computed: {
    ...mapGetters({
      myState: 'getMyState'
    }),
    totalPages () {
      return Math.ceil(this.totalUsers.length / this.perPage)
    }
  },
  created () {
    this.totalUsers = this.$store.state.addedUsers
    this.sortTable('dateForSorting', true)
    this.totalUsers.filter(user => user.new).forEach(function (userNew) {
      userNew.new = false
    })
    this.totalUsers.forEach(function (user) {
      user.dateForSorting = new Date(user.birth)
    })
    this.paginate()
  }
}
</script>

<style scoped lang="less">
  .table_cover {
    padding: 50px;
    min-height: 380px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .users_table {
    width: 100%;
    border-collapse: collapse;
  }

  .table_head_row {
    background-color: #d1fdfd;
  }

  .new {
    background-color: #71f1b7;
  }

  th, td {
    text-align: left;
    padding: 10px;
    border: 1px solid #867e7e;
  }

  th {
    white-space: nowrap;
  }

  .table_sorting {
    background-color: transparent;
    border: none;
    cursor: pointer;

    .material-icons {
    font-size: 16px;
    vertical-align: middle;
  }

    &:focus {
      outline: none;

      .material-icons {
        color: #f72d8a;
      }
    }
  }

  .pagination {
    padding: 20px 0;
    text-align: right;
    margin-top: auto;
  }

  .page_button {
    height: 34px;
    background-color: #d1fdfd;
    border: 1px solid #867e7e;
    border-radius: 5px;
    cursor: pointer;

    .material-icons {
      vertical-align: middle;
    }

    &:first-child {
      margin-right: 10px;
    }

    &:disabled {
      cursor: not-allowed;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 1px 1px #cccccc;
    }
  }
</style>
