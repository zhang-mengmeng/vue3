

<template>
</template>

<script>
    getlist()
    function getlist(){
      fetch('http://localhost:3000/list').then(res =>{
        console.log(res)
        return res.json()
      }).then(data =>{
        console.log(data)
      })
    }
</script>
<style scoped>
</style>
