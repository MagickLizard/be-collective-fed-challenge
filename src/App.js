import React from 'react'
import Axios from 'axios'

class App extends React.Component {
  state = {
    data: [],
    totalSize: 0,
    fileCount: 0,
    selectedFolders: {},
    loading: true
  }

  async componentDidMount() {
    this.setState({ loading: true })
    try {
      const response = await Axios.get('https://chal-locdrmwqia.now.sh/')
      response.data.data.sort(function (a, b) {
        if (a.type === "folder") {
          return -1
        }
        if (b.type === "file") {
          return 1
        }
        return 0
      })
      this.calculateTotals(response.data.data)
      this.setState({ loading: false, data: response.data.data })
    } catch (err) {
      this.setState({ loading: false, error: err })
    }
  }

  calculateTotals(data) {
    data.map(item => {
      if (item.type === "file") {
        this.setState((prevState) => ({ fileCount: prevState.fileCount + 1, totalSize: prevState.totalSize + item.size }))
      }
      if (item.type === "folder") {
        this.calculateTotals(item.children)
      }
    })
  }

  render() {
    return (
      <div className='App'>
      </div>
    )
  }
}

export default App