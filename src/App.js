import React from 'react'
import Axios from 'axios'
import FileBrowser from './components/file-browser'

class App extends React.Component {
  state = {
    data: [],
    totalSize: 0,
    fileCount: 0,
    selectedFolders: {},
    loading: true,
    error: false
  }

  async componentDidMount() {
    this.setState({ loading: true })
    try {
      const response = await Axios.get('https://chal-locdrmwqia.now.sh/')
      response.data.data.sort((a, b) => {
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
    const { data, loading, fileCount, totalSize, error } = this.state
    return (
      <div className="container">
        {error ? <h1> Oopsy.. something isn't quite right. Come back later.. </h1> : 
        <div className="wrapper"> 
          <h1>File Browser</h1> 
          {loading ? <div className="loader">Loading...</div> :
            <div>
              <FileBrowser
                files={data}
                onChange={(selectedFolders) => this.setState({ selectedFolders })}
                selectedFolders={this.state.selectedFolders}
              />
              {!loading && data.length < 1 ? <p>No Files Found!</p> : null}
              <hr></hr>
              <div className="totals">
                <p>Total Files: {fileCount}</p>
                <p>Total Filesize: {`${(totalSize / 1000000).toFixed(3)} MB`}</p>
              </div>
            </div>
          }
        </div>
        }
      </div>
    )
  }
}

export default App