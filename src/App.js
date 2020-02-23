import React from 'react'
import GetFileData from './api/getFiles'
class App extends React.Component {
  state = {
    files: [],
    filesAndDirectories: [],
    directories: [],
    isLoading: true,
  }
  async componentDidMount() {
    try {
      await GetFileData.get('')
        .then(response => {
          this.setState({
            filesAndDirectories: response.data.data, isLoading:false
          })
        })
    } catch (err) {
      console.log('error:', err)
    }
  }

  render() {
    return (
      <div className='App'>
      </div>
    )
  }
}

export default App