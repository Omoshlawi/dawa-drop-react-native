import routes from "../navigation/routes";

export const menItems = [
  {
    title: "Order Medicine",
    image: require("../assets/medicine.png"),
    id: 1,
    destination: {
      parentRoute: routes.ORDER_NAVIGATION,
      nestedRoute: {
        screen: routes.ORDER_NAVIGATION,
      },
    },
  },
  {
    title: "Checkout Delivery",
    image: require("../assets/delivery-truck.png"),
    id: 2,
    destination: {
      parentRoute: routes.ORDER_NAVIGATION,
      nestedRoute: {
        screen: routes.ORDER_NAVIGATION,
      },
    },
  },
  { title: "Order History", image: require("../assets/clock.png"), id: 3 },
  {
    title: "Pending Orders",
    image: require("../assets/pending_1.png"),
    id: 4,
    destination: {
      parentRoute: routes.ORDER_NAVIGATION,
      nestedRoute: {
        screen: routes.ORDER_NAVIGATION,
      },
    },
  },
  {
    title: "Redeeme Points",
    image: require("../assets/box.png"),
    id: 5,
    destination: {
      parentRoute: routes.ORDER_NAVIGATION,
      nestedRoute: {
        screen: routes.ORDER_NAVIGATION,
      },
    },
  },
  {
    title: "Request Tranfer",
    image: require("../assets/migration.png"),
    id: 6,
    destination: {
      parentRoute: routes.ORDER_NAVIGATION,
      nestedRoute: {
        screen: routes.ORDER_NAVIGATION,
      },
    },
  },
];
