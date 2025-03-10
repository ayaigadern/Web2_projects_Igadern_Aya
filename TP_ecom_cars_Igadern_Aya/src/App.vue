<template>
  <div >
    <header>
			
			<h1>Les Bonnes Pièces</h1>
		</header>
		<main>
			<!-- Menu de recherche -->
			<section class="filtres">
				<h3>Filtres</h3>
        <input type="text" placeholder="Barre de recherche des produits" v-model="search">
        <select v-model="search2">
          <option value="">Trie par catégorie</option>
          <option value="Électricité">Électricité</option>
          <option value="Filtration">Filtration</option>
          <option value="Moteur">Moteur</option>
          <option value="Freinage">Freinage</option>
          <option value="Refroidissement">Refroidissement</option>
          <option value="Suspension">Suspension</option>
          <option value="Sécurité">Sécurité</option>
          <option value="Transmission">Transmission</option>
          <option value="Carburant">Carburant</option>
          <option value="Carrosserie">Carrosserie</option>
          <option value="Échappement">Échappement</option>
          <option value="Direction">Direction</option>
        </select>
        <select v-model="triee">
          <option value="">trie de prix</option>
          <option value="croissant">Croissant</option>
          <option value="decroissant">Décroissant</option>
        </select>

        <select v-model="dispo">
          <option value="">trie par disponibilité</option>
          <option value="true">Disponible</option>
          <option value="false">Non disponible</option>
        </select>
       <h3>Panier</h3>
       <ul>
        <li v-for="(item,index) in panier" :key="index">
          {{ item.nom }}(Nombre de pieces: {{ item.nmbr }})
        </li>
       </ul>

			</section>

			<!-- Fiches produits -->
			<section class="fiches">
        <div  v-for="(product,id) in filtrer" :key="id">
            <div class="all">
            <div class="produit">
            <img :src="'images/' + product.Image" alt="Image produit">
          </div>
          <div class="aligne">
            <p><span>Nom: </span>{{ product.nom }}</p>
           <p><span>Catégorie: </span>{{ product.categorie}}</p> 
            <p><span>Prix: </span>{{ product.prix }} $</p>
          </div>
          <button v-if="product.Disponible" class="btn" v-on:click="ajouter(product.nom)" value=product.nom>ajouter au panier</button>

          </div>
          

            
          
        </div>

			</section>
		</main>
	
    </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      nmbr:0,
      panier:[],
      dispo:'',
      products:[],
      search:'',
      search2:'',
      triee:'',
    };
  },
  computed: {
  filtrer() {
    let filtred = this.products
      .filter(product => product.nom.toLowerCase().includes(this.search.toLowerCase()))
      .filter(product => this.search2 === "" || product.categorie.toLowerCase().includes(this.search2.toLowerCase()))

    if(this.dispo==="true"){
      filtred=filtred.filter(product => product.Disponible)
    }else if(this.dispo==="false"){
      filtred=filtred.filter(product => !product.Disponible)
    }else if(this.dispo===''){
      filtred=filtred.filter(product => product.Disponible)

    }

    if (this.triee === "croissant") {
      filtred.sort((a, b) => a.prix - b.prix);
    } else if (this.triee === "decroissant") {
      filtred.sort((a, b) => b.prix - a.prix);
    }
    
    return filtred;
  }
},
  mounted(){
    fetch("/pieces-autos.json")
    .then((response)=>response.json())
    .then((data)=>{
      this.products=data;
    })
    .catch((error) => console.error("Erreur lors du chargement du fichier JSON", error));

  },
  methods:{
    ajouter(nom){
      const productInCart = this.panier.find(item => item.nom === nom);

  if (productInCart) {
    productInCart.nmbr += 1; 
  } else {
    this.panier.push({ nom: nom, nmbr: 1 });
  }   },
    
  }
  };
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

body {
	max-width: 1200px;
	margin: auto;
	padding: 16px;
	font-family: 'Montserrat', sans-serif;
}

header {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 16px;
	padding: 8px;
	background-color: #7451eb;
	text-align: center;
	color: white;
}
header img {
	height: 60px;
	margin-left: 1rem;
}
header h1 {
	flex-grow: 1;
}

main {
	display: flex;
	flex-direction: row;
}

.filtres {
	border-radius: 4px;
	box-shadow: 0px 0px 4px gray;
	margin: 8px;
	padding: 8px;
	min-width: 300px;
	min-height: 400px;
  display: flex;
  flex-direction: column;
  gap:20px;
}
.filtres h3 {
	text-align: center;
}

.fiches {
	flex: 1;
	margin: 8px;
  margin-left: 20%;
}
.fiches img {
	max-width: 200px;
}
.fiches p {
	margin-top: 4px;
	margin-bottom: 4px;
}
.aligne{
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}
.aligne span{
  color:rgb(116, 81, 235);
  font-size: 15px;
}
.aligne p{
  font-size: 15px;
}
.all{
  display: flex;
  flex-direction: row;
  border: 2px solid black;
  margin-top: 20px;
  justify-content: center;
  width: 500px;
  
}

.filtres input{
  height: 30px;
}
.filtres select{
  height: 30px;
}
.btn{
  background-color: rgb(116, 81, 235);
  font-size:17px;
  color:white;
}
</style>
