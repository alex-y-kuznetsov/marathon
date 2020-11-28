<template>
  <form>
    <h1>
      Welcome to our charity marathon. Please fill in the folowing information
    </h1>
    <div class="form_fields">
      <div class="input_cover">
        <label for="username">Full Name</label>
        <input type="text" name="username" id="username" class="form_input" />
      </div>
      <div class="input_cover">
        <label for="birth">Date of Birth</label>
        <input type="date" name="birth" id="birth" class="form_input" />
      </div>
      <div class="input_cover">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" class="form_input" />
      </div>
      <div class="input_cover">
        <label for="phone">Contact Phone</label>
        <input type="tel" name="phone" id="phone" class="form_input"
               v-model="formValues.phone" v-on:input="maskPhone" />
      </div>
      <div class="input_cover">
        <label for="distance">Preferred Distance</label>
        <select name="distance" id="distance" class="form_input">
          <option>3 km</option>
          <option>5 km</option>
          <option>10 km</option>
        </select>
      </div>
      <div class="input_cover">
        <label for="donation">Donation</label>
        <input type="number" name="donation" id="donation" class="form_input" />
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data () {
    return {
      formValues: {
        username: '',
        birth: null,
        email: '',
        phone: '',
        distance: null,
        donation: null
      }
    }
  },
  methods: {
    maskPhone () {
      var x = this.formValues.phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
      this.formValues.phone = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '')
    }
  }
}
</script>

<style>
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
}
.input_cover label {
  display: block;
  text-align: left;
  font-size: 14px;
  padding: 0 0 4px 4px;
}
.form_input {
  width: 100%;
  box-sizing: border-box;
  height: 34px;
  border-radius: 5px;
  border: 1px solid #000000;
  padding: 5px;
}
select.form_input {
  cursor: pointer;
}
select.form_input:focus {
  border-radius: 5px 5px 0 0;
}
</style>
