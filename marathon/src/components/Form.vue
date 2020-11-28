<template>
  <form v-on:submit.prevent="acceptData" novalidate="true">
    <h1>
      Welcome to our charity marathon. Please fill in the folowing information
    </h1>
    <div class="form_fields">
      <div class="input_cover">
        <label for="username">Full Name</label>
        <input type="text" name="username" id="username" class="form_input"
               v-model="formValues.username"/>
      </div>
      <div class="input_cover">
        <label for="birth">Date of Birth</label>
        <input type="date" name="birth" id="birth" class="form_input"
               v-model="formValues.birth"/>
      </div>
      <div class="input_cover">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" class="form_input"
               v-model="formValues.email"/>
      </div>
      <div class="input_cover">
        <label for="phone">Contact Phone</label>
        <input type="tel" name="phone" id="phone" class="form_input"
               v-model="formValues.phone" v-on:input="maskPhone" />
      </div>
      <div class="input_cover">
        <label for="distance">Preferred Distance, km</label>
        <select name="distance" id="distance" class="form_input"
                v-model.number="formValues.distance">
          <option>3</option>
          <option>5</option>
          <option>10</option>
        </select>
      </div>
      <div class="input_cover">
        <label for="donation">Donation</label>
        <input type="number" name="donation" id="donation" class="form_input"
               v-model.number="formValues.donation" />
      </div>
      <div class="form_controls">
        <span v-if="needToCheckEmail">Please enter a valid email</span>
        <span v-else-if="!formReady && !needToCheckEmail">Please fill in all fields</span>
        <button class="submit_data" v-bind:disabled="!formReady">Submit Data</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data () {
    return {
      formValues: {},
      formReady: false
    }
  },
  methods: {
    maskPhone () {
      var x = this.formValues.phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
      this.formValues.phone = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '')
    },
    validateEmail (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    acceptData () {
      this.$store.commit('addUser', this.formValues)
      this.formValues = {}
    }
  },
  computed: {
    needToCheckEmail () {
      return !Object.keys(this.formValues).find(key => this.formValues[key] === null) &&
        !Object.keys(this.formValues).find(key => this.formValues[key] === '') &&
        !this.validateEmail(this.formValues.email)
    }
  },
  watch: {
    formValues: {
      handler () {
        Object.keys(this.formValues).find(key => this.formValues[key] === null) ||
        Object.keys(this.formValues).find(key => this.formValues[key] === '') ||
        !this.validateEmail(this.formValues.email)
          ? this.formReady = false : this.formReady = true
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="less">
.form_fields {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 700px;
  margin: 0 auto;
  box-sizing: border-box;
}

.input_cover {
  margin: 0 10px 10px 0;
  width: 180px;

    label {
    display: block;
    text-align: left;
    font-size: 14px;
    padding: 0 0 4px 4px;
  }
}

.form_input {
  width: 100%;
  box-sizing: border-box;
  height: 34px;
  border-radius: 5px;
  border: 1px solid #000000;
  padding: 5px;

  &:focus {
    outline: none;
    border-color: #867e7e;
    box-shadow: inset 0 0 4px 0 #867e7e;
  }
}

select.form_input {
  cursor: pointer;

    &:focus {
    border-radius: 5px 5px 0 0;
  }
}

.form_controls {
  margin: 20px 10px 0 auto;
}

.submit_data {
    height: 34px;
    width: 180px;
    background-color: transparent;
    background-color: #d1fdfd;
    border: 1px solid #867e7e;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 20px;
}
</style>
