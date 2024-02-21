import { Icons } from "@/components/Icons";

const navigation = [
  {
    id: "search",
    name: "Search",
    link: "/Search",
  },
    {
      id: "home",
      name: "Home",
      link: "/",
    },
    {
      id: "movies",
      name: "Movies",
      link: "/Movies",
    },
    {
      id: "shows",
      name: "Shows",
      link: "/Shows",
    },
    {
      id: "library",
      name: "Library",
      link: "/Library",
    },
  ];

  const home = [
    {
      id: "home",
      name: "Home",
      link: "/",
      icon: () => (<Icons.home />),
    },
    {
      id: "movies",
      name: "Movies",
      link: "/Movies",
      icon: Icons.movie,
    },
    {
      id: "shows",
      name: "Shows",
      link: "/Shows",
      icon: () => (<Icons.home  />),
    },
    {
      id: "library",
      name: "Library",
      link: "/Library",
      icon: () => (<Icons.home className='fill-green-900' />),
    },
  ]

  export { navigation, home };
  