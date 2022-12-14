import {
    collection, addDoc,
    updateDoc, doc,
    deleteDoc, getDocs, query 
  } from "firebase/firestore";
  import { firestore } from '../firebase/firebase';
  import { Recipe } from "../models/recipe";
  
  class RecipeService {
  
    constructor() {
      this.collection = 'recipes';
    }
  
  
    async createRecipe(recipe) {
      const collectionReference = collection(firestore, this.collection);
      const docRef = await addDoc(collectionReference, {
        name: recipe.name,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
      });
  
      recipe.id = docRef.id;
      return recipe;
    }
  
    async readRecipes() {
      const collectionReference = collection(firestore, this.collection);
      const q = query(collectionReference);
  
      const querySnapshot = await getDocs(q);
  
      const recipes = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        const recipe = new Recipe(
          doc.id,
          data.name,
          data.ingredients,
          data.instructions
        );
        recipes.push(recipe);
      });
  
      return recipes;
    }
  
    async updateRecipe(recipe) {
      const docRef = doc(firestore, this.collection, recipe.id);
  
      await updateDoc(docRef, {
        name: recipe.name,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
      });
  
      return recipe;
    }
  
    async deleteRecipe(recipe) {
      const docRef = doc(firestore, this.collection, recipe.id);
      await deleteDoc(docRef);
    }
  
  }
  
  const service = new RecipeService();
  
  export default service;