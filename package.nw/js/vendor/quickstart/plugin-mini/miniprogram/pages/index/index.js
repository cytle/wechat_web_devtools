var plugin = requirePlugin("myPlugin")
Page({
  onLoad: function() {
    plugin.getData()
  }
})