function mapUserIdToData(context) {
  if(context.data && context.params.route.userId) {
    context.data.userId = context.params.route.userId;
  }
}