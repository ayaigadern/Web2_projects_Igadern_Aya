<template>
    <div class=nav2>
      
        <RouterLink class="nav" to="/" replace="true">Home</RouterLink>
    <RouterLink class="nav" to="/add-job" replace="true">Ajouter un Job</RouterLink>
    <RouterLink class="nav" to="/delete-job" replace="true">supprimer un Job</RouterLink>

    </div>
   
</template> 
<script>
export default{
     name:'NavBarre',
}
</script>
<style scoped>
.nav2{
    display: flex;
    flex-direction: row;
    width: 50%;
    justify-content: center;
    align-items: center;
    margin:0 auto;
    gap:30px;
    margin-top:50px ;
}
.nav{
    width: 80%;
  padding: 20px 40px;
  background: linear-gradient(135deg, #6a11cb, #2575fc); 
  color: white;
  font-size: 25px;
  border: none;
  border-radius: 30px; 
  cursor: pointer;
  text-align: center;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3); 
  transition: all 0.3s ease-in-out;
  letter-spacing: 1px; 
    
}

.nav:hover {
  background: linear-gradient(135deg, #2575fc, #6a11cb); 
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  transform: translateY(-3px);
}
.nav:active {
  transform: scale(0.96);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

</style>