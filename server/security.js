Events.allow({
  insert: function (userId, eventParams) {
    return userId && eventParams.owner === userId;
  },
  update: function (userId, eventParams, fields, modifier) {
    if (userId !== eventParams.owner)
      return false;

    return true;
  },
  remove: function (userId, eventParams) {
    if (userId !== eventParams.owner)
      return false;

    return true;
  }
});