import React from 'react'
import './SearchFriends.css'
import Category from './Category'
import TopicList from './TopicList'

function SearchFriends () {
  return (
    <div>
      <div className="mainbox">
          <div className="box-sticky">
            <Category/>
          </div>
          <div className="box">
            <TopicList/>
          </div>
        </div>
    </div>
  )
}

export default SearchFriends