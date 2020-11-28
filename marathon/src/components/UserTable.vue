<template>
    <div class="table_cover">
      <table class="users_table">
        <thead>
          <tr class="table_head_row">
            <th>Name</th>
            <th>
              <span>Date of Birth</span>
              <button class="table_sorting">
                <span class="material-icons" v-if="sorting.birthSorting.direction === 'descending'">south</span>
                <span class="material-icons" v-else-if="sorting.birthSorting.direction === 'ascending'">south</span>
              </button>
            </th>
            <th>Email</th>
            <th>Contact Phone</th>
            <th>
              <span>Preferred Distance</span>
              <button class="table_sorting">
                <span class="material-icons" v-if="sorting.distanceSorting.direction === 'descending'">south</span>
                <span class="material-icons" v-else-if="sorting.distanceSorting.direction === 'ascending'">south</span>
              </button>
            </th>
            <th>
              <span>Donation</span>
              <button class="table_sorting">
                <span class="material-icons" v-if="sorting.donationSorting.direction === 'descending'">south</span>
                <span class="material-icons" v-else-if="sorting.donationSorting.direction === 'ascending'">south</span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="table_body_row" v-for="user in totalUsers" v-bind:key="user.id">
            <td>{{ user.username }}</td>
            <td>{{ user.birth }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.distance }}</td>
            <td>{{ user.donation }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import users from '@/data/users.json'
export default {
  data () {
    return {
      users,
      sorting: {
        birthSorting: {
          bool: true,
          direction: 'descending'
        },
        distanceSorting: {
          bool: false,
          direction: 'descending'
        },
        donationSorting: {
          bool: false,
          direction: 'descending'
        }
      }
    }
  },
  computed: {
    totalUsers () {
      return users.users.concat(this.$store.state.addedUsers)
    }
  }
}
</script>

<style scoped lang="less">
  .table_cover {
    padding: 50px;
  }

  .users_table {
    width: 100%;
    border-collapse: collapse;
  }

  .table_head_row {
    background-color: #d1fdfd;
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

</style>
