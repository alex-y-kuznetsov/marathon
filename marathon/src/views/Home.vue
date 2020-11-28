<template>
  <div class="home">
    <Form />
    <UserTable />
  </div>
</template>

<script>
import Form from '@/components/Form.vue'
import UserTable from '@/components/UserTable.vue'

export default {
  name: 'Home',
  components: {
    Form,
    UserTable
  }
}
</script>
