const setFileAction = {type: 'setFiles'}

export const mapStateToProps = (state) => {
  return {
      files: state.autoFetch.files
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    setFiles: (files) => {
      let fileList = []
      for (let i = 0; i < files.length; i++) {
        fileList.push({name: files[i].name})
      }
      dispatch(Object.assign({}, setFileAction, {files: fileList}))
    }
  }
}
