import React, { useState } from 'react'
import styles from './paginationRecipes.module.css';
import { ReactComponent as Prev }  from '../../icons/angulo-izquierdo.svg'
import { ReactComponent as Next }  from '../../icons/angulo-derecho.svg'
import { ReactComponent as GoFirst }  from '../../icons/paso-atras.svg'
import { ReactComponent as GoLast }  from '../../icons/un-paso-adelante.svg'

export const PaginationRecipes = ({page, setPage, maxPage}) => {
    const [input, setInput] = useState(1);
  
    const nextPage = () => {
      setInput (parseInt(input) + 1);
      setPage (parseInt(page) + 1);
    };
  
    const previousPage = () => {
      setInput (parseInt(input) - 1);
      setPage (parseInt(page) - 1);
    };

    const firstPage = () => {
      setInput (1);
      setPage ( 1);
    };

    const lastPage = () => {
      setInput (maxPage);
      setPage (maxPage);
    };
  
    const onKeyDown = e => {
      if (e.keyCode == 13) {
        setPage (parseInt (e.target.value));
        if (
          parseInt (e.target.value < 1) ||
          parseInt (e.target.value) > Math.ceil (maxPage) ||
          isNaN (parseInt (e.target.value))
        ) {
          setPage (1);
          setInput (1);
        } else {
          setPage (parseInt (e.target.value));
        }
      }
    };
  
    const onChange = e => {
      setInput (e.target.value);
    };
  
    return (
      <div className={styles.container}>
        <button disabled={page === 1 || page < 1} onClick={firstPage}>
          <GoFirst />
        </button>
        <button disabled={page === 1 || page < 1} onClick={previousPage}>
          <Prev />
        </button>
        <input
          onChange={onChange}
          onKeyDown={onKeyDown}
          name="page"
          autoComplete="off"
          value={input}
        />
        <p> of {maxPage} {maxPage === 1 ? "page" : "pages"}</p>
        <button
          disabled={page === maxPage || page > maxPage}
          onClick={nextPage}
        >
          <Next />
        </button>
        <button
          disabled={page === maxPage || page > maxPage}
          onClick={lastPage}
        >
          <GoLast />
        </button>
      </div>
    );
  };
