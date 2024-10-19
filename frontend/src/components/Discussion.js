import React, { useState, useEffect } from 'react'
import Heatmap from './Heatmap'
import Dropdown from './Dropdown'

function Discussion() {
  const [discussion, setDiscussion] = useState([])
  const [timestamps, setTimestamps] = useState([])
  const [selected, setSelected] = useState(null)
  const [loaded, setLoaded] = useState(false)

  // add useEffect here for discussion
  useEffect(() => {
    if (selected) {
      setLoaded(false)
      fetch(`http://localhost:4001/getDiscussions/${selected}`)
        .then(res => res.json())
        .then(data => {
          setDiscussion(data)
          setLoaded(true)
        })
        .catch((error) => {
          console.error("Error fetching discussions: ", error)
          setDiscussion([])
          setTimestamps([])
          setLoaded(true)
        })
    }
  }, [selected])

  useEffect(() => {
    if (discussion.length > 0) {
      const discussionTimestamps = discussion
        .map(discussion => discussion.timestamp)

      setTimestamps(discussionTimestamps)
    } else {
      setTimestamps([])
    }
  }, [discussion])

  return (
    <div>
      <Dropdown handleSelect={setSelected} />
      {loaded ? <Heatmap timestamps={timestamps} /> : <div>Loading ...</div>}
    </div>
  )
}

export default Discussion
