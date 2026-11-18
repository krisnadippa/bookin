export interface Product {
  id: string;
  name: string;
  notes: string;
  price: string;
  image: string;
  category?: string;
  isPopular?: boolean;
}

export interface LocationItem {
  id: string;
  city: string;
  description: string;
  image: string;
  hours?: string;
  days?: string;
  isFeatured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "marsha",
    name: "Marsha",
    notes: "Cherry truffle, Blueberry, Kakao nibs",
    price: "Rp 45.000 - Rp 95.000",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDO7uahtsO3SM9yoX7KATakQ281LckO66v9ZgjPhWqjXY3CNs9woScFRN2z3CicFUKo9DW_O7pqU7cKmSNj9xqcMrq1q2dkzMS3RcxK7pVh29nUUJP8s0MEz5Vcwu8Uj6ZKtxzEkWiPvrEeb9HDPc-hTiRKkHWb_E48MSR538XhHQ_hbFYZNPtR2FMe_M7obCXkagxsdMoF6Ccw_-I5oNBMuaffoG53Mp7p_vcYE8wf_VSt_vPhEIvWyg",
    category: "Beans",
    isPopular: true,
  },
  {
    id: "gogogu",
    name: "Gogogu",
    notes: "Cherry truffle, Blueberry, Kakao nibs",
    price: "Rp 45.000 - Rp 95.000",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuADiyDSSffO0zWNzWgNy-Vq94ZUoT7yeH0w4e2dxpbyzP3kSounraN4eCVGnduXudRWqkr7pjer8eyYvAwn57NYL6lBXQxUWwQ8eRPELdWbvyS1_M2r7PJpCFGQFo3R6m1yNFzT-vrfgpoa0r8p7fQMa-Pws6x7c_zotxtql_rGixkK_9YDxqoDRSLbquKUfFX5Kz8blSVCap0xkf6O1qSFnkyNppKzWu3c8HEWkHpHhx7QbJvJZTXcmQ",
    category: "Beans",
  },
  {
    id: "v60-dripper",
    name: "V60 Dripper",
    notes: "Cherry truffle, Blueberry, Kakao nibs",
    price: "Rp 125.000",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPzCdy5yiD6CBuKSrJZKw1MAGUvKzEs1PZrvXGarvNh1ByhnVqHZDMb3wKFWUx0D6Mimw0KwRpAvnCPqQ6ekd2WVKpmKMaDz_6fTS3b0DRh9luJhfskgBK96acM_7uneVvz8NoARF0NHiwTpEmgDeYxxDNo_nsS_RAaJtahwLAChqRN47Vr1EzbaPrIw3Fws9zam2FScjpGbuqaDZho_QMgbr4YAT2sBM_Kao_HsaUQLQeTNQeOihGfA",
    category: "Equipment",
  },
  {
    id: "arabica-gayo",
    name: "Arabica Gayo",
    notes: "Sumatra, Earthy, Spicy",
    price: "Rp 55.000 - Rp 110.000",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6zqAe7ur0_MWjISbqBnimMCUO7jI3L9L4MukevaqqTgDYDSu5rrvuX326slGRCzKLZC9W3Ph0tnoI6bbnK7mUexSxMGBiQKGI5kUQDbmN99OtK3T0llQoQrha_RdxqWQ9AmIB3_JJEk2Ft1HFyHtewRr3gz5zGoTk4uBck5DXQ5doTCwt8RnUHMFytbn9Ke8gIWpkCbr6rXmlCvoZjj5ybKHdpWb7e6fktARLqw2zEni_X3TePjc4Tg",
    category: "Single Origin",
  },
  {
    id: "toraja-highland",
    name: "Toraja Highland",
    notes: "Sulawesi, Nutty, Caramel",
    price: "Rp 60.000 - Rp 120.000",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDc5Ngnyw6eEOh8sIqFlrLisl3IFcQ3rIz2Qwrkfv9UhJeuxuOYDv64-qHLWdSJRTFN2gyPcvW9nFA9Z4I_LOUgWzevf8dlJ398ypbZt3KmJGzAyQXDxvomlsSoaM4eyzxWvpjq3Xovam1S-StheMoZZ-H33ODfaOTbo4cuE4dsYazB6OLrgxJh9iEaS2WZvvGPnEPtl8H5u12ap9mP6Okdzc40eBt6ozWOqE5d6xG9DfCKDEN7h2nbVg",
    category: "Single Origin",
  },
  {
    id: "robusta-java",
    name: "Robusta Java",
    notes: "Java, Bold, Chocolate",
    price: "Rp 40.000 - Rp 80.000",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSbQubhowq78OS6Im1WQzsrrYUlbsmxcpAgz3pCHVJ_z-q2p4v7WtogrVhmc-3zuWEe0iGryK_M1QE8CmPCZVzf93A5jltbClVzh5BI3Pusc3lHLxAnxb75XQso_6L-BvLq1P_1yj34Cn-rGcWBqrb8Hb-aXpVhTm0qD6NRfBHLgMcKbSwAe3y-my4sXahifeM0ZxZJQ_ZSD4TINOlvjS6dj9lUadQyIa-QDCABE2Xahyv63k6Bi11mg",
    category: "Beans",
  },
];

