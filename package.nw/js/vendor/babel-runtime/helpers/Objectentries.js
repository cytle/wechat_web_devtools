if (!Object.entries) {
  Object.entries = function (obj) {
    var ownProps = Object.keys(obj)
    var i = ownProps.length
    var resArray = new Array(i) // preallocate the Array
    while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]]

    return resArray
  }
}
