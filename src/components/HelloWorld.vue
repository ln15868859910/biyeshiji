<template>
<div >

</div>
</template>
<script>
export default {
  name: 'HelloWorld',
  created () {
    this.$http.get('/admin/getuser1').then(data => {
      console.log(data)
    })
  }
}
</script>
<style scoped>
</style>
