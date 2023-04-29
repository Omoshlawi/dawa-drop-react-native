import routes from "../navigation/routes";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const menItems = [
  {
    title: "Order Medicine",
    image: require("../assets/medicine.png"),
    id: 1,
    destination: {
      parentRoute: routes.ORDER_NAVIGATION,
      nestedRoute: {
        screen: routes.ORDER_SCREEN,
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
        screen: routes.CHECHOUT_SCREEN,
      },
    },
  },
  {
    title: "Order History",
    image: require("../assets/clock.png"),
    id: 3,
    destination: {
      parentRoute: routes.ORDER_NAVIGATION,
      nestedRoute: {
        screen: routes.ORDERS_HISTORY_SCREEN,
      },
    },
  },
  {
    title: "Pending Orders",
    image: require("../assets/pending_1.png"),
    id: 4,
    destination: {
      parentRoute: routes.ORDER_NAVIGATION,
      nestedRoute: {
        screen: routes.PENDING_ORDERS_SCREEN,
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

export const chechoutTabs = [
  {
    title: "Scan QR code",
    icon: (
      <MaterialCommunityIcons
        name="data-matrix-scan"
        size={20}
        style={{ paddingRight: 10 }}
      />
    ),
  },
  {
    title: "Type in code ",
    icon: (
      <MaterialCommunityIcons
        name="keyboard"
        size={20}
        style={{ paddingRight: 10 }}
      />
    ),
  },
];
