import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { getRecipes } from '../../redux/actions/actions';
import Recipes from '../../components/Recipes/Recipes';

const Home = () => {
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch])
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div>
      <Recipes />
    </div>
  )
}

export default Home