type navigation_data_item = {
  id: number;
  name: string;
  path: string;
};

const navigation_data: navigation_data_item[] = [
  {
    id: 0,
    name: "Home",
    path: "/",
  },
  {
    id: 1,
    name: "Form",
    path: "/form",
  },
  {
    id: 3,
    name: "Deeplink",
    path: "/deeplink",
  },
];

export default navigation_data;
