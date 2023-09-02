import app from "./app"

export function customerRealmSub(realm: Realm) {
    realm.subscriptions.update((mutableSubs) => {
      
      mutableSubs.add(realm.objects("Order"), {
        name: "orderSubscription",
        throwOnUpdate: true,
      })
      mutableSubs.add(realm.objects("Enterprise"), {
        name: "enterpriseSubscription",
        throwOnUpdate: true,
      })
    
      mutableSubs.add(realm.objects("Product"), {
        name: "productSubscription",
        throwOnUpdate: true,
      })
      mutableSubs.add(realm.objects("Checker"), {
        name: "checkerMainSubscription",
        throwOnUpdate: true,
      })
    })
  }