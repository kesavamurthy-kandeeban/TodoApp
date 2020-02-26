//react-library
import React, { useState, useEffect } from 'react'
import { Button } from 'antd';

//antd
import { Select, Drawer } from 'antd';
import './TodoList.css'

//Lib
import _ from 'lodash'

const { Option } = Select;

const movieList = [
  { movieName: 'D16', movieId: '1', heroId: '1' },
  { movieName: 'D40', movieId: '2', heroId: '1' },
  { movieName: 'AWN', movieId: '3', heroId: '2' },
  { movieName: 'hero', movieId: '4', heroId: '2' },
  { movieName: 'victor', movieId: '5', heroId: '3' },
  { movieName: 'mafia', movieId: '6', heroId: '3' },
];
const heroList = [
  { heroId: '1', heroName: 'SK' },
  { heroId: '2', heroName: 'VJ' },
  { heroId: '3', heroName: 'ArunVj' },
];
const category = [
  { categoryName: 'Action', categoryId: '1' },
  { categoryName: 'Horror', categoryId: '2' },
  { categoryName: 'Mystery', categoryId: '3' },
];
const subCategory = [
  { subCategoryId: '1', subCategoryName: 'Drama', categoryId: '1' },
  { subCategoryId: '2', subCategoryName: 'Thriller', categoryId: '1' },
  { subCategoryId: '3', subCategoryName: 'Comedy', categoryId: '2' },
  { subCategoryId: '4', subCategoryName: 'Sci-fi', categoryId: '2' },
  { subCategoryId: '5', subCategoryName: 'Animation', categoryId: '2' },
  { subCategoryId: '6', subCategoryName: 'Silent', categoryId: '3' },
  { subCategoryId: '7', subCategoryName: 'Adventure', categoryId: '3' },
  { subCategoryId: '8', subCategoryName: 'Noir', categoryId: '3' },
  { subCategoryId: '9', subCategoryName: 'Historical', categoryId: '3' },
];

const popContainer = (trigger) => trigger.parentElement

function MovieListComponent() {
  const [isShowForm, setShowform] = useState();
  const [selectedHeroId, setHeroId] = useState();
  const [selectedCategoryId, setCategoryId] = useState();
  const [resetField, setResetField] = useState();

  return (
    <>
      <Button onClick={() => !isShowForm && setShowform(true)}>Add</Button>
      <Drawer
        title="Movie List"
        visible={isShowForm}
        width={400}
        destroyOnClose={true}
        closable={true}
        onClose={() => isShowForm && setShowform(false)}
      >
        <Select
          style={{ width: 300 }}
          getPopupContainer={popContainer}
          onChange={(heroId) => (
            setHeroId(heroId),
            setResetField(null))}
          placeholder="Select Hero name to see the movie list"
        >
          {_.map(heroList, (heros) => <Option key={heros.heroId} > {heros.heroName} </Option>)}
        </Select>
        <div style={{ paddingTop: '30px' }}>
          <Select
            style={{ width: 300 }}
            value={resetField}
            getPopupContainer={popContainer}
            onChange={(event) => setResetField(event)}
          >
            {_.map(_.filter(movieList, _.matches({ 'heroId': selectedHeroId })), (movies) => <Option key={movies.movieId}>{movies.movieName}</Option>)}
          </Select>

        </div>
        <div style={{ paddingTop: '30px' }}>
        <Select
          style={{ width: 300 }}
          onChange={(categoryId) => (
            setCategoryId(categoryId),
            setResetField(null))}
          placeholder="Select movie category"
          getPopupContainer={popContainer}
        >
          {_.map(category, (categories) => <Option key={categories.categoryId} > {categories.categoryName} </Option>)}
        </Select>
        </div>
        <div style={{ paddingTop: '30px' }}>
          <Select
            style={{ width: 300 }}
            value={resetField}
            onChange={(event) => setResetField(event)}
            getPopupContainer={popContainer}
          >
            {_.map(_.filter(subCategory, _.matches({ 'categoryId': selectedCategoryId })), (subCategories) => <Option key={subCategories.subCategoryId}>{subCategories.subCategoryName}</Option>)}
          </Select>

        </div>
      </Drawer>
    </>
  )
}

export default MovieListComponent