export const LOCATIONS: LocationItem[] = [
  {
    id: "prague",
    city: "Prague",
    description: "Botanical Coffee Shop in Prague offers a serene oasis with its lush decor and artisanal coffees.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_DWgTLq_3DryP9_uMgc4yczjgMBgWQJHDghHmrZjeh3VLj5LzVd_3wvxLjgXxNqxgK8rfYefkmwjrjc3BZ9WX34JhmboYPwSwgQyPeRh9nFFoRRAPZ8cfOricjJgetLmnp1gYzskShg5ZalEoSaTHz_PZv4md8xFaRiJyyigspief-pkhMjD7Yd1BlGx6Kp3kNu2QVU8CTzPLI8IfwShiC8gEQz5a9ARE48HTRixm5qoTbwkJVvVILg",
    days: "Monday to Sunday",
    hours: "09 AM — 07 PM",
    isFeatured: true,
  },
  {
    id: "berlin",
    city: "Berlin",
    description: "Berlin's dynamic coffee culture features innovative shops where baristas experiment with new brewing techniques.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCokdJYX8-irYDVrcWXr7vVKGaoqmJrHwDlSQ5_c50mhYvC-KmIf-ySAuqXFcm0bBX2CVKjU59SvzAuszRcjML5PmjY3YLSYlGo850Kp1MBLGZVSFvcdYl-KkZslCFKCPh-Kw2aMN21XpJLtXLeZTWf65PSkUfW9PBn6ymGRODeiDSTuCgUWCYxrI2I4fFtuxEo6oldwcw3dM3A0jXm29t13HZNZMJrmzfxO0X0z6VmnedoDi-xveha4A",
  },
  {
    id: "vienna",
    city: "Vienna",
    description: "Vienna's coffee scene blends historic cafes and modern spots, all dedicated to perfecting the art of coffee making.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzyYo56OVVCJJ0guXgMZaawljE15U_aJQZNA6gSfORGUINX5gSw6sPEaHMks9mZuCOPk3MJk2wtgA9Woo2vueJ4UkFiV0tfcVYiZuAvAyCnbdJmb27ATVxV_PD5rCatDk4a4_2gi9m4-fdqQeoFdrurCtMmkPLQJyp8bD_gP0VRxZ9FBSRY95lux3c0iyRm0BdaHJxsjI0we4kmeavtpbUls8lUbvIFEkpoMgSDXLlK8AlM7DW3196sw",
  },
];

export const BEANS_AVATARS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDc5Ngnyw6eEOh8sIqFlrLisl3IFcQ3rIz2Qwrkfv9UhJeuxuOYDv64-qHLWdSJRTFN2gyPcvW9nFA9Z4I_LOUgWzevf8dlJ398ypbZt3KmJGzAyQXDxvomlsSoaM4eyzxWvpjq3Xovam1S-StheMoZZ-H33ODfaOTbo4cuE4dsYazB6OLrgxJh9iEaS2WZvvGPnEPtl8H5u12ap9mP6Okdzc40eBt6ozWOqE5d6xG9DfCKDEN7h2nbVg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBSbQubhowq78OS6Im1WQzsrrYUlbsmxcpAgz3pCHVJ_z-q2p4v7WtogrVhmc-3zuWEe0iGryK_M1QE8CmPCZVzf93A5jltbClVzh5BI3Pusc3lHLxAnxb75XQso_6L-BvLq1P_1yj34Cn-rGcWBqrb8Hb-aXpVhTm0qD6NRfBHLgMcKbSwAe3y-my4sXahifeM0ZxZJQ_ZSD4TINOlvjS6dj9lUadQyIa-QDCABE2Xahyv63k6Bi11mg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAQRC38AwtYOwI-wOH8uFJtnKAXOPPUSpkaCftt8o0K6kkelGqP6tQ6yVd25g5m1d9DSgK7TBk7Qm8E8RFqg1KUuFvKCcJ0vYGfkPreN26eAX_stkYyILNczOq38OX4zkoxiPjSCN0KHBVM2GfIrlUEjgg34zWbybc6qR5NRXKHw-kqF8mV0e7iNikNNkaYZx8ANf3aDVYbYriiQH7u--tsaBQTz88AkkvOJnWNyRP6gtJ2VErLxhlWqg",
];
