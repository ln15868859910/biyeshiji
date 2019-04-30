
function showresult (_this, data) {
  if (data.data.code) {
    _this.$Message.info(data.data.message)
  } else {
    _this.$Message.error(data.data.message)
  }
}
export {
  showresult
}
